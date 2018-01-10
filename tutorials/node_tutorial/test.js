'use strict'

var index = require('./index.js');

var p1 = new index.Person('John', 'Mr. ', 'chicago');

console.log('-------------------');
console.log(p1.get_name());