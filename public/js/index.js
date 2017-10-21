var socket = io();
		
socket.on('connect', function () {
	console.log('Connected to server');
	
	socket.emit('createEmail', {
		to: 'gina@example.com',
		text: 'Im good'
	});
	
	socket.emit('createMessage', {
		from: 'Mary',
		text: 'Sounds good'
	});
});

socket.on('disconnect', function () {
	console.log('Disconnected from server');
});

//socket.on('newEmail', function(email) {
//	console.log('New Email', email);
//});

socket.on('newMessage', function(message) {
	console.log('newMessage', message);
});

//NOTE: emit an event inside the connect event handler just to make sure the event is emitted only when connected to the server