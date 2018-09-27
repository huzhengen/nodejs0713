const express = require('express');
const app = express();

app.use('/', mw1, mw2);

function mw1(req, res, next){
    console.log('mw1');
    res.user = {name: 'luhan'};
    next(new Error('something is wrong'));
}
function mw2(req, res, next){
    console.log('mw2');
    console.log(JSON.stringify(req.user));
    res.json({msg: 'done'});
}

app.get('/', (req, res)=>{
    res.json({msg: 'get'})
});

// app.post('/', (req, res)=>{
//     console.log(req,body)
//     res.send({code: 0, msg: "done"});
// });

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