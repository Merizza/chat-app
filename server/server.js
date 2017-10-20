const path = require('path');
const express = require('express');

//Path to static page using node.js built-in module
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

//Create a new express application
var app = express();

//Configure the express static middleware
app.use(express.static(publicPath));

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});


//Get the path to the index.html(weird way)
//console.log(__dirname + '/../public');