const express = require('express')
const app = express()
const path = require('path')

let cartTempData = {

}

// app.use(express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res)=>{
	let p = path.join(__dirname, './index.html')
	res.sendFile(p)
	// res.send('index')
})

app.get('/hi', (req, res)=>{
	res.send('hi')
})

app.get('/cartList', (req, res) => {
    res.send(cartTempData)
})

app.listen('5685', () => {
    console.log('running at port 5685')
})