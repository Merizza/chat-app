const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
	var users;
	
	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Miko',
			room: 'Node'
		}, {
			id: '2',
			name: 'Kevin',
			room: 'React'
		}, {
			id: '3',
			name: 'Martin',
			room: 'Node'
		}];
	});
	
	it('should add new user', () => {
		var users = new Users();
		var user = {
			id: '123',
			name: 'Finn',
			room: 'Node'
		};
		var resUser = users.addUser(user.id, user.name, user.room);
		expect(users.users).toEqual([user]);
	});
	
	it('should remove a user', () => {
		var user = users.removeUser('1');
		
		expect(user.id).toBe('1');
		expect(users.users.length).toBe(2);
//		var updateUser = users.removeUser('1');
//		
//		expect(updateUser.length).toBe(2);
//		expect(updateUser).toEqual(['Kevin', 'Martin']);
	});
	
	it('should not remove a user', () => {
		var user = users.removeUser('6');
		
		expect(user).toBe(undefined);
		expect(users.users.length).toBe(3);
//		var updateUser = users.removeUser('5');
//		
//		expect(updateUser).toEqual(['Miko', 'Kevin', 'Martin']);
	});
	
	it('should find user', () => {
		var userId = '2';
		var user = users.getUser(userId);
		
		expect(user.id).toBe(userId);
//		var findUser = users.getUser('3');
//		
//		expect(findUser).toEqual(['Martin']);
	});
	
	it('should not find user', () => {
		var findUser = users.getUser('7');
		
		expect(findUser).toBe(undefined);
	});
	
	it('should return names for Node course', () => {
		var userList = users.getUserList('Node');
		
		expect(userList).toEqual(['Miko', 'Martin']);
		expect(userList.length).toBe(2);
	});
	
	it('should return names for React course', () => {
		var userList = users.getUserList('React');
		
		expect(userList).toEqual(['Kevin']);
		expect(userList.length).toBe(1);
	});
});










