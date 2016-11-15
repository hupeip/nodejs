//异步流程控制
var async = require('async');
function oneFun(){
  var ii = 0;
  setInterval(function(){
      console.log("aaa="+new Date());
      ii++;
      if (ii==3) {
        clearInterval(this);
      }
  },1000);
    console.log("oneFun")
}
function twoFun(){
    var jj = 0;
    setInterval(function(){
        console.log("bbb="+new Date());
        jj++;
        if (jj==3) {
          clearInterval(this);
        }
    },1000);
    console.log("oneFun执行完毕")
}
// oneFun();
// twoFun();


function exec() {
    async.waterfall(  //series 串行无关联   parallel 并行无关联  waterfall 串行有关联（瀑布流）
        [
            function(done){
                var ii = 0;
                setInterval(function(){
                    console.log("aaa="+new Date());
                    ii++;
                    if (ii==3) {
                      clearInterval(this);
                      done(null, 'one完毕');
                    }
                },1000);
            },
            function(preValue, done){  //waterfall 需要传入第一个方法的结果preValue
                var jj = 0;
                setInterval(function(){
                    console.log(preValue +'='+ new Date());
                    jj++;
                    if (jj==3) {
                      clearInterval(this);
                      done(null, preValue+',two完毕');
                    }
                },1000);
            }
        ], function(err,rs) {
            console.log(err);
            console.log(rs);
        }
    )
}
exec();
console.log("主进程执行完毕");
