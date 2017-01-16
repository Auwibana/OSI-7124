
window.onload = function () {
	//src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBkx0jxbskZB744V0-NKGVaW0VeTnwfIyY";
}

// Dieses Programm findet die Position des Nutzers heraus und centriert die Karte auf den Nutzer
// Einfacheres Programm das nur die Position des Nutzers ermittelt gibt es in index.js
function getGeolocation(map){
	var infoWindow = new google.maps.InfoWindow({map: map});

	// Try HTML5 geolocation.
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(function(position) {
	    var pos = {
	      lat: position.coords.latitude,
	      lng: position.coords.longitude
	    };

	    infoWindow.setPosition(pos);
	    infoWindow.setContent('Location found.');
	    map.setCenter(pos);
			// Das hier ist die momentane Nutzer Position die in der DB gespeichert werden muss

			alert(position.coords.latitude);
	  }, function() {
	    handleLocationError(true, infoWindow, map.getCenter());
	  });
	} else {
	  // Browser doesn't support Geolocation
	  handleLocationError(false, infoWindow, map.getCenter());
	}
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
                      'Error: The Geolocation service failed.' :
                      'Error: Your browser doesn\'t support geolocation.');
}


function myMap() {

	var map;
	directionsDisplay = new google.maps.DirectionsRenderer();


	var mapOptions = {
		// change the center of the map to users location or hardcode it for a borad view on Germany
		center: new google.maps.LatLng(52.3758916, 9.7320104),
		zoom: 11
	}

	map = new google.maps.Map(document.getElementById("map"), mapOptions);

	getGeolocation(map)

	directionsDisplay.setMap(map);

	// Directions panel gibt eine Weg Beschreibung die brauchen wir aber gerade nicht.
	//directionsDisplay.setPanel(document.getElementById("directionsPanel"));

	calcRoute(directionsDisplay);
}

function calcRoute(directionsDisplay) {

	var directionsService = new google.maps.DirectionsService();

	// Es können beliebig viele waypoints hier erstellt werden, um sie als zwischenstops zu nutzen
	var  waypoints = [];

	var waypoints_obj = {
		location: "Hannover Hauptbahnhof",
		stopover: true
	};

	waypoints.push(waypoints_obj);
	// start und end müssen noch von der Datenbank geholt werden
  var start = "Hannover";
  var end = "Bremen";
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING,
		waypoints: waypoints,
		optimizeWaypoints: true
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
}
