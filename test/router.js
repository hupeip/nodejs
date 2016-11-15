var optfile = require('./module/optfile');
var url = require('url');
var querystring = require('querystring');


var OptPool = require('./module/optpool.js');
var optPool = new OptPool();
var pool = optPool.getPool();

function getRecall(req, res){
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    function recall(data) {
        res.write(data);
        res.end('');  //必须要有的http协议尾
    }
    return recall;
}

module.exports = {
    login: function(req, res){
        // function recall(data) {
        //     res.write(data);
        //     res.end('');  //必须要有的http协议尾
        // }
        //-------------get方式接收参数-------------
       /*
        var rdata = url.parse(req.url, true).query;//query获取地址栏参数
        console.log(rdata);
        if (rdata['email'] != undefined) {
            console.log(rdata['email']);
            console.log(rdata['pwd']);
        }
        */
        //-------------post方式接收参数-------------
        var post = '';//定义一个变量，用于暂存请求体的信息
        req.on('data', function(chunk) { //通过data事件监听
            post += chunk;
        });
        req.on('end', function() {  //参数接收完毕后会触发一个end方法，
            console.log(post);
            post = querystring.parse(post);
            pool.getConnection(function(err, conn){
                //插入一条记录
                var userAdd = 'insert into user(username,pwd) VALUES (?,?)';
                var param = [post['email'],post['pwd']];
                conn.query(userAdd, param, function(err, rs) {
                    if (err) {
                        console.log('inset err:',err.message);
                        return;
                    }
                    console.log('插入成功！！');
                    conn.release(); //将连接释放会连接池
                });
            })
            var arr = ['email', 'pwd'];
            function recall(data) {  //重写recall函数
                dataStr = data.toString();
                for (var i = 0; i < arr.length; i++) {
                    re = new RegExp('{'+arr[i]+'}', 'g'); //正则替换html中的{email}和{pwd}
                    dataStr = dataStr.replace(re, post[arr[i]]);
                }
                res.write(dataStr);
                res.end('');
            }
            // recall = getRecall(req, res);
            optfile.readfile('./views/login.html', recall);
        });

    },
    register: function(req, res){
        // function recall(data) {
        //     res.write(data);
        //     res.end('');  //必须要有的http协议尾
        // }
        recall = getRecall(req, res);
        optfile.readfile('./views/register.html', recall);
    },
    writefile: function(req, res){
        // function recall(data) {
        //     res.write(data);
        //     res.end('');  //必须要有的http协议尾
        // }
        recall = getRecall(req, res);
        optfile.writefile('./views/one.txt', ' 写入的内容', recall);
    },
    showimg: function(req, res){
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        optfile.readimg('./images/trip.jpg', res);
    }
}
