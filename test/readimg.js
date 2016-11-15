var http = require('http');
var optfile = require('./module/optfile.js');
http.createServer(
    function(request, response){
        // response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

        if (request.url !== "/favicon.ico") { //清除第二次访问
            optfile.readimg('./images/trip.jpg', response);
        }
    }
).listen(8000);
console.log('server running at http://127.0.0.1:8000/');

//显示图片
