"use strict";
const MovieDB = require('../models/moviesDB');

var moviesDB = new MovieDB();

function getAllMovies(request, respond){
    moviesDB.getAllMovies(function(error, result){
        if(error){
            respond.json(error);

        }
        else{
            respond.json(result);
        }

    });
}

module.exports = {getAllMovies};

   