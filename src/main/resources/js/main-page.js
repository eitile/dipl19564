$(document).ready(function(){

    var storeNumber;

    $.ajax({
        url: "/user/exists",
        type: "GET"
    }).then(function(data) {
        var user = $.parseJSON(data);
        $("#login").text(user.login);
        $("#store-number").text(user.storeNumber);
        if(user.role == 2) {
            $("#admin-only-user").text("User");
            $("#admin-only-stock").text("Stock");
        }
        $.ajax({
            url: "/product/store/" + user.storeNumber,
            type: "GET"
        }).then(function(data) {
            var products = $.parseJSON(data);
            _.forEach(products, function(product) {
                var stockName = product.stockName;
                if(stockName === null) {
                    stockName = "";
                }
                var stockPrice = product.stockPrice;
                if(stockPrice === null) {
                    stockPrice = "";
                }
                $("#products-table").append("<tr> <th scope='row'>" + product.productId + "</th> <td id='name'>"
                    + product.productName + "</td> <td id='descr'>" + product.productDescription + "</td> <td>" + product.currentPrice + "</td>" +
                    "<td>" + stockName + "</td><td>" + stockPrice + "</td>"+
                    "<td><button type='button' class='btn btn-info' style='width: 140px;' onclick='addPriceTag(" + product.productId + ")'>Add price tag</button></br>" +
                    "<button type='button' class='btn btn-warning' style='width:70px;'>Update</button>" +
                    "<button type='button' class='btn btn-danger' style='width:70px;' onclick='deletePriceTag(" + product.productId + ")'>Delete</button></br>" +
                    "<button type='button' class='btn btn-primary' style='width: 140px;'>Add to stock</button></td> " +
                    "</tr>")
            });
        });
    }).fail(function(data) {
        $.redirect('/', {}, 'GET');
    });



    $("#logout").click(function() {
        $.ajax({
            url: "/user/logout",
            type: "GET"
        }).then(function(data) {
            $.redirect('/', null, 'GET');
        })
    });

    $("#add-product").click(function() {
        $.redirect('/change-product.html', {}, 'GET');
    });

});

function filter() {
    var filter = $("#search-by-name").val().toUpperCase();
    var secondFilter = $("#search-by-descr").val().toUpperCase();
    var tr = $("#products tr");

    for (var i = 1; i < tr.length; i++) {
        var name = tr[i].getElementsByTagName("td")['name'];
        var descr = tr[i].getElementsByTagName("td")['descr'];
        if (name || descr) {
            if (name.innerHTML.toUpperCase().indexOf(filter) > -1 && descr.innerHTML.toUpperCase().indexOf(secondFilter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function createPriceTagsForAll() {
    var tr = $("#products tr");
    var products = [];
    for (var i = 1; i < tr.length; i++) {
        if(tr[i].style.display == "none") continue;
        var params = tr[i].getElementsByTagName("td");
        var price;
        if(params[3].innerText) {
            price = params[4].innerText;
        } else {
            price = params[2].innerText;
        }
        var priceTag = {
            productId: tr[i].getElementsByTagName("th")[0].innerText,
            storeId: $("#store-number").text(),
            price: price,
            stockName: params[3].innerText,
            designId: 1
        };
        $.ajax({
            url: "/pricetag",
            type: "POST",
            data: JSON.stringify(priceTag),
            dataType: "json"
        });
    }
}

function addPriceTag(id) {
    var tr = $("#products tr");
    var products = [];
    var params = tr[id].getElementsByTagName("td");
    var price;
    if(params[3].innerText) {
        price = params[4].innerText;
    } else {
        price = params[2].innerText;
    }
    var priceTag = {
        productId: tr[id].getElementsByTagName("th")[0].innerText,
        storeId: $("#store-number").text(),
        price: price,
        stockName: params[3].innerText,
        designId: 1
    };
    $.ajax({
        url: "/pricetag",
        type: "POST",
        data: JSON.stringify(priceTag),
        dataType: "json"
    });
}

function deletePriceTag(id) {
    $.ajax({
        url: "/product/store/" + $("#store-number").text() + "/product/" + id,
        type: "POST"
    }).then(function() {
        location.reload();
    });
}