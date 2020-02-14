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
        j++;
    } else {
    console.log(pokemonList.name);
        var pokemonEntry = $("<option>");
        pokemonEntry.text(pokemonList.name);
        $("#pokemonSelect").append(pokemonEntry);
        j++;
    }}
    

});

$(".pokeButton").on("click", function () {
    var currentPoke = $("#pokemonSelect option:selected").text();
    console.log(currentPoke);
})