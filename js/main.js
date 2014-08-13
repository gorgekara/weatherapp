/* global require */
require(['icon', 'weather', 'geolocation', 'map'], function (icon, weather, geolocation, map) {
	'use strict';

	var main = document.getElementById('main'),
		searchForm = document.getElementById("searchForm");
	
	weather.setWeatherElement(main);
	searchForm.addEventListener('submit', weather.searchWeather, false);
	weather.searchWeather();

	geolocation.getLocation(weather.setCoords);

});