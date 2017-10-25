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

//REMOVED
//	socket.emit('newMessage', {
//		from: 'Diana',
//		text: 'How about dinner?',
//		createdAt: 123456
//	});
	
//	socket.on('createEmail', (newEmail) => {
//		console.log('createEmail', newEmail);
//	});
	
	//Send every user a welcome text
	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome to the chat app',
		craetedAt: new Date().getTime()
	});
	
	//Send a message to every other user except the new user
	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'New user joined',
		createdAt: new Date().getTime()
	});
	
	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});
//		socket.broadcast.emit('newMessage', {
//			from: message.from,
//			text: message.text,
//			createdAt: new Date().getTime()
//		});
	});
	
	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});
});

//Configure the express static middleware
app.use(express.static(publicPath));

server.listen(port, () => {
	console.log(`Server is up on ${port}`);
});
//Change app to server
//app.listen(port, () => {
//	console.log(`Server is up on port ${port}`);
//});


//Get the path to the index.html(weird way)
//console.log(__dirname + '/../public');

//NOTE: It's not a problem to use arrow function within files that are using node codes
//NOTE: socket.emit() : emit an event to a single connection
//NOTE: io.emit() : emit an event to every single connection