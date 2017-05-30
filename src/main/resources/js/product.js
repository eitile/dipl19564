$(document).ready(function(){

    var storeNumber;
    var productId;

    $.ajax({
        url: "/user/exists",
        type: "GET"
    }).then(function(data) {
        var user = $.parseJSON(data);
        $("#login").text(user.login);
        $("#store-number").text(user.storeNumber);
        storeNumber = user.storeNumber;
        if(user.role == 2) {
            $("#admin-only-user").text("User");
            $("#admin-only-stock").text("Stock");
        }
    }).fail(function(data) {
        $.redirect('/', {}, 'GET');
    });

    $("#singlebutton").click(function(){

        var productProperties = {
            "name": $("#name").val(),
            "description": $("#description").val(),
            "id": productId
        };

        $.ajax({
            url: "/store/" + storeNumber + "/price/" + $("#price").val(),
            type: "POST",
            data: JSON.stringify(productProperties),
            dataType: "json"
        }).then(function() {
            $.redirect('/menu.html', {}, 'GET');
        });
    });

});