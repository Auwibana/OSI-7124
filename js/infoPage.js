
window.onload = function () {
	//src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBkx0jxbskZB744V0-NKGVaW0VeTnwfIyY";
}




function myMap() {

	var map;
	directionsDisplay = new google.maps.DirectionsRenderer();
	

	var mapOptions = {
		center: new google.maps.LatLng(52.3758916, 9.7320104),
		zoom: 11
	}

	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	directionsDisplay.setMap(map);
	//directionsDisplay.setPanel(document.getElementById("directionsPanel"));

	calcRoute(directionsDisplay);
}

function calcRoute(directionsDisplay) {

	var directionsService = new google.maps.DirectionsService();

  var start = "Hannover";
  var end = "Bremen";
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
}
