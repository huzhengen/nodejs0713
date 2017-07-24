const http = require('http');
const server = http.createServer();
const url = require('url');
const querystring = require('querystring');

server.listen(8200);

let users = [];

server.on('request', (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (parsedUrl.path.indexOf('/user') === -1) {
    res.statusCode = 403;
    res.end(`${res.statusCode} not allowed`);
    return;
  }
  switch (req.method) {
    case 'GET':
      if (parsedUrl.path.indexOf('/user/') > -1) {
        let username = parsedUrl.path.substring(6, parsedUrl.path.length);
        let user = users.find(u => u.name === username);
        res.statusCode = 200;
        res.end(JSON.stringify(user));
      }
      let query = parsedUrl.query;
      if (query.address) {
        let found = users.filter(u => u.address === query.address);
        res.end(JSON.stringify(found));
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify(users));
      }

      break;
    case 'POST':
      let user = '';
      req.on('data', (buffer) => {
        const userStr = buffer.toString();
        let CT = req.headers['content-type'];
        if (CT === 'application/json') {
          user = JSON.parse(userStr);
          users.push(user);
        }
      })

      req.on('end', () => {
        res.statusCode = 201;
        res.end('Great! User created!');
      })
      break;
    case 'PATCH':
      let username = parsedUrl.path.substring(6, parsedUrl.path.length);
      req.on('data', (buffer) => {
        const userStr = buffer.toString();
        let CT = req.headers['content-type'];
        if (CT === 'application/json') {
          let update = JSON.parse(userStr);
          let user = users.find(u => u.name === username);
          user.address = update.address;
        }
      })
      req.on('end', () => {
        res.statusCode = 201;
        res.end('Great! User created!');
      })
      break;
    case 'DELETE':
      if (parsedUrl.path.indexOf('/user/') > -1) {
        let username = parsedUrl.path.substring(6, parsedUrl.path.length);
        let index = users.findIndex(u => u.name === username);
        users.splice(index, 1);
        res.statusCode = 200;
        res.end(JSON.stringify(users));
      }
      break;
  }
})
