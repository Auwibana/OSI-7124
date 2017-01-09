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
