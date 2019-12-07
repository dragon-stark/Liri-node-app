
// require("dotenv").config;
var fs = require("fs");
var keys = require("./key");
var request = require("request");
var Spotify = require("node-spotify-api");
// var spotify = new Spotify(keys.spotify);

// command line arguments
var action = process.argv[2];
var parameter = process.argv[3];
