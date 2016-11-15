var OptPool = require('./module/optpool.js');
var optPool = new OptPool();
var pool = optPool.getPool();

//从连接池中拿到一个连接
pool.getConnection(function(err, conn){
    //插入一条记录
    var userAdd = 'insert into user(username,pwd) VALUES (?,?)';
    var param = ['123','345'];
    conn.query(userAdd, param, function(err, rs) {
        if (err) {
            console.log('inset err:',err.message);
            return;
        }
        console.log('插入成功！！');
        // conn.release(); //将连接释放会连接池
    });

    //执行查询
    conn.query('select * from user where uid=?', [5], function(err, rs, fields) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(rs);
        conn.release(); //将连接释放会连接池
    })
})
