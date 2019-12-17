var fs = require("fs");
var keys = require("./keys");
var request = require("request");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var command = process.argv[2];
var input = process.argv.slice(3).join(" ");
// node liri.js concert - this < input / band name here >

// begin api function for concert-this

var bandsintown = function (band)
{
  axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(function (response)
  {
    var data = response.data;
    for (var i = 0; i < data.length; i++) {

      if (!data.length) {
        console.log("Sorry, nothing found for " + input);
        return;
      }
      console.log("appearences for " + input + " near you:");
      for (var i = 0; i < data.length; i++) {
        var band = data[i];

        console.log(`
         Venue: ${data[i].venue.name}
         Location: ${data[i].venue.city} ${data[i].venue.region}
         Date: ${moment(data[i].datetime).format("MM/DD/YYYY")}`
        )
      }
    }
  }
  )
}
// end bandsintown

function getArtist (artist)
{
  return artist.name;
};

function findSong (song)
{
  if (song === undefined) {
    song = "The Sign"
  }

  // beginning of API call

  {
    spotify.search({
      type: "track",
      query: song
    },
      function (err, data)
      {
        if (err) {
          console.log("Error Occurred: " + err)
        }

        var music = data.tracks.items;
        for (var i = 0; i < music.length; i++) {
          console.log(i);
          console.log("artist(s): " + music[i].artists.map(getArtist));
          console.log("song name: " + music[i].name);
          console.log("preview song: " + music[i].preview_url);
          console.log("album: " + music[i].album.name);
          console.log("-----------------------------------");
        }
      }
    );
  };
}
// end spotify


// switch statement (if/else) or conditional statement
var select = function (caseData, functionData)
{
  switch (caseData) {
    case "concert-this": bandsintown(functionData);
      break;
    case "spotify-this": findSong(functionData);
      break;
    case "movie-this": movie(functionData);
      break;

    // enter next case data here . (case, command and then the break)
    default: console.log("Error")
  }
};
var execute = function (action, parameter)
{
  select(action, parameter)
};

execute(process.argv[2], process.argv.slice(3).join(" "))
  ;
