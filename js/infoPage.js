var requestGet = new XMLHttpRequest();
var start
var end
var zwischen

requestGet.onreadystatechange = function() {
	// console.log("onreadystatechange: " + requestGet.readyState + ", " +  requestGet.status);
	// console.log(requestGet.responseText);
	if (requestGet.readyState == 4) {
		if (requestGet.status == 200) {
			var response = JSON.parse(requestGet.responseText);
			handlersGet[response._id](response);
		}
		if (requestGet.status == 404) {
			console.log("not found: " + requestGet.responseText);
		}
	}
};

function get(variable) {
	// console.log("get " + variable);
	requestGet.open("GET", dburl + variable, false);
	requestGet.send();
}

function update() {
	for (var name in handlersGet) {
		// console.log("updating " + name);
		get(name);
	}
}


///////////////////////////////////////////////////////////////////////////////
// your code below

var dbname = "hci1";
var dburl = "http://127.0.0.1:5984/" + dbname + "/";
var handlersGet = {
	"option" : optionGet,
	"auswahl": auswahlGet
};

function auswahlGet(response) {
	start = response.start
	end = response.end
}

function optionGet(response) {
	zwischen = response.zwischenstops
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


	directionsDisplay.setMap(map);

	// Directions panel gibt eine Weg Beschreibung die brauchen wir aber gerade nicht.
	//directionsDisplay.setPanel(document.getElementById("directionsPanel"));

	calcRoute(directionsDisplay);
}

function calcRoute(directionsDisplay) {

	var directionsService = new google.maps.DirectionsService();

	// Es können beliebig viele waypoints hier erstellt werden, um sie als zwischenstops zu nutzen
	get("option")
	var  waypoints = [];

	var waypoints_obj = {
		location: zwischen,
		stopover: true
	};

	waypoints.push(waypoints_obj);
	// start und end müssen noch von der Datenbank geholt werden
	get("auswahl")
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
