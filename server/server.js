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
	
//	socket.emit('newEmail', {
//		from: 'momo@example.com',
//		text: 'What\'s up',
//		createdAt: 123
//	});
	
	socket.emit('newMessage', {
		from: 'Diana',
		text: 'How about dinner?',
		createdAt: 123456
	});
	
//	socket.on('createEmail', (newEmail) => {
//		console.log('createEmail', newEmail);
//	});
	
	socket.on('createMessage', (newMessage) => {
		console.log('createMessage', newMessage);
	});
	
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

//NOTE: It's not a problem to use arrow function within files that are using node codes