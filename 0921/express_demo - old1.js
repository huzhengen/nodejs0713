const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    // console.log(req);
    // console.log(JSON.stringify(req.query));
    // console.log(res.query.username);
    // return res.json({code: 0});
    res.set('Content-Type', 'applicatin/json');
    res.status(404);
    return res.send(JSON.stringify({code: 1}));
    return res.json({code: 0});
});

app.listen('8081', ()=>{
    console.log('listening 8081')
});