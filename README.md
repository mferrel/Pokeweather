

# PokéWeather APP

## Demonstration
![Farmers Market Finder Demo](assets/images/the_pokeweather_api.gif)

## What problem does the PokéWeather App solve?
When playing Pokemon Go, it can be difficult to correlate real-world weather forecasts with the in-game weather categories. In addition, the game doesn’t tell you which weather conditions boost which Pokemon types.


## How does the PokéWeather App solve this?
By detecting the user’s location through a geolocation API (or accepting manual coordinates), the app gets the current forecast for that location.
Through Javascript, the app then determines the in-game weather category and displays the boosted Pokémon types according to a Pokémon Go API.
Users can also manually choose a Pokémon and see their types and preferred weather conditions.

### Ben’s Steps
Using HTML5’s Geolocation API was used first to determine coordinates.  
From this step I used a reverse geolocation API to display the city and zipcode from nominatim.org.
When Vince and Marena were traveling, we tested this function in their new locations and learned that the weather API Marena was already using returned a more accurate location for a user that is not in a well defined city or town. 
Elements of the nomantim are still within our code.  We created a user supplied Zip Code/Postal Code entry as well, in case a user wants to check another area, or if their location is not currently allowable.
We decided as a group on the overall colors, fonts, look, and images shown. 

### Marena’s Steps
I was tasked with finding a weather API that would work with Ben’s geolocator API and Vince’s Pokémon Go API. I used the OpenWeather API which offers a complete current weather report in the form of an object. This weather API divides weather types into Thunderstorm, Drizzle, Snow, Atmosphere (fog and the like), Clear, and Clouds. Those classifications have many subgroups such as light rain, smog, sleet, dust, and heavy thunderstorm, all of which have an index number within the object that is returned. The Pokémon Go API has only 8 weather types: Clear, Cloudy, Partly Cloudy, Fog, Rain, Snow, Sunny, Wind. Because the Pokémon Go weather types don’t directly correlate with the Open Weather API weather types, I had to assign all of the index numbers a variable that would line up exactly with the Pokémon Go types. I then created a series of “if, else if, else” statements that would change after the user inputs their zip code or their location is fetched using Ben’s API. The background of the weather card will change, like a typical weather app, and it will display the current weather conditions and temperature in the HTML. It will simultaneously log to the console what your weather condition is. 

### Vince’s Steps
Utilizing a Pokémon Go API, we are able to plug in the in-game weather category and return the Pokemon types that are subsequently boosted.
This API does not accept parameters - it only has endpoints, necessitating the $.each() method.
These types are displayed to the user alongside the current in-game weather location.

## Potential enhancements to our app/user experience:
Users would be able to view a forecast of up to 10 days in the future so they could plot when to catch their desired pokémon.
Mobile sleekness and accessibility

