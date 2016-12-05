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

        $(".deleteBookButton").on("click", function(){

            var $button = $(this);

            var postRequest = {
                isbn:$button.data("bookid")
            };

            console.log(postRequest);

        });

    });

    SDK.allAds.getAll(function (err, data) {
        if (err) throw err;

        var $addsTableBody = $("#addsTableBody");
        data.forEach(function (add, i) {

            $addsTableBody.append(
                "<tr>" +
                "<td>" + add.isbn + "</td>" +
                "<td>" + add.price + "</td>" +
                "<td>" + add.rating + "</td>" +
                "<td>" + add.comment + "</td>" +
                "</tr>");
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
