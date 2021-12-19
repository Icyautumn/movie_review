//This function is to call the movies api and get all the movies
//that is showing in Shaw Theatres for Showing Now and Coming Soon
function getMovieData() {
  var request = new XMLHttpRequest();
  request.open("GET", movie_url, true);
  //This function will be called when data returns from the web api
  request.onload = function () {
    //get all the movies records into our movie array
    movie_array = JSON.parse(request.responseText);
    //Fetch the comments as well
    fetchComments();
    console.log(movie_array); // output to console
    //call the function so as to display all movies tiles for "Now Showing"        	
    displayMovies(category);
  };

  //This command starts the calling of the movies web api
  request.send();
}

function displayMovies(category) {
  var table = document.getElementById("moviesTable");
  var movieCount = 0;
  var message = "";

  table.innerHTML = "";
  totalMovies = movie_array.length;
  for (var count = 0; count < totalMovies; count++) {
      // check if the movie is "now showing"
    if (movie_array[count].availability == category) {
      var thumbnail = movie_array[count].thumb;
      var title = movie_array[count].title;
      var cell =
        '<div class="card col-md-3" ><img class="card-img-top" src="' +
        thumbnail +
        '" alt="Card image cap">\
                        <div class="card-body"><i class="far fa-comment fa-lg" style="float:left;cursor:pointer" data-toggle="modal" data-target="#commentModal" item="' +
        count +
        '" onClick="showMovieComments(this)"></i>\
                        <h5 style="padding-left:30px;cursor:pointer" data-toggle="modal" data-target="#movieModal" class="card-title" item="' +
        count +
        '" onClick="showMovieDetails(this)">' +
        title +
        "</h5></div>\
</div>";
      table.insertAdjacentHTML("beforeend", cell);
      movieCount++;
    }
  }
  // count is the number of movies
  // category is the movies "now showing"
  message = movieCount + "Movies " + category;
  // update the html content of the div = summary in index.html
  document.getElementById("summary").textContent = message;
  // take out the initial message for id="parent"
  document.getElementById("parent").textContent = "";

}

//This function is to display the "Now Showing" movies (located in top-navigation)
function listNowShowingMovies() {
    category = "Now Showing";
    displayMovies(category);
    document.getElementById("nowMenu").classList.add("active"); // make the now showing shine bright white
    document.getElementById("comingMenu").classList.remove("active");
    document.getElementById("aboutMenu").classList.remove("active");
}

//This function is to display the "Coming Soon" movies (located in top-navigation)
function listComingMovies() {
    category = "Coming Soon";
    displayMovies(category);
    document.getElementById("nowMenu").classList.remove("active");
    document.getElementById("comingMenu").classList.add("active"); // make the coming soon bright white
    document.getElementById("aboutMenu").classList.remove("active");
}


//This function is to display the individual movies details
//whenever the user clicks on "See More"
// element is the h5 document of the what the user click 
function showMovieDetails(element) {
    var item = element.getAttribute("item");

    // set the current index to the position of where it is in the browser
    currentIndex = item;
    document.getElementById("movieTitle").textContent = movie_array[item].title;
    document.getElementById("moviePoster").src = movie_array[item].poster;
    document.getElementById("genre").textContent = movie_array[item].genre;
    document.getElementById("director").textContent = movie_array[item].director;
    document.getElementById("cast").textContent = movie_array[item].cast;
    document.getElementById("release").textContent = movie_array[item].release;
    document.getElementById("advice").textContent = movie_array[item].advice;
    document.getElementById("story").textContent = movie_array[item].story;
    document.getElementById("trailer1").src = movie_array[item].video1;
    document.getElementById("trailer2").src = movie_array[item].video2;
}

//This function opens a new window/tab and loads the
//particular movie in the cinema website
function buyTicket() {
    window.open(movie_array[currentIndex].buy, "_blank");
}
