var request = new XMLHttpRequest();

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

function createDB() {
	request.open("PUT", dburl, false);
	request.send();
}

///////////////////////////////////////////////////////////////////////////////
// your code below

var dbname = "hci1";
var dburl = "http://127.0.0.1:5984/" + dbname + "/";
var handlers = {
	"login": login,
	"auswahl" : auswahl,
	"option" : option
};

function login(response) {
		var username = document.getElementById("username").value
    console.log(username)
		var pass = document.getElementById("pass").value
    document.getElementById("reg").innerHTML = " "+username
    document.getElementById("an").innerHTML = " Logout"
	put(response, {"home" : "Stöckener Markt, Eichsfelder Straße, Hannover, Deutschland", "user":username, "pass":pass})
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
$('document').ready(function(){
  createDB()
  var str = '<form class="form-horizontal" style="margin:20px"><div class="form-group"><label for="" class="control-label">Username</label><input type="text" id="username" class="form-control"  placeholder=""></div><div class="form-group"><label for="" class="control-label">Passwort</label><input type="password" class="form-control" id="pass" placeholder=""></div><div class="form-group"><button class="btn btn-default pull-right" id="login-btn"'+" onclick=set('login') "+'>Anmelden</button></form>'
   $('#login-popup').popover({container:'body', content: str, html:true
     });
});
