$(document).ready(function(){

    $.ajax({
        url: "/user/exists",
        type: "GET"
    }).then(function(data) {
        var user = $.parseJSON(data);
        if(user) {
            $.redirect('/menu.html', null, 'GET');
        }
    });

    $("#login-button").click(function(){

        var loginProperties = {
            "login": $("#lg_username").val(),
            "password": $("#lg_password").val()
        };

        $.ajax({
            url: "/user/login",
            type: "POST",
            data: JSON.stringify(loginProperties),
            dataType: "json"
        }).then(function(data) {
            $.redirect('/menu.html', {}, 'GET');
        }).fail(function(data) {
            $("#main").append(
            "<div class=\"alert alert-danger alert-dismissable fade in\" style='width: 410px; margin: 0 auto'>" +
                "<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>" +
            "<strong>Danger!</strong>" + data.responseJSON.message + "</div>"
            );
        });
    });

});