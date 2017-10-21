const path = require('path');

//build in node.js modules
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

//Path to static page using node.js built-in module
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

//Create a new express application
var app = express();
var server = http.createServer(app);
//var server = http.createServer((req, res) => {
//	
//});
var io = socketIO(server);

io.on('connection', (socket) => {
	console.log('New user connected');
	
	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});
});

//Configure the express static middleware
app.use(express.static(publicPath));

server.listen(3000, () => {
	console.log(`Server is up on ${port}`);
});
//Change app to server
//app.listen(port, () => {
//	console.log(`Server is up on port ${port}`);
//});


//Get the path to the index.html(weird way)
//console.log(__dirname + '/../public');

