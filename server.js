var express = require('express');
var bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
 
var app = express();
var port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('app'));

require('./routes.js')(app, path);

app.listen(port, function() {
	console.log(`Server now on port ${PORT}!`);
});