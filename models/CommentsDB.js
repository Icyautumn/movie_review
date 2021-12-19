"use strict";

var db = require('../db-connections');
class CommentsDB{
    getAllComments(callback){
        // gets all the comments back
        var sql = "SELECT * FROM  movie_review.comment";
        db.query(sql, callback);

    }


    addComment(comment,callback){
        // the questions marks are the placeholders for the values
        var sql = "INSERT INTO comment (movieId, movie, review, username, rating, datePosted) VALUES (?, ?, ?, ?, ?, ?)"; 
        db.query(sql, [comment.getMovieId(), comment.getMovie().trim(), comment.getReview(), comment.getUsername(),
            comment.getRating(), comment.getDatePosted()], callback);
    }

    updateComment(comment, callback){
        var sql = "UPDATE comment SET review = ?, username = ?, rating = ?, datePosted = ? WHERE _id = ?";
        return db.query(sql, [comment.getReview(), comment.getUsername(), comment.getRating(), comment.getDatePosted(), 
            comment.getId()], callback);
        }

    deleteComment(commentID, callback){
        var sql = "DELETE FROM comment WHERE _id = ?";
        return db.query(sql, [commentID], callback)
    }
}

module.exports = CommentsDB;