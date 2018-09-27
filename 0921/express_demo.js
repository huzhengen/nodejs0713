const express = require('express');
const app = express();
const simpleRouter = require('./router');
const anotherRouter = require('./another_router');

app.use('/simple', simpleRouter, anotherRouter);

app.use((err, req, res, next)=>{
    res.status(401);
    // console.log(err.stack);
    res.json({code: -1, msg: err.message});
    next(err);
});

app.use((err, req, res, next)=>{
   console.log(`Second err middleware called, msg:${err.message}`);
});

app.listen('8081', ()=>{
    console.log('listening 8081')
});