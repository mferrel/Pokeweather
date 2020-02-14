




//pasted over from html file

 var x = document.getElementById("geolocation");
                        
 function getLocation() {
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(showPosition);
   } else { 
     x.innerHTML = "Geolocation is not supported by this browser.";
   }
 }
 
 function showPosition(position) {
   x.innerHTML = "Latitude: " + position.coords.latitude + 
   "<br>Longitude: " + position.coords.longitude;
 }
 let latCoordinate = position.coords.latitude;
 let lonCoordinate = position.coords.longitude; 
     



//getting our coordinates
if (navigator.geolocation) {
  //true
alert ('let\'s find out where you want to do the hokey Poke?')
} else {
  //false
alert('geolocation not available?! What browser is this?');
  // prompt for city?
}


var queryURL = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + latCoordinate + "&lon=" + lonCoordinate; 

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  console.log(response.address.city);
  });




  