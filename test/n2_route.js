var http = require('http');
var url = require('url');
var router = require('./router');
http.createServer(
    function(request, response){
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        if (request.url !== "/favicon.ico") { //清除第二次访问
            var pathname = url.parse(request.url).pathname; //拿到的是带有/的路由
            console.log(pathname);
            pathname = pathname.replace(/\//, ''); //把/去掉
            console.log(pathname);
            router[pathname](request,response);
            response.end();  //必须要有的结束
        }
    }
).listen(8000);
console.log('server running at http://127.0.0.1:8000/');

//路由
