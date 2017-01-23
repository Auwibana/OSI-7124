/*
XMLHttpRequest:
https://en.wikipedia.org/wiki/XMLHttpRequest

CouchDB:
http://guide.couchdb.org/draft/tour.html
https://wiki.apache.org/couchdb/HTTP_Document_API
http://docs.couchdb.org/en/1.6.1/config/intro.html
http://docs.couchdb.org/en/1.6.1/config/http.html#cross-origin-resource-sharing
http://docs.couchdb.org/en/1.6.1/intro/curl.html

HTML(5):
http://www.w3schools.com/html/default.asp
http://www.w3schools.com/jsref/default.asp

CouchDB configuration (Mac OS X):
~/Library/Application Support/CouchDB/etc/couchdb/local.ini
/Applications/Apache CouchDB.app/Contents/Resources/couchdbx-core/etc/couchdb/local.ini
CouchDB configuration (Windows):
C:\Program Files (x86)\Apache Software Foundation\CouchDB\etc\couchdb\local.ini
start/stop/restart: Control Panel --> Services --> Apache CouchDB

[httpd]
enable_cors = true
bind_address = 0.0.0.0  <-- for access from other devices, 127.0.0.1: local device only
...

[cors]
origins = *

*/

var requestGet = new XMLHttpRequest();

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
	"register" : registerGet,
	"option" : optionGet,
	"auswahl": auswahlGet
};

function registerGet(response) {
	var user = document.getElementById('username').value
	var pass = document.getElementById('pass').value
	if(response[user]){
		var uobj = response[user]
		if(uobj.pass == pass){
			document.getElementById("reg").innerHTML = " "+user
			$('#login').hide()
			$('#logout').show()
			$('#login-popup').popover('hide')
		}else{
			$('.passDiv').append('<div class="alert alert-warning alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Error!</strong><br>Falsches Passwort</div>')
		}
	}else{
		$('.userDiv').append('<div class="alert alert-warning alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Error!</strong><br>Nutzer nicht gefunden</div>')
	}
}

function auswahlGet(response) {
	document.getElementById('standort_p').innerHTML = response.start
	document.getElementById('ziel_p').innerHTML = response.end
	document.getElementById('time_p').innerHTML = response.time + " Uhr"
	document.getElementById('date_p').innerHTML = response.date
}

function optionGet(response) {

	if(response.passenger) {
		document.getElementById('take_passengers_p').innerHTML = "Ja"
	} else document.getElementById('take_passengers_p').innerHTML = "Nein"

	document.getElementById('passenger_p').innerHTML = response.persons
	document.getElementById('preis_p').innerHTML = "Preis: "+20+response.persons*5 +"€"
	document.getElementById('preis').innerHTML = "Preis: "+20+response.persons*5 +"€"
	document.getElementById('waypoints-check-table').innerHTML = "<ul id='waypoints-check'></ul>"
	for(var i = 0; i<response.zwischenstops.length;i++){
		var li = document.createElement('li')
		li.innerHTML = response.zwischenstops[i]
		li.className += 'list-group-item'
		if(i==0){
			li.children[0].removeChild(li.children[0].children[0])
		}
		document.getElementById('waypoints-check').appendChild(li)
	}
	//if(response.zwischenstops != ""){
	//	document.getElementById('zwischenList').innerHTML = "<li>"+response.zwischenstops+"</li>"
	//}
	document.getElementById("wartezeit").innerHTML = "Wartezeit: " + Math.floor(Math.random()*5) +":" +Math.floor(Math.random()*60)
}
