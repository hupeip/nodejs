
var http = require('http');
var url = require('url');
var router = require('./router');
http.createServer(
    function(request, response){
        // response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        if (request.url !== "/favicon.ico") { //清除第二次访问
            var pathname = url.parse(request.url).pathname; //拿到的是带有/的路由
            pathname = pathname.replace(/\//, ''); //把/去掉
            router[pathname](request,response);
        }
    }
).listen(8000);
console.log('server running at http://127.0.0.1:8000/');

//显示图片和文字   路由改造
