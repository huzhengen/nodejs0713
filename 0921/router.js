const router = require('express').Router();

// router.get('/', (req, res)=>{
//     res.json({code: 0, msg: 'simple router root'});
// });

router.get('/simple_demo', (req, res, next)=>{
    res.json({code: 0, msg: `your simple demo here`});
});

router.route('/').get((req, res, next)=>{
    res.json({code: 0, msg: 'getting simple router'});
    next();
}).post((req, res, next)=>{
    console.log('posting simple router mw1');
    next();
    // res.json({code: 0, msg: 'posting simple router'});
}, (req, res)=>{
    console.log('posting simple router mw2');
    res.json({code: 0, msg: 'posting simple router'});
});

module.exports = router;