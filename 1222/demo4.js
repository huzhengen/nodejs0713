var express = require('express')
var app = express()

app.use(express.static('public'))

app.get('/', function(req, res){
	res.send('<h1>hello nodejs</h1>')
})
app.get('/user', function(req, res){
	res.send('<h1>user</h1>')
})

app.listen(8888, function(){
	console.log('localhost:8888')
})