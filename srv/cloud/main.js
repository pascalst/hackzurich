// Register cloud functions
Parse.Cloud.define("getFbUserData", getFbUserData);
Parse.Cloud.define("getPersonality", getPersonality);

Parse.Cloud.define("recommendByScores", recommendByScores);
Parse.Cloud.define("vehiclesByScores", vehiclesByScores);

// Actual implementation
var _ = require('underscore');

function getFbUserData(request, response) {
  getFbUserDataHelper(request.user).then(function(userData) {
    response.success(userData);
  }, function(error) {
    response.error(error);
  });
}

function getPersonality(request, response) {
  getFbUserDataHelper(request.user).then(getBluemixPersonality).then(function(insightsData) {
    response.success(insightsData);
  }, function(error) {
    response.error(error);
  });
}

function getBluemixPersonality(userData) {
  // console.log(userData);
  return Parse.Cloud.httpRequest({
    method: 'POST',
    url: "https://3d560c72-b683-4bb1-b15e-72aef2f1bd7a:ACBCbBNRTXm3@gateway.watsonplatform.net/personality-insights/api/v2/profile",
    headers: {
      'Content-Type': 'text/plain'
    },
    body: userData
  }).then(function(httpResponse) {
    return Parse.Promise.as(httpResponse.data);
  }, function(httpResponse) {
    return Parse.Promise.error("couldn't talk to IBM Bluemix API: " + JSON.stringify(httpResponse));
  });
}

function getFbUserDataHelper(user) {
  // return response.success(request.user);
  return Parse.Cloud.httpRequest({
    url: "https://graph.facebook.com/me/posts",
    params: {
      "access_token": user.get("authData").facebook.access_token,
      "limit": 200
    }
  }).then(function(httpResponse) {
    var posts = httpResponse.data.data
        userData = "";
    _.each(posts, function(post) {
      if (_.has(post, "message")) {
        userData += post.message + "\n";
      }
    });
    return Parse.Promise.as(userData);
  }, function(httpResponse) {
    return Parse.Promise.error("failed to talk to the Graph API");
  });
}

// Returns the vehicle best matching the requested score set.
function recommendByScores(request, response) {
  if (!_.has(request.params, "scores")) {
    return response.error("no scores provided");
  }

  getVehiclesByScores(request.params.scores).then(function(vehicles) {
    if (vehicles.length == 0) {
      return response.error("no results for the given scores");
    }
    return response.success({
      "vehicle": vehicles[0]
    });
  }, function(error) {
    return response.error(error);
  });
}

// Returns a list of all vehicles matching the requested score set.
function vehiclesByScores(request, response) {
  if (!_.has(request.params, "scores")) {
    return response.error("no scores provided");
  }

  getVehiclesByScores(request.params.scores).then(function(vehicles) {
    return response.success({
      "vehicles": vehicles
    });
  }, function(error) {
    return response.error(error);
  });
}

function getVehiclesByScores(scores) {
  var promises = [],
      vehicleSets = [];
  // Get vehicle sets by score type and store them in vehicleSets.
  _.each(scores, function(score, scoreType) {
    var p = getVehiclesByScoreType(scoreType, score).then(function(vehicles) {
      vehicleSets.push(vehicles)
    })
    promises.push(p);
  })
  // When done, get the intersection.
  return Parse.Promise.when(promises).then(function() {
    return Parse.Promise.as(vehicleSetsIntersection(vehicleSets));
  }, function(error) {
    return Parse.Promise.error(error);
  });
}

// Helper functions
function getVehiclesByScoreType(scoreType, score) {
  return Parse.Cloud.httpRequest({
    url: "http://api.hackzurich.amag.ch/hackzurich/score/" + scoreType + "/" + score + ".json",
  }).then(function(httpResponse) {
    // success
    return Parse.Promise.as(httpResponse.data.vehicles);
  }, function(httpResponse) {
    // error
    return Parse.Promise.error("API request failed with response " + httpResponse)
  })
}

function vehicleSetsIntersection(sets) {
  var count = {},
      vehicles = {};
  _.each(sets, function(set) {
    _.each(set, function(vehicle) {
      var key = vehicle.vin
      vehicles[key] = vehicle;
      if (!_.has(count, key)) {
        count[key] = 1;
      } else {
        count[key] += 1;
      }
    });
  });

  var noSets = sets.length,
      intersection = [];
  _.each(count, function(occurrences, key) {
    if (occurrences == noSets) {
      intersection.push(vehicles[key]);
    }
  });
  return intersection;
}
