var fs = require('fs');

fs.readFile('demo1.txt', function(err, data) {
    if (err) {
        throw err;
    }
    console.log(data.toString())
});

console.log('end')