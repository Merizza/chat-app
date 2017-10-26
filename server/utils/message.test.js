var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	
	it('should generate correct message object', () => {
		var from = 'Husky';
		var text = 'Testing'
		var message = generateMessage(from, text);
		
//		expect(message.from).toBe('Husky');
//		expect(message.text).toBe('Testing');
		expect(message).toMatchObject({from, text});
		expect(message.createdAt).toBeTruthy();
	});
	
});

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		var from = 'Kenny';
		var latitude = 10;
		var longitude = 10;
		var url = 'https://www.google.com/maps?q=10,10';
		var message = generateLocationMessage(from, latitude, longitude);
		
		expect(message.url).toMatchObject({from, propertyIsEnumerable});
		expect(message.createdAt).toBeTruthy();
	});
});