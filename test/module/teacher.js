var User = require('./User');
function Teacher(id, name, age) {
    User.apply(this, [id, name, age]);//继承User类
    this.teach = function(res) {
        res.write(this.name + "讲课");
    }
}

module.exports = Teacher;
