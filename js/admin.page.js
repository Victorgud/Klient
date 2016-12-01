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
        "<td>" +  "</td>" +
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
        "<td>" + users.password + "</td>" +
        "<td>" + users.email + "</td>" +
        "<td>" + users.phonenumber + "</td>" +
        "<td>" + users.address+ "</td>" +
        "<td>" + users.mobilepay + "</td>" +
        "<td>" + users.cash + "</td>" +
        "<td>" + users.transfer + "</td>" +
        "</tr>");
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




  /**
   * Add a new User
   */
  $("#addNewUserButton").on("click", function () {

  });

  $("#logOutLink").on("click", function(){
    SDK.logOut();
    window.location.href = "index.html";
  });



