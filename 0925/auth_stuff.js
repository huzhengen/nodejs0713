const JWT = require('jsonwebtoken');
const SECRET = 'first json web token demo';
const crypto = require('crypto')

let token = JWT.sign({
    userId: 'asldjgalsdjf',
    iat: Date.now(),
    expire: Date.now() + 24 * 60 * 60 * 1000,
}, SECRET);

let verified = JWT.verify(token, SECRET);

let pbkdf2Async = bluebird.promisify(crypto);

(async ()=>{
    return crypto.pbkdf2Sync('abcde','salt',10000,512,'sha512')
})()
    .then(r=>{
        console.log(r.toString());
    })
    .catch(e=>{

    })

