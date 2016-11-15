var http = require('http');
// var User = require('./module/user')
var Teacher = require('./module/Teacher');
http.createServer(
    function(request, response){
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        if (request.url !== "/favicon.ico") { //清除第二次访问
            teacher = new Teacher(1, "胡佩" ,18);
            teacher.enter();
            teacher.teach(response);
            response.end();  //必须要有的结束
        }
    }
).listen(8000);
console.log('server running at http://127.0.0.1:8000/');
