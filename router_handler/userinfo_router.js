//导入数据库操作模块
const db = require("../db/index")

//导入bcrytjs模块
const bcrytjs = require("bcryptjs")

//创建用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
    //res.send("获取用户信息成功！")
    //console.log(req.user.id);
    //定义查询用户信息的sql语句
    const sqlStr1 = "select id, username, nickname, email, user_pic from ev_users where id=?"
    //调用db.query执行sql语句
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

//实现更新用户基本信息的功能
exports.updateUserInfo = (req, res) => {
    //res.send("update is ok")
    //开始更新用户的sql语句
    const sqlStr2 = "update ev_users set? where id=?"
    //调用db.query执行sql语句
    db.query(sqlStr2, [req.body, req.user.id], (err, results) => {
        //执行的sql语句失败
        if (err) return res.err(err)
        //执行的sql语句成功，但是影响的函数不为1
        if (results.affectedRows !== 1) return res.err("修改用户基本信息失败!")
        //修改用户信息成功
        //req.user.id
        return res.send({
            status: 0,
            msg: "修改用户基本信息成功！"
        })

    })
}

//实现重置密码的功能  ---注意分请res.user和res.body的区别：res.user是你登陆是拥有的完整信息，包括id，用户名，密码，邮箱，昵称，头像，而res.body这是你当前申请该请求的所填写的数据！
exports.updatePassword = (req, res) => {
    const userinfo = req.user
    //开始执行根据id查询用户数据的sql语句
    const sqlStr3 = "select * from ev_users where id =?"
    //调用db.query执行sql语句
    console.log(userinfo);
    db.query(sqlStr3, userinfo.id, (err, results) => {
        //执行的sql的语句失败
        if (err) return res.err(err)
        //检测用户是否存在
        if (results.length !== 1) return res.err("用户不存在!")
        //判断用户输的旧密码是否正确
        const compareResult = bcrytjs.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) {
            return res.err("旧密码错误！")
        }

        //定义更新用户密码的sql语句
        const sqlStr4 = "update ev_users set password=? where id=?"
        //对新密码进行加密处理 -- 用的是bcrytjs.hashSync()方法
        const newPwd = bcrytjs.hashSync(req.body.newPwd, 10)
        //执行sql语句，根据id更新用户的密码
        db.query(sqlStr4, [newPwd, req.user.id], (err, results) => {
            //执行的sql语句失败
            if (err) return res.err(err)
            //执行的sql语句成功，但是影响的函数不为1
            if (results.affectedRows !== 1) return res.err("更新密码失败!")
            //更新密码成功
            res.send({
                status: 0,
                msg: "更新密码成功！"
            })

        })
    })
}


//实现更换头像的功能
exports.updateAvatar = (req, res) => {
    //res.send("updateAvatar is ok")
    //定义更新用户头像的sql语句
    const sql5 = "update ev_users set user_pic=? where id=?"
    //执行sql语句，根据id更新用户的头像
    db.query(sql5, [req.body.avatar, req.user.id], (err, results) => {
        //执行的sql语句失败
        if (err) return res.err(err)
        //执行的sql语句成功，但是影响的函数不为1
        if (results.affectedRows !== 1) return res.err("更新头像失败!")
        //更新用户头像成功
        res.send({
            status: 0,
            msg: "更新头像成功！"
        })
    })
}