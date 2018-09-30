const JWT = require('jsonwebtoken');
const JWT_SECRET = require('../cipher').JWT_SECRET;

module.exports = function (options){
    return function(req, res, next){
        try{
            const auth = req.get('Authorization');
            if(!auth) throw new Error('no auth');
            let authList = auth.split(' ');
            if(!auth || auth.length < 2){
                next(new Error('no auth'));
                return;
            }
            const token = auth[1];
            const obj = JWT.verify(token, JWT_SECRET);
            if(!obj || !obj._id || !obj.expire) throw new Error('no auth');
            if(Date.now() - obj.expire > 0) throw new Error('token expired');
            next();
        }catch(e){
            res.statusCode = 401;
            next(e);
        }
    }
}