//接下来操作sql语句,导入数据库操作模块
const db = require("../db/index")

//导入bcryptjs
const bcrypt = require("bcryptjs")

//导入jsonwebtoken包
const jwt = require("jsonwebtoken")

//导入我们定义的全局配置文件
const config = require("../config/config")

exports.regust = (req, res) => {
    //获取到客户端提交到服务器的用户信息
    const userinfo = req.body
    // //表单中的数据进行合法性校验
    // if (!userinfo.username || !userinfo.password) {
    //     return res.err("用户名和密码不正确！")
    // }
    //定义sql语句
    const sqlStr1 = 'select * from ev_users where username=?'
    //执行sql语句，查询用户的数据
    db.query(sqlStr1, userinfo.username, (err, results) => {
        //执行sql语句失败
        if (err) {
            return res.err(err)
        }
        if (results.length > 0) {
            return res.err("用户名被占用，请更换其他用户名！")
            //return console.log('用户名被占用，请更换其他用户名！');
        }
        //res.send("regust is not ok")
        //用户名可用，可以进行下面的操作
        userinfo.password = bcrypt.hashSync(userinfo.password, 14)
        //插入一个新的用户
        const sqlStr2 = 'insert into ev_users set ?'
        db.query(sqlStr2, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) {
                return res.err(err)
            }
            if (results.affectedRows !== 1) {
                return res.err("注册用户失败，请稍后再试！")
            }
        })
        //注册成功
        res.send({
            status: 0,
            msg: "注册成功！"
        })
        console.log('注册成功！');
        //res.err("注册成功")
    })

}


exports.login = (req, res) => {
    //接收表单传递过来的数据
    const userinfo = req.body
    //定义sql语句
    const sqlStr1 = 'select * from ev_users where username=?'
    //执行sql语句，根据用户名查询用户的信息！
    db.query(sqlStr1, userinfo.username, (err, results) => {
        //执行sql语句， 根据用户名查询用户的信息
        if (err) return res.err(err)
        if (results.length !== 1) return res.err("登录失败！")
        //现在开始验证用户输入的密码跟数据库里面的密码进行对比比较，判断用户输入的密码和数据库里面存的密码是否一致  -- 使用的是bcrypt里面的bcrypt.compareSync()方法
        //console.log(userinfo.password);
        //console.log(results[0].password);
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        //console.log(compareResult);
        if (!compareResult) return res.err("登录失败！")
        //来生成JWT的token字符串
        //console.log({ ...results[0] });
        //在生成token之前，先把用户的私密信息(密码和头像)清空
        const user = { ...results[0], password: "", user_pic: "" }
        //console.log(user);
        //生成Token字符串内容  -- 利用jwt.sign()
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })


        //判断用户名是否正确
        res.send({
            status: 0,
            msg: "登陆成功！",
            token: "Bearer " + tokenStr
        })
    })

}