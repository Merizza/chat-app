var moment = require('moment');

//var date = moment();
//date.add(1, 'year').subtract(3, 'months');
//console.log(date.format('MMM Do, YYYY'));

//var date = moment();
//console.log(date.format('h:mm a'));

//return timestamp similar to new Date().getTime() method
var someTimestamp = moment().valueOf();
console.log(someTimestamp);
var date = moment(someTimestamp);
console.log(date.format('h:mm a'));

