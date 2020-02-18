// Automatically detect location/allow for manual location input

var latCoordinate;  //call to try to solve scope issue
var lonCoordinate;
var userZip;
var gameWeatherArray = {};

$("#weatherdiv").hide();

var date = new Date();
console.log(date);
var currentHour = date.getHours();
console.log(currentHour);

if (navigator.geolocation) {
  //true
// alert ('let\'s find out more about weather and Pokemon?')
} else {
  //false
alert('geolocation not available?! What browser is this?');
  // prompt for city?
}



$( document ).ready(function() {
                        
        function getLocation() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          } else { 
            $("#geolocation").text("Geolocation is not supported by this browser.");
          }
        }
        
        getLocation();

        function showPosition(position) {

        //   $("#geolocation").html("Latitude: " + Math.round(position.coords.latitude) + 
        //   "<br>Longitude: " + Math.round(position.coords.longitude));

          let latCoordinate = position.coords.latitude;
          let lonCoordinate = position.coords.longitude;
       
          var queryURL = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + latCoordinate.toFixed(5) + "&lon=" + lonCoordinate.toFixed(5); 
            $.ajax({
              url: queryURL,
              method: "GET"
            }).then(function(response) {
              console.log(response);

              userZip = response.address.postcode;
              console.log(userZip)

            console.log(response.address.city); //successfully shows city
            getWeather();
            $("#weatherdiv").show();
            $("#geolocation").text("Your location is currently set to: " + response.address.city + ", " + userZip);

            })
            // document.getElementById("geoCity").innerHTML = response.address.city + ", " + response.address.postcode;
  
             
          }
     
        })



$("#manualZipButton").on("click", function(event){
    event.preventDefault();
    $("#geolocation").empty();
    userZip = $("#manualZip").val().trim();
    console.log(userZip);
    getWeather();
    $("#weatherdiv").show();
    $("#geolocation").text("Your location is currently set to zip code: " + userZip);
    })

// var userZip = 48182;

// Pulls weather forecast for set location

function getWeather () {
var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?zip="+ userZip + "&appid=2023ba5c12854dcdc1d6fbe23996eaaf";
// var queryURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}appid=${apiKEY}`// template literals/strings 

var clearWeatherTypes = 800;
var cloudyWeatherTypes = [803, 804];
var fogWeatherTypes = [701, 711, 721, 731, 741, 751, 761, 762];
var partlyCloudyWeatherTypes = [801, 802];
var rainWeatherTypes = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232, 300, 301, 302, 310, 311, 312, 313, 314, 321, 500, 501, 502, 503, 504, 511, 520, 521, 522, 531];
var snowWeatherTypes = [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622];
var sunnyWeatherTypes = 800;
var windyWeatherTypes = [771, 781];

let weatherBackgroundImg = $("#weathercard");

var weatherType = {
    id: 0, //numeric id from weather api
    pokemonWeatherType: '', //assign this based on what weather category you want it to be a part of
}

