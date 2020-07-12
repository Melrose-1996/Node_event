//接下来操作sql语句,导入数据库操作模块
const db = require("../db/index")




exports.regust = (req, res) => {
    //获取到客户端提交到服务器的用户信息
    const userinfo = req.body
    //表单中的数据进行合法性校验
    if (!userinfo.username || !userinfo.password) {
        return res.send({
            status: 1,
            msg: "用户名和密码不正确！",
        })
    }
    //定义sql语句
    const sql = "select * from ev_users where username=?"
    db.query(sql, userinfo.username, (err, results) => {
        //执行sql语句失败
        if (err) {
            return res.send({
                status: 1,
                msg: err.message
            })
        }
        if (results.length > 0) {
            return res.send({
                status: 1,
                msg: "用户名被占用，请更换其他用户名！"
            })
        }
        //用户名可用，可以进行下面的操作
    })
    res.send("regust is ok")
}


exports.login = (req, res) => {
    res.send("login is ok")
}