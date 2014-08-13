define(function () {

	function getLocation(callback) {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(function (position) {
	        	callback(position);
	        });
	    } else {
	        alert("Geolocation is not supported by this browser.");
	    }
	}

	return {
		getLocation: getLocation
	}	

});