//This is the GET method for the OpenWeather API
$.ajax({
    url: weatherQueryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
    var weatherApiIdType = response.weather[0].id;
    console.log('weather api type', weatherApiIdType)
    console.log('clear api type', clearWeatherTypes, sunnyWeatherTypes)
    console.log(response.name)

//This converts the temperature information that the API fetches from Kelvin to Fahrenheit...
    let K = response.main.temp;
    let temperature =  ((K-273.15)*1.8)+32
    temperature = Math.round(temperature);
    console.log(temperature);
//...and displays it on the weather card
    $("#weathercardtext").html("<h1>" + temperature + "°F");
    
    
    if (weatherApiIdType === clearWeatherTypes || weatherApiIdType === sunnyWeatherTypes) {
        weatherType.id = weatherApiIdType
        //SHOULD I FIGURE OUT HOW THIS SHOULD SAY SUNNY TOO?
        weatherType.pokemonWeatherType = "Clear"
        weatherBackgroundImg.attr('src', 'assets/images/clear.jpg')
      
        console.log('im in clear weather')
    }

    else if (cloudyWeatherTypes.includes(weatherApiIdType)) {
        console.log('im in cloudy weather')
        weatherType.id = weatherApiIdType
        weatherType.pokemonWeatherType = "Cloudy"
        weatherBackgroundImg.attr('src', 'assets/images/cloudyovercast.jpg')

        
    }

    else if (fogWeatherTypes.includes(weatherApiIdType)) {
        console.log('im in fog')
        console.log('weatherApiIdType', weatherApiIdType)
        weatherType.id = weatherApiIdType
        weatherType.pokemonWeatherType = "Fog"
        weatherBackgroundImg.attr('src', 'assets/images/fog.jpg')
    }

    else if (partlyCloudyWeatherTypes.includes(weatherApiIdType)) {
        console.log('im in partly cloudy weather')
        console.log('weatherApiIdType', weatherApiIdType)
        weatherType.id = weatherApiIdType
        weatherType.pokemonWeatherType = "Partly Cloudy"
        weatherBackgroundImg.attr('src', 'assets/images/partlycloudy.jpg')
    }

    else if (rainWeatherTypes.includes(weatherApiIdType)) {
        console.log('im in rain')
        console.log('weatherApiIdType', weatherApiIdType)
        weatherType.id = weatherApiIdType
        weatherType.pokemonWeatherType = "Rain"
        weatherBackgroundImg.attr('src', 'assets/images/rainy.jpg')
    }

    else if (snowWeatherTypes.includes(weatherApiIdType)) {
        console.log('im in fog')
        console.log('weatherApiIdType', weatherApiIdType)
        weatherType.id = weatherApiIdType
        weatherType.pokemonWeatherType = "Snow"
        weatherBackgroundImg.attr('src', 'assets/images/snowy.jpg')
    }

    else if (sunnyWeatherTypes.includes(weatherApiIdType)) {
        console.log('im in sunny weather')
        console.log('weatherApiIdType', weatherApiIdType)
        weatherType.id = weatherApiIdType
        weatherType.pokemonWeatherType = "Sunny"
        weatherBackgroundImg.attr('src', 'assets/images/fog.jpg')
    }

    else if (windyWeatherTypes.includes(weatherApiIdType)) {
        console.log('im in windy weather')
        console.log('weatherApiIdType', weatherApiIdType)
        weatherType.id = weatherApiIdType
        weatherType.pokemonWeatherType = "Windy"
        weatherBackgroundImg.attr('src', 'assets/images/fog.jpg')
    }

    else {
        weatherBackgroundImg.attr("src", 'assets/images/defaultimage.jpg');
    }

     $("#currentweathercondition").text("The current weather condition is " + response.weather[0].description + ".");
     console.log(response.weather);
     $("#currentGameWeather").empty();
     var gameWeatherIcon = $("<img>");
     gameWeatherIcon.addClass("gameWeatherIcon");
     var gameWeatherStatus = "The current in-game weather is " + weatherType.pokemonWeatherType.toLowerCase(); + "."
     if ((weatherType.pokemonWeatherType == "Clear" || weatherType.pokemonWeatherType == "Sunny") && currentHour > 6 && currentHour < 19) {
         gameWeatherIcon.attr('src', './assets/images/clearGameDay.png')
        } else if (weatherType.pokemonWeatherType == "Clear") {
        gameWeatherIcon.attr('src', './assets/images/clearGameNight.png')
        } else if (weatherType.pokemonWeatherType == "Fog") {
            gameWeatherIcon.attr('src', './assets/images/fogGame.png')
            }
            else if (weatherType.pokemonWeatherType == "Partly Cloudy" && currentHour > 6 && currentHour < 19) {
                gameWeatherIcon.attr('src', './assets/images/cloudyGameDay.png')
                } else if (weatherType.pokemonWeatherType == "Partly Cloudy") {
                    gameWeatherIcon.attr('src', './assets/images/cloudyGameNight.png')
                    } else if (weatherType.pokemonWeatherType == "Rain") {
                        gameWeatherIcon.attr('src', './assets/images/rainGame.png')
                        } else if (weatherType.pokemonWeatherType == "Snow") {
                            gameWeatherIcon.attr('src', './assets/images/snowGame.png')
                            } else if (weatherType.pokemonWeatherType == "Windy") {
                                gameWeatherIcon.attr('src', './assets/images/windyGame.png')
                                }
        $("#currentGameWeather").append(gameWeatherIcon);
        $("#currentGameWeather").append(gameWeatherStatus);


// Calls every in-game weather category and their respective boosted types

var settingsGameWeather = {
	"async": true,
	"crossDomain": true,
	"url": "https://pokemon-go1.p.rapidapi.com/weather_boosts.json",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
		"x-rapidapi-key": "137b0a8991mshfe042d583612905p1ff297jsnc05f2d857777"
	}
}

$.ajax(settingsGameWeather).done(function (response) {
    console.log(response);

    // Need to expand here to store weather/type boost pairs and use them in Pokemon select function below
    $.each(response, function( key, value ) {
        console.log( key + ": " + value );
        gameWeatherArray[key] = value;
      });
    console.log(gameWeatherArray);

        $("#typeBox").empty();
        var weather = weatherType.pokemonWeatherType;
        console.log(weather);

        // Pulls specific boosted types from weather chosen
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
});


})
};

