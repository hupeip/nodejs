// function fun2(res) {
//     console.log('fun2');
//     res.write('hello fun2');
// }
// module.exports = fun2;//这种方式只支持输出一个函数


module.exports = {
    fun2: function(res) {
        console.log('fun2');
        res.write('hello fun2');
    },
    fun3: function(res) {
        console.log('fun3');
        res.write('hello fun3');
    }
}
