require("dotenv").config();
var Spotify = require('node-spotify-api');
var request = require('request');
var moment = require('moment');
var keys = require('./keys.js');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var input = process.argv.slice(3).join("+");

function searchSpot(song) {
    spotify.search({ type: 'track', query: song, limit: 10 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (var i = 0; i < data.tracks.items.length; i++) {
            console.log("Artist: " + JSON.stringify(data.tracks.items[i].album.artists[0].name, null, 2));
            console.log("Song Name: " + JSON.stringify(data.tracks.items[i].name, null, 2));
            console.log("Preview: " + JSON.stringify(data.tracks.items[i].preview_url, null, 2));
            console.log("Album: " + JSON.stringify(data.tracks.items[i].album.name, null, 2));
            console.log("-------------------------------------------------------");
        };
    });
};
function liri() {
    if (command == "spotify-this-song" && input) {
        searchSpot(input);
    }else if (command == "spotify-this-song" && !input) {
        spotify.request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
            this.then(function (data) {
                console.log(data.album.artists[0].name);
                console.log(data.name);
                console.log(data.preview_url);
                console.log(data.album.name);
            });
            this.catch(function (err) {
                console.error('Error occurred: ' + err);
            });
    };
};

spotify.request('https://api.spotify.com/v1/search?q=' + input + '&type=track&market=US&offset=0&limit=10', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
});


function whatsLive(band) {
    request("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            for (var i = 0; i < JSON.parse(body).length; i++) {
                console.log("Venue: " + JSON.parse(body)[i].venue.name);
                console.log("Location: " + JSON.parse(body)[i].venue.city + ", " + JSON.parse(body)[0].venue.region);
                console.log("Date of Event: " + moment(JSON.parse(body)[i].datetime, "YYYY-MM-DDTHH:mm").format("MM/DD/YYYY"));
                console.log("-------------------------------------------------------");
            };
        };
    });
};
function omdb(movie) {
    request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("IMDb Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
    });
}
function liri() {
    if (command == "spotify-this-song" && input) {
        searchSpot(input);
    }else if (command == "spotify-this-song" && !input) {
        spotify.request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE');
            this.then(function (data) {
                console.log(data.album.artists[0].name);
                console.log(data.name);
                console.log(data.preview_url);
                console.log(data.album.name);
            })
            this.catch(function (err) {
                console.error('Error occurred: ' + err);
            });
    }else if (command == "concert-this") {
        whatsLive(input);
    }else if (command == "movie-this" && input) {
        omdb(input);
    }else if (command == "movie-this" && !input) {
        omdb("Richard Simmons and the Silver Foxes");
    }else if (command == "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function(error, data) {
            if (error) {
                return console.log(error);
            } else {
    
                
		var dataString = data.split(",");

		if (dataString[0] === "spotify-this-song") {
            input = dataString[1];
            console.log(input);
            searchSpot(input);
                } else {
                    omdb();
                };
            };
    
            fs.readFile("random.txt", "utf8", function(err) {
                if (err) {
                    console.log(err);
                };
            });
        });
    };
};
liri();