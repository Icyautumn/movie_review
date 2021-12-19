"use strict";

var db = require('../db-connections');
class MovieDB{
    getAllMovies(callback){
        var sql = "SELECT * FROM  movie_review.movie";
        db.query(sql, callback);

    }
}

module.exports = MovieDB;