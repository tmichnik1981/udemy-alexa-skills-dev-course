'use strict'

var index = require('./index.js');

var p1 = new index.Person('John', 'Mr. ', 'Chicago');
var p2 = new index.Person('James', 'Mr. ', 'Chicago');

console.log('-------------------');
console.log(p1.get_name());
console.log(p2.get_name());


console.log('====================');
var fs = require('fs');

/*try{
var data = fs.readFileSync('./tmp.txt', 'utf8');
console.log(data);
}catch(err){
    console.log(err);
}
*/
fs.readFile('./tmp.txt', 'utf8', function(err, data){
    //console.log(err);
    //throw err;
    console.log(data);
});

console.log('coming here');

var http = require('http');

var url = "http://api.forismatic.com/api/1.0/json?method=getQuote&lang=en&format=json";

http.get(url, function(res){
    var body = '';
    res.on('data', function(chunk){
        body += chunk;
    });
    res.on('end', function(){
        body = body.replace(/\\/g,'');
        var quote = JSON.parse(body);
        console.log(quote.quoteText);
    });
});