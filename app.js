
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys");
var request = require("request");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
// command line arguments
var action = process.argv[2];
var parameter = process.argv[3];

function Search (concert, song, movie, action)
// node liri.js concert - this < artist / band name here >

//   This will search the Bands in Town Artist Events API("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")