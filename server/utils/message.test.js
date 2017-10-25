var expect = require('expect');

var {generateMessage} = require('./message');

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