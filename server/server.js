const path = require('path');

//build in node.js modules
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
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
var users = new Users();



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
//	socket.emit('newMessage', {
//		from: 'Admin',
//		text: 'Welcome to the chat app',
//		craetedAt: new Date().getTime()
//	});
	
//	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
	
//	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
	
	//Send a message to every other user except the new user
//	socket.broadcast.emit('newMessage', {
//		from: 'Admin',
//		text: 'New user joined',
//		createdAt: new Date().getTime()
//	});
	
	
	socket.on('join', (params, callback) => {
		if(!isRealString(params.name) || !isRealString(params.room)) {
			callback('Name and room name are required');
		}
		
		socket.join(params.room);
		//socket.leave('The Room Name');
		
		//Remove the user if it's already exist
		users.removeUser(socket.id);
		
		users.addUser(socket.id, params.name, params.room);
		
		//io.emit -> io.to('The room name').emit
		//socket.broadcast.emit -> socket.broadcast.to('The Room Name).emit
		//socket.emit
		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
		
		callback();
	});
	
	socket.on('createMessage', (message, callback) => {
		//console.log('createMessage', message);
//		io.emit('newMessage', {
//			from: message.from,
//			text: message.text,
//			createdAt: new Date().getTime()
//		});
		var user = users.getUser(socket.id);
		if(user && isRealString(message.text)) {
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
		}
		
		callback();
//		socket.broadcast.emit('newMessage', {
//			from: message.from,
//			text: message.text,
//			createdAt: new Date().getTime()
//		});
	});
	
	socket.on('createLocationMessage', (coords) => {
		var user = users.getUser(socket.id);
		
		if(user) {
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
		}
		
	});
	
	socket.on('disconnect', () => {
		var user = users.removeUser(socket.id);
		
		io.to(user.room).emit('updateUserList',users.getUserList(user.room));
		io.to(user.room).emit('newMessage',generateMessage('Admin', `${user.name} has left the room`));
		//console.log('Client disconnected');
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