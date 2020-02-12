// Ben's api key for geocodio AKA the only free(ish) one I've found.
// from this page https://www.geocod.io/docs/#reverse-geocoding

// f1c3e0c3b50f40545177b50ce5351270340efb4

var queryURL = "https://api.geocod.io/v1.4/reverse?q=38.9002898,-76.9990361&api_key=f1c3e0c3b50f40545177b50ce5351270340efb4";

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });
  
// $.ajax(settings).done(function(response){

//     //  console.log(response);
// });



