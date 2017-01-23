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
    var start = document.getElementById('start');
    var ziel = document.getElementById('ziel');
    var zwischenstops = document.getElementById('zwischenstops');

    // das ist das SearchBox Objekt das die Suggestions handled
    var searchStart = new google.maps.places.SearchBox(start, {
        //bounds: defaultBounds

        // das hier beschränkt die suche auf Deutschland
        // habe aber nicht das gefühl das die restriction wirklich functioniert
        componentRestrictions: {
            country: 'de'
        }
    });

    var searchZiel = new google.maps.places.SearchBox(ziel, {
        //bounds: defaultBounds

        // das hier beschränkt die suche auf Deutschland
        // habe aber nicht das gefühl das die restriction wirklich functioniert
        componentRestrictions: {
            country: 'de'
        }
    });

    var searchZwischenstops = new google.maps.places.SearchBox(zwischenstops, {
        //bounds: defaultBounds

        // das hier beschränkt die suche auf Deutschland
        // habe aber nicht das gefühl das die restriction wirklich functioniert
        componentRestrictions: {
            country: 'de'
        }
    });

    // hier mit kann man die Suche auf die Umgebung des Nutzers beschränken
    // Hier sollte man noch die Dynamamische Position des Users einbauen
    // kann wahrscheinlich aus kommentiert werden
    // oben die suche auf deutschland beschränkt
    searchStart.addListener('places_changed', function() {
        var places = searchStart.getPlaces();

        if (places.length == 0) {
            return;
        }
        // Sobald sich der Nutzer für eine Adresse entschieden hat das ergbeniss von hier ausgelesen werden.
        //alert(searchStart.getPlaces()[0].formatted_address);
    });

    searchZiel.addListener('places_changed', function() {
        var places = searchZiel.getPlaces();

        if (places.length == 0) {
            return;
        }
        // Sobald sich der Nutzer für eine Adresse entschieden hat das ergbeniss von hier ausgelesen werden.
        //alert(searchZiel.getPlaces()[0].formatted_address);
    });

    searchZwischenstops.addListener('places_changed', function() {
        var places = searchZwischenstops.getPlaces();

        if (places.length == 0) {
            return;
        }
        // Sobald sich der Nutzer für eine Adresse entschieden hat das ergbeniss von hier ausgelesen werden.
        //alert(searchZiel.getPlaces()[0].formatted_address);
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
            geolocate2(geolocation.lat, geolocation.lng);

            // Diese Geodaten könnten dann als user position in die Datenbank reingemacht werden
            // position.coords.latitude
            // position.coords.longitude
        });
    }
}


function geolocate2(lat, lng) {
    var geocoder = new google.maps.Geocoder;
    var latlng = {
        lat: lat,
        lng: lng
    };
    geocoder.geocode({
        'location': latlng
    }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                document.getElementById('start').value = results[0].formatted_address;
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }

    });
}
