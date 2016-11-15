var fs = require('fs');
module.exports = {
    readfileSync: function(path) {
        var data = fs.readFileSync(path, 'utf-8');//同步读取文件的方法readFileSync
        console.log(data);
        console.log('同步完毕');
    },
    readfile: function(path, recall) {
        fs.readFile(path, function(err, data) {
            if (err) {
                console.log(err);
            }else {
                // console.log(data.toString());
                recall(data);
            }
        });
        console.log('异步完毕');
    },
    writefile: function(path, data, recall) { //异步写文件
        fs.writeFile(path, data, function(err) {
            if (err) {
                throw err;
            }else {
                console.log('it\'s saved!');
                recall('文件写成功')
            }

        })
    },
    readimg: function(path, res){  //异步读取图片
        fs.readFile(path, 'binary', function(err, filedata) {
            if (err) {
                console.log(err);
            }else{
                res.write(filedata, 'binary');
                res.end();
            }
        })
    }
}
