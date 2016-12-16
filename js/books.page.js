$(document).ready(function () {

    // vis Bøger
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

});