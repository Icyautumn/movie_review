function fetchComments() {
  var request = new XMLHttpRequest();

  request.open("GET", comment_url, true);

  //This command starts the calling of the comments api
  request.onload = function () {
    //get all the comments records into our comments array
    comment_array = JSON.parse(request.responseText);
    console.log(comment_array);
  };

  request.send();
}

//This function is to display all the comments of that movie
//whenever the user click on the "comment" button
function showMovieComments(element) {
  document.getElementById("emptyComment").innerHTML =
    "No review yet. Create one now";
  var item = element.getAttribute("item");
  currentIndex = item;
  document.getElementById("review").textContent =
    "Review for " + movie_array[item].title;
  document.getElementById("commentBody").textContent = "";

  for (var i = 0; i < comment_array.length; i++) {
    if (comment_array[i].movie === movie_array[item].title) {
      document.getElementById("emptyComment").innerHTML = "";
      selectedMovieId = movie_array[item]._id;
      star = "";
      var html =
        '<div class="text-center" style="width:100%;">                                                           \
                            <div class="card">                                                                                  \
                                <div class="card-body">                                                                         \
                                    <p class="card-text" id="rating' +
        i +
        '">' +
        comment_array[i].review +
        "</p>               \
                                    <small>by " +
        comment_array[i].username +
        " @ " +
        comment_array[i].datePosted +
        "</small>   \
                                </div>                                                                                          \
                            </div>                                                                                              \
                        </div>";
      document
        .getElementById("commentBody")
        .insertAdjacentHTML("beforeend", html);

      var star = "";
      for (var j = 0; j < comment_array[i].rating; j++) {
        console.log(i);
        star += "<img src='images/popcorn.png' style='width:50px' />";
      }
      star +=
        "<i class='far fa-trash-alt fa-2x edit' data-dismiss='modal' item='" +
        i +
        "' onClick='deleteComment(this)' ></i>";
      star +=
        "<i class='far fa-edit fa-2x edit' data-toggle='modal' data-target='#editCommentModal' data-dismiss='modal' item='" +
        i +
        "' onClick='editComment(this)' ></i>";
      document
        .getElementById("rating" + i)
        .insertAdjacentHTML("beforebegin", star + "<br/>");
    }
  }
}

function newComment() {
  // when user click on add comment, it makes the
  // intialize each HTML input elements in the model window with default value

  rating = 0;
  // user comments in new-comments-modal.html <textarea>
  document.getElementById("userComments").value = "";

  // nickname in new-comments-modal.html the popcorn images thingy
  document.getElementById("nickname").value = "";
}

// Submit or send the new comment to the server to be added.
function addComment() {
  // create new json object
  var comment = new Object();
  comment.movieId = movie_array[currentIndex]._id; // Movie ID is required by server to create new comment
  comment.movie = movie_array[currentIndex].title; // Movie title is required by server to create new comment
  comment.username = document.getElementById("nickname").value; // Value from HTML input text
  comment.review = document.getElementById("userComments").value; // Value from HTML input text
  comment.datePosted = null; // Change the datePosted to null instead of taking the timestamp on the client side;
  comment.rating = rating;

  var postComment = new XMLHttpRequest(); // new HttpRequest instance to send comment

  postComment.open("POST", comment_url, true); //Use the HTTP POST method to send data to server

  postComment.setRequestHeader("Content-Type", "application/json");
  postComment.onload = function () {
    console.log("new comment sent");
    fetchComments(); // fetch all comments again so that the web page can have updated comments.
  };
  // Convert the data in Comment object to JSON format before sending to the server.
  postComment.send(JSON.stringify(comment));
}

//This function allows the user to mouse hover the black and white popcorn
//so that it will turn to a colored version when hovered
function rateIt(element) {
  var num = element.getAttribute("value");
  var classname = element.getAttribute("class");
  var popcorns = document.getElementsByClassName(classname);
  var classTarget = "." + classname;

  // This is another way of writing 'for' loop, which initialises the
  // popcorn images to use black and white.
  for (let popcorn of popcorns) {
    popcorn.setAttribute("src", popcornBWImage);
  }
  changePopcornImage(num, classTarget);
}

