var latCoordinate;  //call to try to solve scope issue
var lonCoordinate;

if (navigator.geolocation) {
  //true
alert ('let\'s find out more about weather and Pokemon?')
} else {
  //false
alert('geolocation not available?! What browser is this?');
  // prompt for city?
}


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
        
          let latCoordinate = position.coords.latitude
          let lonCoordinate = position.coords.longitude
       
          var queryURL = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + latCoordinate.toFixed(5) + "&lon=" + lonCoordinate.toFixed(5); 
            $.ajax({
              url: queryURL,
              method: "GET"
            }).then(function(response) {
              console.log(response);
            console.log(response.address.city); //successfully shows city
            });
            varUserCity = response.address.city;   //creating a var of the response to have it appear elsewhere on page.
            
          }






  

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://pokemon-go1.p.rapidapi.com/weather_boosts.json",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
		"x-rapidapi-key": "137b0a8991mshfe042d583612905p1ff297jsnc05f2d857777"
	}
}


$.ajax(settings).done(function (response) {
    console.log(response);
    $(".test").on("click", function() {
        var weather = $("#boostedTest option:selected").text();
        console.log(weather);
        var currentBoost = response[weather];
        for (i=0; i < currentBoost.length; i++) {
            console.log("The boosted types are: " + currentBoost[i]);
            var typeCard = $("<div>");
            typeCard.addClass("card border-0 typeCard");
            var typeSymbol = $("<img>");
            typeSymbol.addClass("card-img-top typeSymbol");
            typeSymbol.attr("src", "./assets/images/" + currentBoost[i] + ".png");
            typeCard.append(typeSymbol);
            var typeTitle = $("<div>");
            typeTitle.addClass("card-title text-center");
            typeTitle.text(currentBoost[i]);
            typeCard.append(typeTitle);
            $("#typeBox").append(typeCard);
        }
    })
});

