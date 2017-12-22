var http = require('http')
var fs = require('fs')

var callBack = function(req, res){
	fs.readFile('./demo2.js', 'utf-8', function(err, data){
		res.write(data)
		res.end()
	})
}

http.createServer(callBack).listen(8888)
console.log('localhost:8888')