// This function sets the rating and coloured images based on the value of the image tag when
// the mouse cursor hovers over the popcorn image.
function changePopcornImage(num, classTarget) {
  switch (eval(num)) {
    case 1:
      document
        .querySelector(classTarget + "[value='1']")
        .setAttribute("src", popcornImage);
      rating = 1;
      break;
    case 2:
      document
        .querySelector(classTarget + "[value='1']")
        .setAttribute("src", popcornImage);
      document
        .querySelector(classTarget + "[value='2']")
        .setAttribute("src", popcornImage);
      rating = 2;
      break;
    case 3:
      document
        .querySelector(classTarget + "[value='1']")
        .setAttribute("src", popcornImage);
      document
        .querySelector(classTarget + "[value='2']")
        .setAttribute("src", popcornImage);
      document
        .querySelector(classTarget + "[value='3']")
        .setAttribute("src", popcornImage);
      rating = 3;
      break;
    case 4:
      document
        .querySelector(classTarget + "[value='1']")
        .setAttribute("src", popcornImage);
      document
        .querySelector(classTarget + "[value='2']")
        .setAttribute("src", popcornImage);
      document
        .querySelector(classTarget + "[value='3']")
        .setAttribute("src", popcornImage);
      document
        .querySelector(classTarget + "[value='4']")
        .setAttribute("src", popcornImage);
      rating = 4;
      break;
    case 5:
      document
        .querySelector(classTarget + "[value='1']")
        .setAttribute("src", popcornImage);
      document
        .querySelector(classTarget + "[value='2']")
        .setAttribute("src", popcornImage);
      document
        .querySelector(classTarget + "[value='3']")
        .setAttribute("src", popcornImage);
      document
        .querySelector(classTarget + "[value='4']")
        .setAttribute("src", popcornImage);
      document
        .querySelector(classTarget + "[value='5']")
        .setAttribute("src", popcornImage);
      rating = 5;
      break;
  }
}

//This function will hide the existing modal and present a modal with the selected comment
//so that the user can attempt to change the username, rating or movie review
function editComment(element) {
  var item = element.getAttribute("item");

  currentIndex = item;

  // put the username into textfield
  document.getElementById("editnickname").value = comment_array[item].username;

  // put review into textfield
  document.getElementById("edituserComments").value =
    comment_array[item].review;
  console.log(comment_array[item].rating);
  displayColorPopcorn("editpop", comment_array[item].rating);
}

function displayColorPopcorn(classname, num) {
  var pop = document.getElementsByClassName(classname);
  var classTarget = "." + classname;
  for (let p of pop) {
    p.setAttribute("src", popcornBWImage);
  }
  changePopcornImage(num, classTarget);
}

//This function sends the Comment data to the server for updating
function updateComment() {
    // ask the user using a pop-up
  var response = confirm("Are you sure you want to update this comment?");

  // if the user press ok then run this
  if (response == true) {
      // set up route to match app.route('/comments/:id).put(commentController.updateComment)
    var edit_comment_url = comment_url + "/" + comment_array[currentIndex]._id;
    var updateComment = new XMLHttpRequest(); // new HttpRequest instance to send request to server

    updateComment.open("PUT", edit_comment_url, true); //The HTTP method called 'PUT' is used here as we are updating data
    updateComment.setRequestHeader("Content-Type", "application/json");
    comment_array[currentIndex].username = document.getElementById("editnickname").value;
    comment_array[currentIndex].review = document.getElementById("edituserComments").value;
    comment_array[currentIndex].rating = rating;
    updateComment.onload = function () {
      fetchComments();
    };

    // result return back the result from the web api
    updateComment.send(JSON.stringify(comment_array[currentIndex]));
  }
}



// this function deletes the selected comment in a specific movie

//This function deletes the selected comment in a specific movie
function deleteComment(element) {
    var response = confirm("Are you sure you want to delete this comment?");

    if (response == true) {
        var item = element.getAttribute("item"); //get the current item
        var delete_comment_url = comment_url + "/" + comment_array[item]._id;
        var eraseComment = new XMLHttpRequest();
        eraseComment.open("DELETE", delete_comment_url, true);
        eraseComment.onload = function() {
            fetchComments();
        };
        eraseComment.send();
    }
}
