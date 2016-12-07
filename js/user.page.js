/**
 * Created by victorgudmandsen on 01/12/2016.
 */
/**
 * Created by victorgudmandsen on 29/11/2016.
 */
$(document).ready(function () {

    //Fires on page-load
    SDK.Book.getAll(function (err, data) {
        if (err) throw err;


        var $booksTableBody = $("#booksTableBody");
        data.forEach(function (book, i) {

            $booksTableBody.append(
                "<tr>" +
                "<td>" + book.title + "</td>" +
                "<td>" + book.edition + "</td>" +
                "<td>" + book.author + "</td>" +
                "<td>" + book.isbn + "</td>" +
                "</tr>");
        });

        $(".deleteBookButton").on("click", function () {

            var $button = $(this);

            var postRequest = {
                isbn: $button.data("bookid")
            };

            console.log(postRequest);

        });

    });

    SDK.allAds.getAll(function (err, data) {
        if (err) throw err;

        var $addsTableBody = $("#addsTableBody");
        data.forEach(function (ad, i) {

            $addsTableBody.append(
                "<tr>" +
                "<td>" + ad.isbn + "</td>" +
                "<td>" + ad.price + "</td>" +
                "<td>" + ad.rating + "</td>" +
                "<td><button class='reserveAdButton' data-adId=" + ad.adId + ">Reserver</Button></td>" +
                "</tr>");
        });

        $(".reserveAdButton").on("click", function () {

            var $reserveAd = $(this);

            var adId = {
                id: $reserveAd.data("adid")
            };


            SDK.allAds.reserve(adId, function (err) {
                if (err) throw JSON.stringify(err);
                location.reload();
            });
        });
    });


    $("#AdNewButton").on("click", function () {


        $("#newAdModal").css("display", "block");

        var $isbn = parseInt($("#inputAdisbn").val())

        var $price = parseInt($("#inputAdprice").val())

        var $rating = parseInt($("#inputAdrating").val())

        var $comment = ($("#inputAdcomment").val())


        //Create JSON object
        var Ad = {

            isbn: $isbn,
            price: $price,
            rating: $rating,
            comment: $comment,

        };
//Create AD
        SDK.allAds.create(Ad, function (err) {
            if (err) throw err;

            window.alert("Annonce oprettet");

            window.location.href = "user.html";
        });
    });

});

$("#updateUserButton").on("click", function () {


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
    SDK.User.update(user, function (err) {
        if (err) throw err;

        window.alert("Ændringerne er gemt");

        window.location.href = "user.html";
    });
});


SDK.allAds.myads(function (err, data) {
    if (err) throw err;

    var $myadsTableBody = $("#myadsTableBody");
    data.forEach(function (ad, i) {

        $myadsTableBody.append(
            "<tr>" +
            "<td>" + ad.isbn + "</td>" +
            "<td>" + ad.price + "</td>" +
            "<td>" + ad.rating + "</td>" +
            "<td>" + ad.comment + "</td>" +
            "<td><button class='reserveAdButton' data-adId=" + ad.adId + ">Reserver</Button></td>" +
            "<td><button class='unlockAdButton' data-adId=" + ad.adId + ">Frigiv</Button></td>" +
            "</tr>");
    });

    $(".reserveAdButton").on("click", function () {

        var $reserveAd = $(this);

        var adId = {
            id: $reserveAd.data("adid")
        };


        SDK.allAds.myads(adId, function (err) {
            if (err) throw JSON.stringify(err);
            location.reload();
        });
    });


$(".unlockAdButton").on("click", function () {

    var $unlockAd = $(this);

    var adId = {
        id: $unlockAd.data("adid")
    };


    SDK.allAds.unlockreservation(adId, function (err) {
        if (err) throw JSON.stringify(err);
        location.reload();
    });
});
});


SDK.allAds.myreservations(function (err, data) {
    if (err) throw err;

    var $myReservationsTableBody = $("#myReservationsTableBody");
    data.forEach(function (ad, i) {

        $myReservationsTableBody.append(
            "<tr>" +
            "<td>" + ad.adId + "</td>" +
            "<td>" + ad.timestamp + "</td>" +
            "<td>" + ad.bookIsbn + "</td>" +
            "<td>" + ad.userUsername + "</td>" +
            "<td>" + ad.userPhonenumber + "</td>" +
            "<td><button class='deleteReservationAdButton' data-adId=" + ad.adId + ">Slet reservation</Button></td>" +
            "</tr>");
    });

    $(".deleteReservationAdButton").on("click", function () {

        var $deleteReservation = $(this);

        var adId = {
            id: $deleteReservation.data("adid")
        };


        SDK.allAds.deletereservation(adId, function (err, data) {
            if (err) throw JSON.stringify(err);
            location.reload();
        });
    });
});


