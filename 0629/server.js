var http = require('http');
var fs = require('fs');

var port = process.env.port || 1337;

http.createServer(function(req, res){
    console.log('at port 1337');
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Orign': '*'
    });
    var read = fs.createReadStream(__dirname + '/index.html');
    read.pipe(res);
}).listen(port);