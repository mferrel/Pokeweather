// Ben's api key for geocodio AKA the only free(ish) one I've found.
// from this page https://www.geocod.io/docs/#reverse-geocoding

// f1c3e0c3b50f40545177b50ce5351270340efb4
//this is the reverse geocoding api
var queryURL = "https://api.geocod.io/v1.4/reverse?q=38.9002898,-76.9990361&api_key=f1c3e0c3b50f40545177b50ce5351270340efb4";

if (navigator.geolocation) {
  //true
alert ('let\'s')
} else {
  //false
alert('geolocation not available?! What browser is this?');
  // prompt for city?
}



