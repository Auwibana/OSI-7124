var request = new XMLHttpRequest();
var waypoints = []

request.onreadystatechange = function() {
    //console.log("onreadystatechange: " + request.readyState + ", " + request.status);
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
                handlers[name]({
                    "_id": name
                });
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
    "auswahl": auswahl,
    "option": option
};

function auswahl(response) {
    var start = document.getElementById("start").value
    var end = document.getElementById("ziel").value
    var date = document.getElementById("date").value
    var time = document.getElementById("time").value
    document.getElementById('wartezeit').innerHTML = "Ankunft: " + date + " " + time
    put(response, {
        "start": start,
        "end": end,
        "date": date,
        "time": time
    });
}

function option(response) {
    var persons = document.getElementById("persons").value
    var passenger = document.getElementById("passenger").checked
    var zwischenstopsHtml = []
    var ul = document.getElementById('waypoints').getElementsByTagName('li')
    for (var i = 0; i < ul.length; i++) {
        zwischenstopsHtml.push(ul[i].innerHTML)
    }
    put(response, {
        "persons": persons,
        "passenger": passenger,
        "zwischenstopsHtml": zwischenstopsHtml,
        "zwischenstops":waypoints
    });
}

function addWaypoint(){
  waypoints.push(document.getElementById('zwischenstops').value)
}

$(document).ready(function() {
    createDB()
    var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn');
    allBackBtn = $('.backBtn')

    allWells.hide();

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

    allBackBtn.click(function() {
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a"),
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
    monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
        'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ],
    dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    dayNamesMin: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    dateFormat: 'dd.mm.yy'
});

$('#input-group-button').click(function() {
    var length = $('#list-group-id ul li').length;
    var isFormValid = true;

    var input = document.getElementById('zwischenstops').value;
    input = input.split(", ");

    var city = input[input.length - 2];
    var location = input[0];


    $("#zwischenstops").each(function() {
        if ($.trim($(this).val()).length == 0) {
            $(this).addClass("highlight");
            isFormValid = false;
        } else {
            $(this).removeClass("highlight");
        }
    });

    if (!isFormValid) $('#alert-empty-input').show();

    else {
        if (length == 0) {
            $("#list-group-id ul").append('<li class="list-group-item"data-toggle="collapse"data-target="#breakpoint"style="cursor: pointer;"><h4  class="list-group-item-heading">' + city + '<span class="badge pull-right" id="badge_breakpoint"></span></h4><p class="list-group-item-text">' + location + '</p></li>');
        } else if (length == 1) {
            $("#list-group-id ul").append('<div id="breakpoint" class="collapse"><li class="list-group-item"><h4 class="list-group-item-heading">' + city + '</h4><p class="list-group-item-text">' + location + '</p></li></div>');
        } else if (length < 4) {
            $("#breakpoint").append('<li class="list-group-item"><h4 class="list-group-item-heading">' + city + '</h4><p class="list-group-item-text">' + location + '</p></li>');
        } else {
            $('#alert-full-list').show();
        }

        var updated_length = $('#list-group-id ul li').length;

        if (updated_length > 1) {
            $('#badge_breakpoint').html($('#list-group-id ul li').length);
        }
    }
});

$('#time').datetimepicker({
    datepicker: false,
    format: 'H:i',
    step: 15
});

var d = new Date();
document.getElementById('date').value = d.getDate() + "." + d.getMonth() + 1 + "." + d.getFullYear();

function checkTime(i) {
    return (i < 10) ? "0" + i : i;
}
document.getElementById('time').value = checkTime(d.getHours()) + ":" + checkTime(d.getMinutes());


$('#wrapper').dialog({
    height: 400,
    width: 350,
    modal: true,
    resizable: true,
    autoOpen: false,
    title: 'Info Dialog'
}).prev(".ui-dialog-titlebar").css("background", "rgb(191, 227, 255)");

$('#opener').click(function() {
    $('#wrapper').dialog('open');
    return false;
});

$('#car_ordered_dialog').dialog({
    buttons: {
        OK: function() { //submit
            $(this).dialog("close");
            window.location.href = "infoPage.html";
        }
    },
    height: 250,
    width: 400,
    modal: true,
    resizable: true,
    autoOpen: false,
    title: 'Car Ordered Dialog'
}).prev(".ui-dialog-titlebar").css("background", "rgb(191, 227, 255)");

$('#car_ordered_opener').click(function() {
    $('#car_ordered_dialog').dialog('open');
    return false;
});

$('#next-button-step-1').click(function() {
    $('#step-button-1').removeClass('btn-circle-step').addClass('btn-circle');
});

$('#next-button-step-2').click(function() {
    $('#step-button-2').removeClass('btn-circle-step').addClass('btn-circle');
});

$('#next-button-step-3').click(function() {
    $('#step-button-3').removeClass('btn-circle-step').addClass('btn-circle');
});
