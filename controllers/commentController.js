"use strict";
const CommentsDB = require('../models/CommentsDB');
const Comment = require('../models/Comment');

var commentsDB = new CommentsDB();

function getAllComments(request, respond){
        commentsDB.getAllComments(function(error, result){
        if(error){
            respond.json(error);

        }
        else{
            respond.json(result);
        }

    });
}

function addComment(request, respond) {
    var now = new Date();
    var comment = new Comment(null, request.body.movieId, request.body.movie, request.body.review, 
        request.body.username, request.body.rating, now.toString());
    commentsDB.addComment(comment, function (error, result) {
        if(error) {
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    })
}

function updateComment(request, respond){
    var now = new Date();
    var comment = new Comment(parseInt(request.params.id), request.body.movieId,
    request.body.movie, request.body.review, request.body.username, request.body.rating, now.toString());
    commentsDB.updateComment(comment, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    })
}

function deleteComment(request, respond){
    var commentID = request.params.id;
    commentsDB.deleteComment(commentID, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

module.exports = {getAllComments, addComment, updateComment, deleteComment};

   