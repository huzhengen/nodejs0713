var express = require('express')

var app = express()

app.get('/', (req, res)=>{
	res.send('node first')
})

app.listen('5684', ()=>{
	console.log('running at port 5684')
})