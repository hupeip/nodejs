var http = require('http');
var otherfun = require('./module/otherfun.js');
http.createServer(
    function(request, response){
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        if (request.url !== "/favicon.ico") { //清除第二次访问
            // console.log('访问');
            // response.write('hello world!!');
            // fun1(response); //调用同一个文件的方法

            // otherfun.fun2(response);//直接调用另一个文件方法
            // otherfun.fun3(response);
            
            //通过字符串调用方法
            var user = 'fun2';
            otherfun[user](response);
            response.end();  //必须要有的结束
        }
    }
).listen(8000);
console.log('server running at http://127.0.0.1:8000/');

function fun1(res) {
    console.log("fun1");
    res.write("hello fun1");
}
