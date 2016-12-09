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

  //Fires on page-load
  SDK.User.getAll(function (err, data) {
    if (err) throw err;

    var $usersTableBody = $("#usersTableBody");
    data.forEach(function (users) {

      $usersTableBody.append(
        "<tr>" +
        "<td>" + users.userId + "</td>" +
        "<td>" + users.username + "</td>" +
        "<td>" + users.email + "</td>" +
        "<td>" + users.phonenumber + "</td>" +
        "<td><button class='deleteUserButton' data-userId=" + users.userId +">Slet</Button></td>" +
        "</tr>");
    });

    $(".deleteUserButton").on("click", function(){

      var $deleteUser = $(this);

      var userId = {
        id : $deleteUser.data("userid")
      };

      SDK.User.delete(userId, function (err) {
        if (err) throw JSON.stringify(err);
        location.reload();

      })

    });
  });

  //var currentUser = SDK.User.current();
  //$("#currentUserName").text(currentUser.firstName +  " " + currentUser.lastName);

  /**
   * Add a new Book
   */
  $("#createBookButton").on("click", function () {
    $("#newBookModal").css("display","block");



      var $isbn = parseInt($("#InputBookisbn").val())

      var $title = $("#inputBooktitle").val()

      var $edition = $("#inputBookedition").val()

      var $author = ($("#inputBookauthor").val())


      //Create JSON object
      var Book = {

        title: $title,
        isbn: $isbn,
        edition: $edition,
        author: $author,

      };
//Create Book
      SDK.Book.create(Book, function (err, data) {
        if (err) throw err;

        window.alert("Bog oprettet");

        window.location.href = "admin.html";
      });
    });

  });







