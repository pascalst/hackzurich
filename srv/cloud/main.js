// Register cloud functions
Parse.Cloud.define("recommendByScores", recommendByScores);
Parse.Cloud.define("vehiclesByScores", vehiclesByScores);

// Actual implementation
var _ = require('underscore');

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
    url: "http://api.hackzurich.amag.ch/hackzurich/score/" + scoreType + "/" + score + "/overview.json",
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
