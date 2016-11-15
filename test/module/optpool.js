//操作连接池
var mysql = require('mysql');
//定义一个OptPool类
function OptPool(){
    this.flag = true; //是否连接过
    this.pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'mydb',
        port: '3306'
    });
    this.getPool = function() {
        if (this.flag) {
            //监听connection事件
            this.pool.on('connection', function(connection) {
                connection.query('set session auto_increment');
                this.flag = false;
            });
        }
        return this.pool;
    }
};

module.exports = OptPool;
