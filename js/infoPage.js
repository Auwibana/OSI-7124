var requestGet = new XMLHttpRequest();
var start
var end
var zwischen
var time
var date

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
    "option": optionGet,
    "auswahl": auswahlGet,
		"login":login
};

function auswahlGet(response) {
    start = response.start
    end = response.end
    time = response.time
    date = response.date
}

function optionGet(response) {
    zwischen = response.zwischenstops
		for(var i = 0; i<response.zwischenstopsHtml.length;i++){
			var li = document.createElement('li')
			li.innerHTML = response.zwischenstopsHtml[i]
			li.className += 'list-group-item'
			if(i==0){
				li.children[0].removeChild(li.children[0].children[0])
			}
			document.getElementById('waypoints-check-info').appendChild(li)
		}
}

function login(response){
	document.getElementById("reg").innerHTML = " "+response.login
	$('#login').hide()
	$('#logout').show()
	$('#login-popup').popover('hide')
}

$('document').ready(function(){
	get('login')
})

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

    showCar(map)

    // calcRoute(directionsDisplay);
	lat= 52.3759;
	lng= 9.732;

	showCar(map, lat, lng);

	// Es können beliebig viele waypoints hier erstellt werden, um sie als zwischenstops zu nutzen
	get("option");
	var  waypoints = [];

	zwischen.forEach((n) => {
		var waypoints_obj = {
			location: n,
			stopover: true
		};
		waypoints.push(waypoints_obj);
	})

	get("auswahl");

	calcRoute(directionsDisplay, start, end, waypoints);


    // nachdem das Auto angekommen ist
    // map.clearOverlays();

    // Dann veschwindet der Marker wieder.
    // oder marker.setMap(null)
}
// CalcRoute sollte modifizierbarer sein, Das heißt mit Argumenten kann man eine beliebige Strecke planen.
// Dann kann man diese Funktion auch benutzen um die Strecke des Autos zum Startpunkt zu planen.

// Hier und weiter unten fehlt noch die Abfahrtszeit als übergabe
function calcRoute(directionsDisplay, start, end, waypoints) {

    var directionsService = new google.maps.DirectionsService();

    // Es können beliebig viele waypoints hier erstellt werden, um sie als zwischenstops zu nutzen
    get("option")
    var waypoints = [];

    zwischen.forEach((n) => {
        var waypoints_obj = {
            location: n,
            stopover: true
        };
        waypoints.push(waypoints_obj);
    })

    // Beispiele zur Eingabe der Zeit

    //var today = new Date();
    //var birthday = new Date("December 17, 1995 03:24:00");
    //var birthday = new Date("1995-12-17T03:24:00");
    //var birthday = new Date(1995,11,17);
    //var birthday = new Date(1995,11,17,3,24,0);

    var departure_time = new Date().getTime() / 1000;

    get("auswahl")
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: waypoints,
        optimizeWaypoints: true,
        departure_time: departure_time
    };
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        }
    });
}

function showCar(map) {

    var carLattLng = {
        lat: 52.3759,
        lng: 9.732
    };
	var directionsService = new google.maps.DirectionsService();

	// Beispiele zur Eingabe der Zeit

	//var today = new Date();
	//var birthday = new Date("December 17, 1995 03:24:00");
	//var birthday = new Date("1995-12-17T03:24:00");
	//var birthday = new Date(1995,11,17);
 	//var birthday = new Date(1995,11,17,3,24,0);

	var depature_time = new Date("December 17, 1995 03:24:00");

  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.DRIVING,
		waypoints: waypoints,
		optimizeWaypoints: true,
		transitOptions: {
			departureTime: depature_time
		}
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
}

function getTravelTime(start, end, waypoints){
		var depature_time = new Date("December 17, 1995 03:24:00");

		var directionsService = new google.maps.DirectionsService();

		var request = {
			origin: start,
			destination: end,
			travelMode: google.maps.TravelMode.DRIVING,
			waypoints: waypoints,
			optimizeWaypoints: true,
			transitOptions: {
				departureTime: depature_time
			}
		};

		directionsService.route(request, function(result, status) {
	    if (status == google.maps.DirectionsStatus.OK) {
				var time = 0;

				for(var i = 0; i < results.routes[0].legs.length; i++){
					time += result.routes[0].legs[i].duration.value;
				}

				alert(time / 60);
	    }
	  });
}

function getWayCoordinates(start, end, waypoints){
		var depature_time = new Date("December 17, 1995 03:24:00");

		var directionsService = new google.maps.DirectionsService();

		var request = {
			origin: start,
			destination: end,
			travelMode: google.maps.TravelMode.DRIVING,
			waypoints: waypoints,
			optimizeWaypoints: true,
			transitOptions: {
				departureTime: depature_time
			}
		};

		directionsService.route(request, function(result, status) {
	    if (status == google.maps.DirectionsStatus.OK) {
				var waypoints = [];
				// ich gehe hier davon aus das das auto keine zwischenstops mehr macht
				// und einfach einer geraden Route folgt
				// das zu ändern wäre aber einfach man müsste mit einer zweiten for schleife
				// einfach nochmal über legs iterieren
				for(var i = 0; i < results.routes[0].legs[0].steps.length; i++){
					waypoints[i] = results.routes[0].legs[0].steps[i].start_location;
				}

				alert(waypoints);
	    }
	  });
}

function showCar(map, lat, lng){

	var carLattLng = {lat: lat, lng: lng};

    var relativePixelSize = scaleImageWIthZoom(map);

    var marker = new google.maps.Marker({
        position: carLattLng,
        map: map,
        title: "Dein Auto",
        icon: null
    });

    setMarkerIcon(marker, relativePixelSize);

    addInfoWindowToMarker(map, marker, "Auto");

    google.maps.event.addListener(map, "zoom_changed", function() {

        var relativePixelSize = scaleImageWIthZoom(map);
        setMarkerIcon(marker, relativePixelSize);

    });
}

function scaleImageWIthZoom(map) {
    var pixelSizeAtZoom0 = 8; //the size of the icon at zoom level 0
    var maxPixelSize = 350; //restricts the maximum size of the icon, otherwise the browser will choke at higher zoom levels trying to scale an image to millions of pixels

    var zoom = map.getZoom();
    var relativePixelSize = Math.round(pixelSizeAtZoom0 * Math.pow(2, zoom)); // use 2 to the power of current zoom to calculate relative pixel size.  Base of exponent is 2 because relative size should double every time you zoom in

    if (relativePixelSize > maxPixelSize) //restrict the maximum size of the icon
        relativePixelSize = maxPixelSize;

    return relativePixelSize / 16; //  16 is a costum modifier because this code is written for images with the size 8x8, momentarly the image is 256x256
}

function setMarkerIcon(marker, relativePixelSize) {
    marker.setIcon(
        new google.maps.MarkerImage(
            'http://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/128/Car-icon.png',
            null,
            new google.maps.Point(0, 0), // origin
            new google.maps.Point(relativePixelSize / 2, relativePixelSize / 2), // anchor
            new google.maps.Size(relativePixelSize, relativePixelSize)
        )
    )
}

function addInfoWindowToMarker(map, marker, contentString) {
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    infowindow.open(map, marker)
}

function convertDate(date, time){

}
