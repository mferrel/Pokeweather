var gameWeatherArray = {};

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
                    $("#pokeStats").html("<h4>" + currentPoke + " is a " + response[k].type[0] + " / " + determinePoke.type[1]+ " type.</h4>")
                } else {
                $("#pokeStats").html("<h4>" + currentPoke + " is a " + response[k].type + " type.</h4>") }
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

// var queryURL = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=40.11040&lon=-74.85480"

// $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {

//     console.log(response);
  
//   });

