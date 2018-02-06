var fs = require('fs');
var data = fs.readFileSync('demo1.txt');
console.log(data.toString());
console.log('end');