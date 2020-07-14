//导入数据库操作模块
const db = require("../db/index")

//创建用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
    //res.send("获取用户信息成功！")
    //定义查询用户信息的sql语句
    const sqlStr1 = "select id, username, nickname, email, user_pic from ev_users where id=?"
    db.query(sqlStr1, req.user.id, (err, results) => {
        //执行的sql语句失败
        if (err) return res.err(err)
        //执行的sql语句成功，但是查询的结果可能为空
        if (results.length !== 1) {
            return res.err("获取用户的信息失败！")
        }
        //用户的信息获取成功
        res.send({
            status: 0,
            msg: "获取用户的基本信息成功！",
            data: results[0]
        })
    })
}