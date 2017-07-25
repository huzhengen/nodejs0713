# HTTP

HTTP客户端发起请求，创建一个到服务器指定端口的TCP连接。

HTTP服务器在指定端口监听请求，收到请求的话，就向客户端返回一个状态及返回请求的内容。（其中状态行依次是当前HTTP版本号，3位数字组成的状态码，描述状态的短语，分别由空格分隔，例如：“HTTP/1.1 200 OK”）

HTTP/1.1协议中一共定义了8种方法来以不同方式操作制定的资源

1. GET
请求读取数据
2. HEAD
与GET方法一样，但是服务器不传回资源的本文部分
3. POST
提交数据
4. PUT
向指定资源位置上传其最新内容
5. DELET
请求服务器删除Request-URI所标识的资源
6. TRACE
回显服务器收到的请求
7. OPTIONS
使服务器传回该资源所支持的所有HTTP方法
8. CONNECT
HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器

# nodejs http模块

用http模块的方法http.createServer可以创建一个http服务器

http.createServer接收一个可选的参数，是一个回调函数，http.createServer((req,res)=>{})。（剪头函数为ES6语法）如果不传参，要用new http.Server().on('request', ...)。