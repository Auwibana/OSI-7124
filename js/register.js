$('#wrapper').dialog({
    height: 400,
    width: 350,
    modal: true,
    resizable: true,
    autoOpen: false,
    title: 'Info Dialog'
}).prev(".ui-dialog-titlebar").css("background", "rgb(191, 227, 255)");

$('#reg').click(function() {
    $('#wrapper').dialog('open');
    return false;
});
