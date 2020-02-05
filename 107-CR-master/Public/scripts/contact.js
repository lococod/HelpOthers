var serverURL = "http://localhost:8080/api/";

function Messages(name, messages) {
    this.name=name;    
    this.messages = messages;
    this.user = "Gill";
}

function clearForm() {
    $("#txtname").val("");
    $("#txtmessages").val("");
}

function saveMessages() {
    //get the values
    var name = $("#txtName").val();
    var messages = $("#txtDescription").val();

    var theMessages = new Messages(name, messages);
    var jsonString = JSON.stringify(theMessages);


    $.ajax({
        url: serverURL + "message",
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



/* $.ajax({
    url: serverURL + "items",
    type: "GET",
    success: function (response) {
        console.log("response: ", response);
        for (var i = 0; i < response.length; i++) {
            var item = response[i];

            if (item.user == "Gill") {
                items.push(item);
            }
        }

        displayCatalog();

    },
    error: function (errorDetails) {
        console.log("Error: ", errorDetails);
    }
}); */
// create an object


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

    //hook events
    $("#btnSave").click(saveMessages);

}

window.onload = init;