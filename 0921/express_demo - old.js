const express = require('express');
const app = express();
const simpleRouter = require('./router');

app.use('/hey', simpleRouter);

app.use('/ha', (req, res, next)=>{
    console.log('ha');
    next('route');
}, (req, res)=>{
    console.log('ha 2');
});

app.use((req, res)=>{
    console.log('ha 3')
});

app.listen('8081', ()=>{
    console.log('listening 8081')
})