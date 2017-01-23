var request = new XMLHttpRequest();
var user

request.onreadystatechange = function() {
	console.log("onreadystatechange: " + request.readyState + ", " +  request.status);
	// console.log(request.responseText);
	if (request.readyState == 4) {
		if (request.status == 200) {
			var response = JSON.parse(request.responseText);
			handlers[response._id](response);
		}
		if (request.status == 404) {
			var json = JSON.parse(request.responseText);
			if (json.reason === "no_db_file") {
				createDB();
			} else {
				var url = request.responseURL
				// console.log(typeof(url));
				var i = url.lastIndexOf("/", url.length - 1);
				var name = url.substring(i + 1);
				console.log(name)
				handlers[name]({ "_id" : name });
			}
		}
	}
};

function getCheckedRadio(name) {
	var options = document.getElementsByName(name);
	for (i = 0; i < options.length; i++) {
		var option = options[i];
		if (option.checked) {
			return option.value;
		}
	}
	return null;
}

function set(name) {
	request.open("GET", dburl + name, false);
	request.send();
}

function put(response, message) {
	request.open("PUT", dburl + response._id, false);
	request.setRequestHeader("Content-type", "application/json");
	message["_id"] = response._id;
	if (response._rev) {
		message["_rev"] = response._rev;
	}
	var s = JSON.stringify(message);
	// console.log("put: " + s);
	request.send(s);
}

function update(response, message){
	request.open("PUT", dburl + response._id, false);
	request.setRequestHeader("Content-type", "application/json");
	message["_id"] = response._id;
	if (response._rev) {
		message["_rev"] = response._rev;
	}
	for(var key in response){
		message[key] = response[key]
	}
	var s = JSON.stringify(message);
	// console.log("put: " + s);
	request.send(s);
}

function createDB() {
	request.open("PUT", dburl, false);
	request.send();
}

///////////////////////////////////////////////////////////////////////////////
// your code below

var dbname = "hci1";
var dburl = "http://127.0.0.1:5984/" + dbname + "/";
var handlers = {
	"auswahl" : auswahl,
	"option" : option,
	"register" : register,
	"login": loginWoz
};

function register(response){
	console.log($('#passReg').value)
	if($('#passReg').val() != $('#pass2').val()){
		$('#warn-message').html("Die Passwörter stimmen nicht überein")
		$('#alert-login').show()
		return
	}
	var name = document.getElementById('userReg').value
	var obj = {}
	obj[name] = {"pass":document.getElementById('passReg').value, "home":document.getElementById('home').value}
	update(response, obj)
}

function auswahl(response) {
		var start = document.getElementById("start").value
		var end = document.getElementById("ziel").value
		var date = document.getElementById("date").value
		var time = document.getElementById("time").value
		put(response, {"start" : start, "end": end, "date":date, "time": time});
}

function option(response) {
		var persons = document.getElementById("persons").value
		var passenger = document.getElementById("passenger").checked
		var zwischenstops = []
		if(document.getElementById("zwischenstops").value != ""){
			zwischenstops.push(document.getElementById("zwischenstops").value)
		}
		put(response, {"persons" : persons, "passenger": passenger, "zwischenstops": zwischenstops});
}

function loginWoz(response){
	console.log(response)
	put(response, {"login":user})
}

function loginSet(userP){
	user = userP
	set('login')
}


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
    var start = document.getElementById('home');

    // das ist das SearchBox Objekt das die Suggestions handled
    var searchStart = new google.maps.places.SearchBox(start, {
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

}


$('document').ready(function(){
  createDB()
	$('#logout').hide()
	$('#alert-login').hide()
	document.getElementById('bestellen').type = "Button"
	document.getElementById('bestellen').onclick = function(){
		$('#warn-message').html("Bitte loggen Sie sich zunächst ein!");$('#alert-login').show()}
  var str = '<div style="margin-top: 10px;"><div class="form-group userDiv"><label for="" class="control-label">Username</label><input type="text" id="username" class="form-control"  placeholder=""></div><div class="form-group passDiv"><label for="" class="control-label">Passwort</label><input type="password" class="form-control" id="pass" placeholder=""></div><div style="margin-bottom: 10px"><button class="btn btn-primary pull-right" id="login-btn"'+" onclick=login() "+'>Anmelden</button></div>'
   $('#login-popup').popover({container:'body', content: str, html:true, trigger: 'click'});
});
