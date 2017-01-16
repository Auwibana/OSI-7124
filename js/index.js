
// Diese Funktion kann zum suchen und Autovervollständigen von Positionseingaben des Nutzers verwendet werden kann.
// soll hier nicht verwendet werden sondern gilt als Template für die Texteingabe von Adressen
function initService() {
  var displaySuggestions = function(predictions, status) {
    // Überprüft nur den Status der Seite
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      alert(status);
      return;
    }
    // Zeigt alle Orte zur Autovervollständigung an
    predictions.forEach(function(prediction) {
      var li = document.createElement('li');
      li.appendChild(document.createTextNode(prediction.description));
      document.getElementById('results').appendChild(li);
    });
  };

  var service = new google.maps.places.AutocompleteService();

  // ich glaube das braucht man nicht
  //service.getQueryPredictions({ input: 'pizza near Syd' }, displaySuggestions);

  // hier muss das input field vom type text stehen
  var input = document.getElementById('searchTextField');

  // das ist das SearchBox Objekt das die Suggestions handled
  var searchBox = new google.maps.places.SearchBox(input, {
    //bounds: defaultBounds

    // das hier beschränkt die suche auf Deutschland
    // habe aber nicht das gefühl das die restriction wirklich functioniert
    componentRestrictions: {country: 'de'}
  });

  // hier mit kann man die Suche auf die Umgebung des Nutzers beschränken
  // Hier sollte man noch die Dynamamische Position des Users einbauen
  // kann wahrscheinlich aus kommentiert werden
  // oben die suche auf deutschland beschränkt
  var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-33.8902, 151.1759),
    new google.maps.LatLng(-33.8474, 151.2631));

  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    // Sobald sich der Nutzer für eine Adresse entschieden hat das ergbeniss von hier ausgelesen werden.
    alert(searchBox.getPlaces()[0].formatted_address);
  });
}

// eine leichtere Function um die Geodaten auszulesen
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());

      // Diese Geodaten könnten dann als user position in die Datenbank reingemacht werden
      // position.coords.latitude
      // position.coords.longitude
    });
  }
}
