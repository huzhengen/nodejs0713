var http = require('http')
var url = require('url')

var callBack = function(req, res){
	var urlString = url.parse(req.url)
	var path = urlString.pathname
	var query = urlString.query
	console.log(path, query)


	res.write('<h1>hello nodejs</h1>')
	res.end()
}
http.createServer(callBack).listen(8888)
console.log('localhost:8888')