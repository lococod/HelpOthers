var serverURL = "http://localhost:8080/api/";
var messagelist = [];

function Item(code, desc, price, image, category, stock, deliveryDays) {
    this.code = code;
    this.description = desc;
    this.price = price;
    this.image = image;
    this.category = category;
    this.stock = stock;
    this.deliveryDays = deliveryDays;
    this.user = "Gill";
}

function clearForm() {
    $("#txtCode").val("");
    $("#txtDescription").val("");
    $("#txtPrice").val("")
    $("#txtImage").val("");
    $("#txtCategory").val("");
    $("#txtStock").val("");
    $("#txtDelivery").val("");
}

function saveItem() {
    //get the values
    var code = $("#txtCode").val();
    var description = $("#txtDescription").val();
    var price = $("#txtPrice").val()
    var image = $("#txtImage").val();
    var category = $("#txtCategory").val();
    var stock = $("#txtStock").val();
    var delivery = $("#txtDelivery").val();

    var theItem = new Item(code, description, price, image, category, stock, delivery);
    var jsonString = JSON.stringify(theItem);


    $.ajax({
        url: serverURL + "items",
        type: "POST",
        data: jsonString,
        contentType: "application/json",
        success: function (response) {
            console.log("Yay, it works!", response);
            clearForm();
            //set alert
            $("#alertSuccess").removeClass("hidden");

            //set timeout (fn,miliseconds);
            setTimeout(function () {
                $("#alertSuccess").addClass("hidden")
            }, 3000);

        },
        error: function (errorDetails) {
            console.log("Error: ", errorDetails);
        }
    });

}
// create an object

function retrieveMessages() {
    //get messages from server
    $.ajax({
        url: serverURL + "message",
        type: "GET",
        success: function (response) {
            console.log("response: ", response);
            for (var i = 0; i < response.length; i++) {
                var item = response[i];

                if (item.user == "Gill") {
                    messagelist.push(item);
                }

            }

            drawMessages();

        },
        error: function (errorDetails) {
            console.log("Error: ", errorDetails);
        }
    });

}

function drawMessages() {
    console.log(messagelist);
    var container = $("#messages");
    for (var i = 0; i < messagelist.length; i++) {
        var c = messagelist[i];
        var li = `<li class="list-group-item">${c.messages}</li>`;
        console.log(li);
        container.append(li);
    }
}


// send the object to the server


function testAjax() {

    //Async
    //Javascript
    //And
    //XML com JSON

    $.ajax({
        url: serverURL + "test", //"test2" if you want to test error
        type: 'GET',
        success: function (res) {
            console.log("Payment finished");
            console.log("Server says", res);
        },
        error: function (err) {
            console.log("Payment error");
            console.log("Error ocurred", err);
        }
    });
    console.log("Order complete, payment accepted");
    console.log("NOT FINISHED YET");
}

function init() {
    console.log("This is Admin page!!");

    //retrief initial data


    retrieveMessages();

    //hook events
    $("#btnSave").click(saveItem);

}

window.onload = init;