"use Strict";

class Comment {
    constructor(id, movieId, movie, review, username, rating, datePosted) {
        this.id= id;
        this.movie = movie;
        this.review = review;
        this.username = username;
        this.rating = rating;
        this.datePosted = datePosted;
    }
    getId() {
        return this.id;
    }
    getMovieId() {
        return this.movieId;

    }
    getMovie(){
        return this.movie;

    }
    getReview() {
        return this.review;
    }
    getUsername() {
        return this.username;

    }
    getRating() {
        return this.rating;
    }
    getDatePosted() {
        return this.datePosted;
    }

    setMovieId(movieId) {
        this.movieId = movieId;
    }
    setReview(movie) {
        this.movie = movie;
    }
    setUsername(username) {
        this.username = username;
    }
    setRating(rating) {
        this.rating = rating;
    }
    setDatePosted(datePosted) {
        this.datePosted = datePosted;
    }
}

//This function is to display all the comments of that movie
//whenever the user click on the "comment" button
function showMovieComments(element) {
    document.getElementById("emptyComment").innerHTML = "No review yet. Create one now";
    var item = element.getAttribute("item");
    currentIndex = item;
    document.getElementById("review").textContent = "Review for " + movie_array[item].title;
    document.getElementById("commentBody").textContent = "";

    for (var i = 0; i < comment_array.length; i++) {
        if (comment_array[i].movie=== movie_array[item].title) {
            document.getElementById("emptyComment").innerHTML = "";
            selectedMovieId = movie_array[item]._id;
            star = "";
            var html = '<div class="text-center" style="width:100%;">                                                           \
                            <div class="card">                                                                                  \
                                <div class="card-body">                                                                         \
                                    <p class="card-text" id="rating' + i + '">' + comment_array[i].review + "</p>               \
                                    <small>by " + comment_array[i].username + " @ " + comment_array[i].datePosted + "</small>   \
                                </div>                                                                                          \
                            </div>                                                                                              \
                        </div>";
            document.getElementById("commentBody").insertAdjacentHTML('beforeend', html);

            var star = "";
            for (var j = 0; j < comment_array[i].rating; j++) {
                console.log(i);
                star += "<img src='images/popcorn.png' style='width:50px' />";
            }
            star += "<i class='far fa-trash-alt fa-2x edit' data-dismiss='modal' item='" + i + "' onClick='deleteComment(this)' ></i>";
            star += "<i class='far fa-edit fa-2x edit' data-toggle='modal' data-target='#editCommentModal' data-dismiss='modal' item='" + i + "' onClick='editComment(this)' ></i>";
            document.getElementById("rating" + i).insertAdjacentHTML('beforebegin', star + "<br/>");
        }
    }
}




module.exports = Comment;