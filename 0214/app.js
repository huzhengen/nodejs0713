var express = require('express')
var app = express()

let cartTempData = {

}

app.use(express.static('public'))

app.get('/cartList', (req, res) => {
    res.send(cartTempData)
})

app.listen('5685', () => {
    console.log('running at port 5684')
})