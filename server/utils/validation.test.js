const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
	it('should reject non-string values', () => {
		var result = isRealString(23);
		expect(result).toBeFalsy();
	});
	it('should reject string with only spaces', () => {
		var result = isRealString('   ');
		expect(result).toBeFalsy();
	});
	it('should allow string with non-space characters', () => {
		var result = isRealString('  John  ');
		expect(result).toBeTruthy();
	});
});