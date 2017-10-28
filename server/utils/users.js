class Users {
	constructor () {
		this.users = [];
	}
	addUser (id, name, room) {
		var user = {id, name, room};
		this.users.push(user);
		return user;
	}
	removeUser (id) {
		var user = this.getUser(id);
		
		if(user) {
			this.users=this.users.filter((user) => user.id !== id);
		}
		return user;
//		var users = this.users.filter((user) => user.id !== id);
//		var namesArray = users.map((user) => user.name);
//		return namesArray;
	}
	getUser (id) {
		return this.users.filter((user) => user.id === id)[0];
//		var users = this.users.filter((user) => user.id === id);
//		var name = users.map((user) => user.name);
//		return name;
		
	}
	getUserList (room) {
		var users = this.users.filter((user) => user.room === room);
		var namesArray = users.map((user) => user.name);
		
		return namesArray;
//		var users = this.users.filter((user) => {
//			return user.room === room;
//		});
	}
}

module.exports = {Users};

//class Person {
//	constructor (name, age) {
//		this.name = name;
//		this.age = age;
//	}
//	getUserDescription () {
//		return `${this.name} is ${this.age} year(s) old`;
//	}
//}
//
//var me = new Person('Linda', 28);
//var description = me.getUserDescription();
//console.log(description);
//console.log('this.name', me.name);
//console.log('this.age', me.age);