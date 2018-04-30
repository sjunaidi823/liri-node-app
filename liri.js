require("dotenv").config();

//declaring variables for later use
var fs = require("fs");
var keys = require("./keys.js");
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var spotify = new spotify(keys.spotify);
var logData; //will store the data then log it to log.txt
//where you will type in the commands
var command = process.argv[2];
//where you will add title of movie or song for later use
var title = process.argv.slice(3).join("+");

//displaying laste 20 tweets; 
function myTweets() {
    var client = new twitter(keys.twitter);
    var params = { count: 20 };
    if (command === "my-tweets") {

        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            console.log("---++++++++++++++++++++++++++++++++++++++++++++++++++++++---");
            if (!error) {
                for (var i = 0; i < 20; i++) {
                    console.log(tweets[i].text + "\n");
                    logData = (tweets[i].text);
                    addLog();
                }
            }
            console.log("----++++++++++++++++++++++++++++++++++++++++++++++++++++++---");
        });
    }
}

function spotifyThis() {
    if (command === "spotify-this-song" && title !== "") {

        spotify.search({ type: "track", query: "\"" + title + "\"", limit: 1 }, function (err, data) {
            var spotifyData = data.tracks.items[0];
            console.log("---++++++++++++++++++++++++++++++++++++++++++++++++++++++---");
            if (err) {
                console.log("Error: " + err);
            } else {
                //prints artist name, song name, preview link, and album name to terminal
                console.log("ARTIST: " + spotifyData.artists[0].name);
                console.log("SONG: " + spotifyData.name);
                console.log("PREVIEW: " + spotifyData.preview_url);
                console.log("ALBUM: " + spotifyData.album.name);
                logData = "ARTIST: " + spotifyData.artists[0].name + "\n" + "SONG: " + spotifyData.name + "\n" + "PREVIEW: " + spotifyData.preview_url + "\n" + "ALBUM: " + spotifyData.album.name;
                addLog();
            }
            console.log("---++++++++++++++++++++++++++++++++++++++++++++++++++++++---");

        })
        //if no song title is specified, details for "the sign" will print to the terminal
    } else if (command === "spotify-this-song" && title === "") {
        title = "the sign";
        spotify.search({ type: "track", query: "\"" + title + "\"", limit: 1 }, function (err, data) {
            var spotifyData = data.tracks.items[0];
            console.log("---++++++++++++++++++++++++++++++++++++++++++++++++++++++---");
            if (err) {
                console.log("Error: " + err);
            } else {
                console.log("ARTIST: " + spotifyData.artists[0].name);
                console.log("SONG: " + spotifyData.name);
                console.log("PREVIEW: " + spotifyData.preview_url);
                console.log("ALBUM: " + spotifyData.album.name);
                logData = "ARTIST: " + spotifyData.artists[0].name + "\n" + "SONG: " + spotifyData.name + "\n" + "PREVIEW : " + spotifyData.preview_url + "\n" + "ALBUM: " + spotifyData.album.name;
                addLog();
            }
            console.log("---++++++++++++++++++++++++++++++++++++++++++++++++++++++---");
        })
    }
}

//movie this 

function movie() {
    if (command === "movie-this" && title !== "") {
        request('http://www.omdbapi.com/?apikey=trilogy&t=' + title, function (error, response, body) {
            console.log("---++++++++++++++++++++++++++++++++++++++++++++++++++++++---");
            if (error) {
                console.log('error:' + error);
            } else {
                //prints movie details to terminal
                // console.log('statusCode:', response && response.statusCode);
                var info = JSON.parse(body);
                // console.log(info);
                var IMDB_rating;
                var RT_rating;
                //searches through Ratings array to locate IMDB and RT ratings; store in variables
                for (var i = 0; i < info.Ratings.length; i++) {
                    if (info.Ratings[i].Source === "Internet Movie Database") {
                        IMDB_rating = info.Ratings[i].Value;
                    } else if (info.Ratings[i].Source === "Rotten Tomatoes") {
                        RT_rating = info.Ratings[i].Value;
                    }
                }
                console.log("MOVIE TITLE: " + info.Title);
                console.log("YEAR OF RELEASE: " + info.Year);
                console.log("IMDB: " + IMDB_rating);
                console.log("ROTTEN TOMATOES: " + RT_rating);
                console.log("MOVIE LANGUAGE: " + info.Language);
                console.log("MOVIE PLOT: " + info.Plot);
                console.log("ACTORS: " + info.Actors);
                logData = "MOVIE TITLE: " + info.Title + "\n" + "YEAR OF RELEASE: " + info.Year + "\n" + "IMDB: " + IMDB_rating + "\n" + "ROTTEN TOMATOES: " + RT_rating + "\n" + "MOVIE LANGUAGE: " + info.Language + "\n" + "MOVIE PLOT: " + info.Plot + "\n" + "ACTORS: " + info.Actors;
                addLog();
            }
            console.log("---++++++++++++++++++++++++++++++++++++++++++++++++++++++---");
        });
        //if movie title is not specified, then display movie details for "Mr. Nobody"
    } else if (command === "movie-this" && title === "") {
        title = "mr+nobody";
        request('http://www.omdbapi.com/?apikey=trilogy&t=' + title, function (error, response, body) {
            console.log("---++++++++++++++++++++++++++++++++++++++++++++++++++++++---");
            if (error) {
                console.log('error:', error);
            } else {
                // console.log('statusCode:', response && response.statusCode);
                var info = JSON.parse(body);
                // console.log(info);
                var IMDB_rating; //IMDB variable
                var RT_rating; //RT_rating variable that are stored here
                //imdb and rt stored in variables here
                for (var i = 0; i < info.Ratings.length; i++) {
                    if (info.Ratings[i].Source === "Internet Movie Database") {
                        IMDB_rating = info.Ratings[i].Value;
                    } else if (info.Ratings[i].Source === "Rotten Tomatoes") {
                        RT_rating = info.Ratings[i].Value;
                    }
                }
                console.log("MOVIE: " + info.Title);
                console.log("YEAR OF RELEASE: " + info.Year);
                console.log("IMDB: " + IMDB_rating);
                console.log("ROTTEN TOMATOES: " + RT_rating);
                console.log("MOVIE LANGUAGE: " + info.Language);
                console.log("MOVIE PLOT: " + info.Plot);
                console.log("ACTORS: " + info.Actors);
                logData = "MOVIE TITLE: " + info.Title + "\n" + "YEAR OF RELEASE: " + info.Year + "\n" + "IMDB: " + IMDB_rating + "\n" + "ROTTEN TOMATOES: " + RT_rating + "\n" + "MOVIE LANGUAGE: " + info.Language + "\n" + "MOVIE PLOT: " + info.Plot + "\n" + "ACTORS: " + info.Actors;
                addLog();
            }
            console.log("---++++++++++++++++++++++++++++++++++++++++++++++++++++++---");
        });
    }
}

// do what it says
if (command === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log(err);
        } else {
            command = data.split(",")[0];
            title = data.split(",")[1];

            myTweets();
            spotifyThis();
            movie();

        }
    });
}



myTweets();
spotifyThis();
movie();

// BONUS: output all queries to a log.txt file
function addLog() {
    fs.appendFile("log.txt", "\n" + logData + "\n", function(err) {
      if (err) {
        console.log(err);
      }
    }
    )
  }