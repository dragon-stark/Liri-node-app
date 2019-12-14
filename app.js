
// require("dotenv").config();
var fs = require("fs");
// var keys = require("./keys");
var request = require("request");
// var Spotify = require("node-spotify-api");
// var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");

// command line arguments
var action = process.argv[2];
var parameter = process.argv[3];


// node liri.js concert - this < artist / band name here >

// begin api function for concert-this
var bandsintown = function (artist)
{
  // var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  var queryURL = "https://rest.bandsintown.com/artists/jlo/events?app_id=codingbootcamp";

  // begin axios wrapper
  axios.get(queryURL).then(
    function (response)
    {
      var jsonData = response.data;

      if (!jsonData.length) {
        console.log("Sorry no information available for " + artist);
        return;
      }
      console.log("appearences for " + artist + " near you:");
      for (var i = 0; i < jsonData.length; i++) {
        var band = jsonData[i];

        console.log(
          band.venue.city +
          "," + (band.venue.region || band.venue.country) + " at " + band.venue.name + " " + moment(band.datetime).format("MM/DD/YYYY")
        )
      }
    }
  )
}

var select = function (caseData, functionData)
{
  switch (caseData) {
    case "concert-this": bandsintown(functionData);
      break;
    default: console.log("Error")
  }
};

var execute = function (action, parameter)
{
  select(action, parameter)
};

execute(process.argv[2], process.argv.slice(3).join(" "));

//   This will search the Bands in Town Artist bands API("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")