const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer();
server.listen(8200);

let users = [];
server.on('request', (req, res)=>{
    // console.log(req, res);
    // console.log(req.method);
    const parsedUrl = url.parse(req.url,  true);
    console.log(querystring.parse(parsedUrl.search));
    // console.log(parsedUrl);
    if(parsedUrl.path.indexOf('/user') === -1){
        res.statusCode = 403;
        res.end(`${res.statusCode} not allowed`);
        return;
    }
    switch (req.method) {
        case 'GET':
            if(parsedUrl.path.indexOf('/user/') > -1){
                let username = parsedUrl.path.substring(6, parsedUrl.path.length);
                let user = users.find(u=>u.name === username);
                res.statusCode = 200;
                res.end(JSON.stringify(user));
            }

            let query = parsedUrl.query;
            if(query.address){
                let found = users.filter(u=>u.address === query.address);
                res.end(JSON.stringify(found));
            }else{
                res.statusCode = 200;
                res.end(JSON.stringify(users));
            }
            break;
        case 'POST':
            console.log('creating users');
            let user = '';
            req.on('data', (buffer)=>{
                const userStr = buffer.toString();
                let CT = req.headers['content-type'];
                if(CT === 'application/json'){
                    user = JSON.parse(userStr);
                    users.push(user);
                }
            });
            req.on('end', ()=>{
                res.statusCode = 201;
                res.end('great,user created');
            });
            break;
        case 'PATCH':
            console.log('patching users');
            let username = parsedUrl.path.substring(6, parsedUrl.path.length);
            console.log(username);
            req.on('data', (buffer)=>{
                const userStr = buffer.toString();
                let CT = req.headers['content-type'];
                if(CT === 'application/json'){
                    let update = JSON.parse(userStr);
                    let user = users.find(u=>u.name === username);
                    user.sex = update.sex;
                    console.log(update);
                    console.log(user);
                }
            });
            req.on('end', ()=>{
                res.statusCode = 201;
                res.end('great,user created');
            });
            break;
        case 'DELETE':
            if(parsedUrl.path.indexOf('/user/') > -1){
                let username = parsedUrl.path.substring(6, parsedUrl.path.length);
                let index = users.findIndex(u=>u.name === username);
                users = users.splice(index, 1);
                res.statusCode = 200;
                res.end(JSON.stringify(users));
            }
            break;
    }
});

