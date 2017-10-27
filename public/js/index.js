var socket = io();
		
socket.on('connect', function () {
	console.log('Connected to server');
	
//	socket.emit('createEmail', {
//		to: 'gina@example.com',
//		text: 'Im good'
//	});
//	
//	socket.emit('createMessage', {
//		from: 'Mary',
//		text: 'Sounds good'
//	});
});

socket.on('disconnect', function () {
	console.log('Disconnected from server');
});

//socket.on('newEmail', function(email) {
//	console.log('New Email', email);
//});

socket.on('newMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery('#message-template').html();
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});
	
	jQuery('#messages').append(html);
	
//console.log('newMessage', message);
//	var formattedTime = moment(message.createdAt).format('h:mm a');
//	var li = jQuery('<li></li>');
//	li.text(`${message.from} ${formattedTime}: ${message.text}`);
//	
//	jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery('#location-message-template').html();
	var html = Mustache.render(template, {
		from: message.from,
		createdAt: formattedTime,
		url: message.url
	});
	
	jQuery('#messages').append(html);
	
//	var formattedTime = moment(message.createdAt).format('h:mm a');
//	var li = jQuery('<li></li>');
//	var a = jQuery('<a target="_blank">My Current Location</a>');
//	
//	li.text(`${message.from} ${formattedTime}: `);
//	a.attr('href', message.url);
//	li.append(a);
//	jQuery('#messages').append(li);
});

//socket.emit('createMessage', {
//	from: 'Monika',
//	text: 'Hi'
//}, function(data) {
//	console.log('Got it', data);
//});

jQuery('#message-form').on('submit', function(e) {
	e.preventDefault();
	
	var messageTextBox = jQuery('[name=message]');
	
	socket.emit('createMessage', {
		from: 'User',
		text: messageTextBox.val()
	}, function() {
		messageTextBox.val('');
	});
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
	if(!navigator.geolocation) {
		return alert('Geolocation not supported by your browser');
	}
	
	locationButton.attr('disabled', 'disabled').text('Sending location...');
	
	navigator.geolocation.getCurrentPosition(function(position) {
		
		locationButton.removeAttr('disabled').text('Send location');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function() {
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable to fetch location');
	});
});

//NOTE: emit an event inside the connect event handler just to make sure the event is emitted only when connected to the server