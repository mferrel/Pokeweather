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

