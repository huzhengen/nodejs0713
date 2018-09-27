const router = require('express').Router();

router.use('/', (req, res, next)=>{
    res.json({code: 0, msg: `your simple demo here`});
});

module.exports = router;