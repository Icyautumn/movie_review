var express = require("express"); //using the express framework

var movieController = require('./controllers/movieController'); // set movieController to the movieController class
var commentController = require('./controllers/commentController'); // set movieController to the movieController class

var app = express(); // set variable app to be an instance of express framwork. From now on, app is the express

app.use(express.static("./public")); //static files are to be served from the public folder - for eg. html, images
app.use(express.json()); // json() is a method inbuilt in express to recognize the incoming request Object from the 
// in time to come we will need to accept new or edited comments from user

app.route('/movies').get(movieController.getAllMovies); // activate the getAllMovies method if the route is GET(method)
app.route('/comments').get(commentController.getAllComments); // activate the getAllMovies method if the route is GET(method)
app.route('/comments').post(commentController.addComment); // activate the addComment method if the route is post(method)
app.route('/comments/:id').put(commentController.updateComment); // activate the updateComment if the route is put(method)
app.route('/comments/:id').delete(commentController.deleteComment); // activate the deleteComment if the route is delete(method)


app.listen(8080, "127.0.0.1"); // start the nodejs to be listening for incoming request @ port 8080
console.log("web server running @ http://127.0.0.1:8080"); // output to console