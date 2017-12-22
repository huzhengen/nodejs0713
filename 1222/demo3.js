var http = require('http')
var url = require('url')
var fs = require('fs')

var callBack = function(req, res){
	var pathname = url.parse(req.url).pathname
	if(pathname == '/'){
		pathname = '/index.html'
	}
	fs.readFile('.' + pathname, 'utf-8', function(err, data){
		if(err){
			res.write('ERROR 404')
		}else{
			res.write(data)
		}
		res.end()
	})
}

http.createServer(callBack).listen(8888)
console.log('localhost:8888')