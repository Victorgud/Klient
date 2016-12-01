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

    });