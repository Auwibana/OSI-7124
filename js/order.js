function auswahl_pressed() {
	document.getElementById("auswahl").style.display = "inherit";
	document.getElementById("option").style.display = "none";
	document.getElementById("prufen").style.display = "none";
	document.getElementById("bestatigen").style.display = "none";
	document.getElementById("info").style.display = "none";
	document.getElementById("last").style.display = "none";
	document.getElementById("p_auswahl").style.color = "red";
	document.getElementById("p_option").style.color = "white";
	document.getElementById("p_prufen").style.color = "white";
	document.getElementById("p_bestatigen").style.color = "white";
}

function option_pressed() {
	document.getElementById("auswahl").style.display = "none";
	document.getElementById("option").style.display = "inherit";
	document.getElementById("prufen").style.display = "none";
	document.getElementById("bestatigen").style.display = "none";
	document.getElementById("info").style.display = "none";
	document.getElementById("last").style.display = "none";
	document.getElementById("p_auswahl").style.color = "white";
	document.getElementById("p_option").style.color = "red";
	document.getElementById("p_prufen").style.color = "white";
	document.getElementById("p_bestatigen").style.color = "white";
}

function prufen_pressed() {
	document.getElementById("auswahl").style.display = "none";
	document.getElementById("option").style.display = "none";
	document.getElementById("prufen").style.display = "inherit";
	document.getElementById("bestatigen").style.display = "none";
	document.getElementById("info").style.display = "none";
	document.getElementById("last").style.display = "none";
	document.getElementById("p_auswahl").style.color = "white";
	document.getElementById("p_option").style.color = "white";
	document.getElementById("p_prufen").style.color = "red";
	document.getElementById("p_bestatigen").style.color = "white";
}

function bestatigen_pressed() {
	document.getElementById("auswahl").style.display = "none";
	document.getElementById("option").style.display = "none";
	document.getElementById("prufen").style.display = "none";
	document.getElementById("bestatigen").style.display = "inherit";
	document.getElementById("info").style.display = "none";
	document.getElementById("last").style.display = "none";
	document.getElementById("p_auswahl").style.color = "white";
	document.getElementById("p_option").style.color = "white";
	document.getElementById("p_prufen").style.color = "white";
	document.getElementById("p_bestatigen").style.color = "red";
}

function auswahl_weiter() {
	document.getElementById("option").style.display = "inherit";
	document.getElementById("auswahl").style.display = "none";
	document.getElementById("p_option").style.color = "red";
	document.getElementById("p_auswahl").style.color = "white";
}

function option_zuruck() {
	document.getElementById("auswahl").style.display = "inherit";
	document.getElementById("option").style.display = "none";
	document.getElementById("p_auswahl").style.color = "red";
	document.getElementById("p_option").style.color = "white";
}

function option_weiter() {
	document.getElementById("prufen").style.display = "inherit";
	document.getElementById("option").style.display = "none";
	document.getElementById("p_prufen").style.color = "red";
	document.getElementById("p_option").style.color = "white";
}

function prufen_zuruck() {
	document.getElementById("option").style.display = "inherit";
	document.getElementById("prufen").style.display = "none";
	document.getElementById("p_option").style.color = "red";
	document.getElementById("p_prufen").style.color = "white";
}

function prufen_weiter() {
	document.getElementById("bestatigen").style.display = "inherit";
	document.getElementById("prufen").style.display = "none";
	document.getElementById("p_bestatigen").style.color = "red";
	document.getElementById("p_prufen").style.color = "white";
}

function bestatigen_weiter() {
	document.getElementById("last").style.display = "inherit";
	document.getElementById("bestatigen").style.display = "none";
	document.getElementById("p_bestatigen").style.color = "white";
}
