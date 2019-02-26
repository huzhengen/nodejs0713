let fs = require('fs')

fs.readFile('./fs.txt', (err, data)=>{
	if(err) throw err;
	console.log(data)
	console.log(data.toString())
})

