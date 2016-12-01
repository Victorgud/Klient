
$(document).ready(function () {

    $("#createUserButton").on("click", function () {



        var $username = $("#inputUsername").val()

            var $password = $("#inputPassword").val()

            var $email = $("#inputEmail").val()

            var $phonenumber = parseInt($("#inputPhonenumber").val())

            var $address = $("#inputAddress").val()


        var mobilepayIsChosen = 0;
        if ($("input[name=mobilepay]:checked").val()) {
            mobilepayIsChosen = 1;

        }

        var cashIsChosen = 0;
        if ($("input[name=cash]:checked").val()) {
            cashIsChosen = 1;
        }

        var transferIsChosen = 0;
        if ($("input[name=transfer]:checked").val()) {
            transferIsChosen = 1;
        }



        //Create JSON object
        var user = {
            // username: $("#inputUsername").val(),
            // password: $("#inputPassword").val(),
            // email: $("#inputEmail").val(),
            // phonenumber: parseInt($("#inputPhonenumber").val()),
            // address: $("#inputAddress").val(),
            username: $username,
            password: $password,
            phonenumber: $phonenumber,
            address: $address,
            email: $email,
            mobilepay: mobilepayIsChosen,
            cash: cashIsChosen,
            transfer: transferIsChosen
        };


//Create user
        SDK.User.create(user, function (err) {
            if (err) throw err;

            window.alert("Du er nu oprettet");

            window.location.href = "index.html";
        });
    });

});
