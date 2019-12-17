var fs = require("fs");
var keys = require("./keys");
var request = require("request");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var command = process.argv[2];
var input = process.argv.slice(3).join(" ");

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
// start movie-this OMDB
function movie (parameter)
{
  var movieName;
  if (parameter === undefined) {
    movieName = "Mr. Nobody";
  } else {
    movieName = parameter;
  }
  var url = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

  axios.get(url).then(function (response)
  {
    var data = response.data;

    console.log("Title: " + data.Title);
    console.log("Year: " + data.Year);
    console.log("Rated: " + data.Rated);
    console.log("IMDB Rating: " + data.imdbRating);
    console.log("Country: " + data.Country);
    console.log("Language: " + data.Language);
    console.log("Plot: " + data.Plot);
    console.log("Actors: " + data.Actors);
    console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
  })
}
// function for running command based on text file (random.txt)
function DoWhatItSays ()
{
  fs.readFile("random.txt", "utf8", function (error, data)
  {
    console.log(data);

    var dataArray = data.split(",");

    if (dataArray.length === 2) {
      pick(dataArray[0], dataArray[1]);
    } else if (dataArray.length === 1) {
      pick(dataArray[0]);
    }
  });
};

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
    case "do-what-it-says": DoWhatItSays();
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
