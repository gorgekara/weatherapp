/* global define */
define(['icon'], function (icon) {
	'use strict';

	var weatherAPIUrl = 'http://api.openweathermap.org/data/2.5/weather?units=metric',
		googleMapsUrl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyCNI3V4xImkA1Kzi89qNvHWJ7qUW6aHVn0',
		weatherElement = document.createElement('div'),
		currentCity = "Skopje",
		geoposition = {};

	function setWeatherElement(element) {
		weatherElement = element;
	}

	function getWeatherData(city, callback) {
		var xhr = new XMLHttpRequest(),
			cleanCity = city || "Skopje";

		if (typeof callback === 'undefined') {
			return false;
		}

		xhr.open("GET", weatherAPIUrl + '&q=' + city, true);
		xhr.send();

		xhr.onreadystatechange = function() {
		  	if (xhr.readyState == 4 && xhr.status == 200) {
		    	callback(xhr.responseText);
		    }
		}

	}

	function searchWeather(event, autoCity) {
		if (typeof event !== 'undefined' && event) {
			event.preventDefault();
		}

		var city = document.getElementById('city').value === "" ? 'Skopje' : document.getElementById('city').value;

		if (autoCity) {
			city = autoCity;
		}
		
		getWeatherData(city, setMainWeather);
		currentCity = city;

		return false;
	}

	function setMainWeather(weatherObj) {
		if (typeof weatherObj === 'undefined') {
			return {};
		}

		var weatherData = JSON.parse(weatherObj),
			main = weatherElement.getElementsByTagName("div");

		main[0].innerHTML = weatherData.name;
		// main[1].innerHTML = weatherData.weather[0].main;
		main[2].innerHTML = icon[weatherData.weather[0].main.toLowerCase()] + ' <span class="degrees">' + parseInt(weatherData.main.temp) + '&deg;</span>';
	}

	function setCoords(geoObj) {
		if (typeof geoObj !== 'undefined') {
			geoposition = {
				lat: geoObj.coords.latitude,
				lng: geoObj.coords.longitude
			};
		}
	}

	return {
		getWeatherData: getWeatherData,
		setMainWeather: setMainWeather,
		setWeatherElement: setWeatherElement,
		searchWeather: searchWeather,
		setCoords: setCoords
	}

});