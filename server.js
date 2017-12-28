var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var houses = require('./app/data/houses.js');
 
var app = express();
var port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('app'));

app.listen(port, function() {
	console.log("Currently listening on port " + port);
	console.log(houses);
});

// Serves HTML ///////////////////////////////////////////////////////////
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "./app/html/home.html"));
});

app.get("/survey", function(req, res) {
	res.sendFile(path.join(__dirname, "./app/html/survey.html"));
});

// JSON ///////////////////////////////////////////////////////////////// 
app.get("/api/friends", function(req, res) {
	res.json(houses);
});

app.post("/api/friends/", function(req, res) {
	var user = req.body;

	console.log(user);
	var lowestDif = 99;

	for(var i = 0; i<houses.length; i++) {
		console.log(houses[i].scores);
		var tempNum = null;
		
		for(var v = 0; v<5; v++) {
			var n = Math.abs(houses[i].scores[v] - user.scores[v]);
			tempNum += n;
		}

		if(lowestDif > tempNum) {
			lowestDif = tempNum;
			user.house = i;
		};
		console.log("lowest num: " + lowestDif);
	}
	console.log("\n");
	console.log(user);
	houses[user.house].members.push(user.name);
	console.log(houses[user.house]);
	res.json(user);
});