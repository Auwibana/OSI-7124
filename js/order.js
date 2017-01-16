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

$(document).ready(function() {
    var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn');

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

    var date = $('#date').datepicker({
        dateFormat: 'dd.mm.yy'
    }).val();

    $('div.setup-panel div a.btn-primary').trigger('click');
});
