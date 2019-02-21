require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var moment = require("moment");

var artist = '';
var movie = '';
var song = '';

var spotify = new Spotify(keys.spotify);

var concert = function (data) {
    var concertThis = "https://rest.bandsintown.com/artists/" + data + "/events?app_id=codingbootcamp"
    axios
        .get(concertThis)
        .then(function (response) {
            console.log("-----------------------------------------")
            console.log(response.data[0].venue.name);
            console.log(response.data[0].venue.city + ", " + response.data[0].venue.country);
            console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"));
            console.log("-----------------------------------------")
        });
};

var userSong = function (data) {
    if (!data) {
        data = "the sign ace of base";
    }
    spotify
        .search({ type: "track", query: data })
        .then(function (response) {
            console.log("-----------------------------------------")
            console.log(response.tracks.items[0].artists[0].name);
            console.log(response.tracks.items[0].name);
            console.log(response.tracks.items[0].preview_url);
            console.log(response.tracks.items[0].album.name);
            console.log(response.tracks.items[0].name);
            console.log("-----------------------------------------")
        })
        .catch(function (err) {
            console.log(err);
        });
};

var film = function (data) {
    if (!data) {
        data = "Mr. Nobody"
    }
    axios.get("http://www.omdbapi.com/?t=" + data + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("-----------------------------------------")
            console.log("The movie's title is: " + response.data.Title);
            console.log("The movie's release year is: " + response.data.Year);
            console.log("The movie's imdb rating is: " + response.data.imdbRating);
            console.log("The movie's rotten tomatoes rating is: " + response.data.Ratings[1].Value);
            console.log("The movie's country of origin is: " + response.data.Country);
            console.log("The movie's language is: " + response.data.Language);
            console.log("The movie's plot is: " + response.data.Plot);
            console.log("The movie's actors are: " + response.data.Actors);
            console.log("-----------------------------------------")
        });
}


if (process.argv[2] == "concert-this") {
    var i = 3;
    while (process.argv[i] != undefined) {
        artist += process.argv[i]
        i++;
    }
    concert(artist);
}

if (process.argv[2] == "spotify-this-song") {
    var i = 3;
    while (process.argv[i] != undefined) {
        song += (process.argv[i] + "+");
        i++;
    }
    userSong(song);
}

if (process.argv[2] == "movie-this") {
    var i = 3;
    while (process.argv[i] != undefined) {
        movie += (process.argv[i] + "+");
        i++;
    }
    film(movie);
}

if (process.argv[2] == "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArray = data.split(" ");
        var dataArraySearch = dataArray.splice(0, 1);
        dataArraySearch = dataArraySearch.join(" ");
        dataArray = dataArray.join(" ");
        if (dataArraySearch == "concert-this")
            concert(dataArray);
        if (dataArraySearch == "spotify-this-song")
            userSong(dataArray);
        if (dataArraySearch == "movie-this")
            film(dataArray);
    })
};

if (process.argv[2] != "concert-this" && process.argv[2] != "spotify-this-song" && process.argv[2] != "movie-this" && process.argv[2] != "do-what-it-says") {
    console.log("Liri does not yet support that function. Please Tweet us @Liriforpresident with your feature requests!")
}
