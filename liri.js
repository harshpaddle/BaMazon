require("dotenv").config();

const axios = require("axios");

var Spotify = require('node-spotify-api');

const moment = require("moment")

const keys = require("./keys.js");

const command = process.argv[2];

var parameter = process.argv.slice(3).join("+");

var spotify = new Spotify(keys.spotify);

var fs = require("fs");

switch(command) {
  case "concert-this":
    bands(parameter);
    break;
  case "spotify-this-song":
    spotifyIt(parameter)
    break;
  case "movie-this":
    omdb(parameter);
    break;
  case "do-what-it-says":
    random();
    break;
  default:
    console.log("plz enter a valid command")
}

function bands(parameter) {
  queryUrl = "https://rest.bandsintown.com/artists/" + parameter + "/events?app_id=codingbootcamp";

  axios.get(queryUrl)
    .then(function(response){
      console.log(`Name of the venue: ${response.data[1].venue.name}`)
      console.log(`Venue Location: ${response.data[1].venue.country}`)
      console.log(`Date of the Event: ${moment(response.data[1].datetime).format('MM/DD/YYYY')}`)
  })
}


function spotifyIt(songName) {


  if (songName.length === 0) {
    songName = "The Sign";
    console.log("Title: The Sign");
    console.log("Artist: Ace of Base");
    console.log("Link: https://open.spotify.com/album/0nQFgMfnmWrcWDOQqIgJL7");
    return console.log("Album: Happy Nation");
    
  }

  spotify.search({
      type: 'track',
      query: songName
    })
    .then(function (response) {
      console.log("Title: " + response.tracks.items[0].name);
      console.log("Artist: " + response.tracks.items[0].artists[0].name);
      console.log("Link: " + response.tracks.items[0].external_urls.spotify);
      console.log("Album: " + response.tracks.items[0].album.name);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function omdb(movieName) {
  
  if (movieName.length === 0) {
    movieName = "Mr. Nobody"
  }

  var queryUrl = `https://www.omdbapi.com/?t=${movieName}&y=&plot=short&apikey=trilogy`

  axios.get(queryUrl)
    .then(function(response) {
      console.log("Title: " + response.data.Title);
      console.log("Year Released: " + response.data.Year);
      console.log("Imdb Rating: " + response.data.imdbRating)
      console.log("Rotten Tomatoes : " + response.data.Ratings[1].Value)
      console.log("Country : " + response.data.Country);
      console.log("Language : " + response.data.Language);
      console.log("Plot : " + response.data.Plot);
      console.log("Actors : " + response.data.Actors);
    })
}


function random() {
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    // console.log(data);

    var dataArr = data.split(",");
    // console.log(dataArr)
    var command = dataArr[0];
    var parameter = dataArr[1];


    switch (command) {
      case "concert-this":
        bands(parameter);
        break;
      case "spotify-this-song":
        spotifyIt(parameter)
        break;
      case "movie-this":
        omdb(parameter);
        break;
    };
  })
}






