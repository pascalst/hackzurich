
$.ajax({

 url: "https://gateway.watsonplatform.net/personality-insights/api/v2/profile",
 beforeSend: function(xhr) { 
  xhr.setRequestHeader("Authorization", "Basic " + btoa("3d560c72-b683-4bb1-b15e-72aef2f1bd7a:ACBCbBNRTXm3")); 
 },
 type: 'POST',
 dataType: 'json',
 contentType: 'application/json',
 processData: false,
 data: '{"foo":"bar"}',
 success: function (data) {
  alert(JSON.stringify(data));
},
  error: function(){
   alert("Cannot get data");
 }
});
