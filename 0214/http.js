let http = require('http')

let server = http.createServer((req, res)=>{
	console.log(req.url)
	console.log(res)
	res.statusCode = 201
	res.write('hello')
	res.end()
})

server.listen(9999)