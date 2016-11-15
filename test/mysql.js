
//直接连接mysql
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb',
    port: '3306'
});
//创建连接
connection.connect(function(err){
    err ? console.log('[query]- :'+ err) : console.log('连接成功');
});

//插入一条记录
var userAdd = 'insert into user(username,pwd) VALUES (?,?)';
var param = ['www','sss'];
connection.query(userAdd, param, function(err, rs) {
    if (err) {
        console.log('inset err:',err.message);
        return;
    }
    console.log('插入成功！！');
});

//执行查询
connection.query('select * from user where uid=?', [2], function(err, rs, fields) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(rs);
})

//关闭连接
connection.end(function(err){
    err ? console.log('[query]- :'+ err) : console.log('关闭成功');
})