// Calls every in-game weather category and their respective boosted types

var settingsGameWeather = {
	"async": true,
	"crossDomain": true,
	"url": "https://pokemon-go1.p.rapidapi.com/weather_boosts.json",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
		"x-rapidapi-key": "137b0a8991mshfe042d583612905p1ff297jsnc05f2d857777"
	}
}

$.ajax(settingsGameWeather).done(function (response) {
    console.log(response);

    // Need to expand here to store weather/type boost pairs and use them in Pokemon select function below
    $.each(response, function( key, value ) {
        console.log( key + ": " + value );
        gameWeatherArray[key] = value;
      });
    console.log(gameWeatherArray);
    $(".test").on("click", function() {
        event.preventDefault();
        $("#typeBox").empty();
        var weather = $("#boostedTest option:selected").text();
        console.log(weather);

        // Pulls specific boosted types from weather chosen
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
    
               










var settingsSelect = {
	"async": true,
	"crossDomain": true,
	"url": "https://pokemon-go1.p.rapidapi.com/released_pokemon.json",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
		"x-rapidapi-key": "137b0a8991mshfe042d583612905p1ff297jsnc05f2d857777"
	}
}

$.ajax(settingsSelect).done(function (response) {
    console.log(response);
    for (j=1; j < 810; j++) {
    var pokemonList = response[j];
    if (pokemonList == null) {
    } else {
    console.log(pokemonList.name);
        var pokemonEntry = $("<option>");
        pokemonEntry.text(pokemonList.name);
        $("#pokemonSelect").append(pokemonEntry);
    }}
    

});

$(".pokeButton").on("click", function () {
    event.preventDefault();
    $("#pokeDisplay").empty();
    $("#pokeStats").empty();
    $("#prefWeather").empty();
    var currentPoke = $("#pokemonSelect option:selected").text();
    console.log(currentPoke);
    var pokeAddress = "https://img.pokemondb.net/sprites/black-white/normal/" + currentPoke.toLowerCase() + ".png"
    console.log(pokeAddress);
    var pokeSprite = $("<img>");
    pokeSprite.addClass("pokeSprite");
    pokeSprite.attr("src", pokeAddress);
    $("#pokeDisplay").append(pokeSprite);


    // // If the image isn't found at the address above, replace URL with the other likely URL
    // $("img").on("error", function () {
    //     $(this).attr("src", "https://img.pokemondb.net/sprites/ultra-sun-ultra-moon/normal/" + currentPoke.toLowerCase() + ".png");
    // });


    // Call Pokemon type endpoint of selected Pokemon
    var settingsSelectType = {
        "async": true,
        "crossDomain": true,
        "url": "https://pokemon-go1.p.rapidapi.com/pokemon_types.json",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
            "x-rapidapi-key": "137b0a8991mshfe042d583612905p1ff297jsnc05f2d857777"
        }
    }
    
    $.ajax(settingsSelectType).done(function (response) {
        console.log(response);
        for (k=1; k < 1019; k++) {
            var determinePoke = response[k];
            if ((response[k].form === "Normal" || response[k].form == null || response[k].form == "Standard") && response[k].pokemon_name == currentPoke) {
                console.log(currentPoke + " is a " + response[k].type + " type.");
                var typeArray = determinePoke.type;
                if (typeArray.length > 1) {
                    $("#prefWeather").append("<h4>" + currentPoke + " is a " + response[k].type[0] + " / " + determinePoke.type[1]+ " type.</h4>")
                } else {
                    $("#prefWeather").append("<h4>" + currentPoke + " is a " + response[k].type + " type.</h4>") }
                k = 1019;
            } else {
                console.log(currentPoke);
            }
        }
        
        // Add code for identifying what weather the pokemon likes here

        console.log(gameWeatherArray);
        console.log(typeArray);
        $.each(gameWeatherArray, function( key, value ) {
            var type1 = typeArray[0];
            var type2 = typeArray[1];
            console.log(type1);
            if ((jQuery.inArray(type1, value) !== -1) || (jQuery.inArray(type2, value) !== -1)) {
                console.log(currentPoke + " likes " + key + " weather conditions.");
                var prefWeather = $("<div>");
                prefWeather.text(currentPoke + " likes " + key.toLowerCase() + " weather.");
                $("#prefWeather").append(prefWeather);
            } else {
                console.log(currentPoke + " feels meh about " + key + " weather.");
            }
          });



     
    });




})



