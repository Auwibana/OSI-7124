/*function auswahl_pressed() {
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

function bestatigen_zuruck() {
	document.getElementById("bestatigen").style.display = "none";
	document.getElementById("prufen").style.display = "inherit";
	document.getElementById("p_bestatigen").style.color = "white";
	document.getElementById("p_prufen").style.color = "red";
}

function bestatigen_weiter() {
	document.getElementById("last").style.display = "inherit";
	document.getElementById("bestatigen").style.display = "none";
	document.getElementById("p_bestatigen").style.color = "white";
}

function info_pressed() {
    document.getElementById("option").style.display = "none";
    document.getElementById("info").style.display = "inherit";
    document.getElementById("p_auswahl").innerHTML = "Info";
    document.getElementById("p_auswahl").style.color = "red";
}

function info_ok_pressed() {
    document.getElementById("option").style.display = "inherit";
    document.getElementById("info").style.display = "none";
    document.getElementById("p_auswahl").innerHTML = "Auswahl";
    document.getElementById("p_auswahl").style.color = "white";
}

function set_current_location() {
    document.getElementById("start").value = "Hannover";
}

function set_destination() {
    document.getElementById("ziel").value = "Home";
}*/

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
	alert("Test")
		var username = document.getElementById("username").value
		var pass = document.getElementById("pass").value
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

$(document).ready(function() {
    	var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn');

    allWells.hide();

    var d = new Date();
    document.getElementById('date').value = d.getDate() + "." + d.getMonth()+1 + "." + d. getFullYear();

    navListItems.click(function(e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allNextBtn.click(function() {
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
            if (!curInputs[i].validity.valid) {
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });

    $('div.setup-panel div a.btn-primary').trigger('click');
});

$('#date').datepicker({
        monthNames: ['Januar','Februar','März','April','Mai','Juni',
        'Juli','August','September','Oktober','November','Dezember'],
        dayNames: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
        dayNamesShort: ['So','Mo','Di','Mi','Do','Fr','Sa'],
        dayNamesMin: ['So','Mo','Di','Mi','Do','Fr','Sa'],
      dateFormat:'dd.mm.yy'
    }
  );


$('#wrapper').dialog({
	height: 400,
    width: 350,
    modal: true,
    resizable: true,
    autoOpen: false,
    title: 'Info Dialog'
}).prev(".ui-dialog-titlebar").css("background","rgb(191, 227, 255)");

$('#opener').click(function() {
    $('#wrapper').dialog('open');
    return false;
});

$('#car_ordered_dialog').dialog({
	buttons: {
                OK: function() { //submit
                    $( this ).dialog( "close" );
					window.location.href = "infoPage.html";                }
            },
	height: 250,
    width: 400,
    modal: true,
    resizable: true,
    autoOpen: false,
    title: 'Car Ordered Dialog'
}).prev(".ui-dialog-titlebar").css("background","rgb(191, 227, 255)");

$('#car_ordered_opener').click(function() {
    $('#car_ordered_dialog').dialog('open');
    return false;
});

$('#time').wickedpicker({
	twentyFour: true,
	minutesInterval: 1
});
