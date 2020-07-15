//1.导入模块
const express = require('express');
//2.创建express的服务器实例
const app = express();
//首先引入joi第三方模块，并且初始化代码
const joi = require("@hapi/joi")

//导入cors中间件来解决跨域问题
const cors = require("cors")
app.use(cors())

//配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))

//托管为静态资源
app.use("/uploads", express.static("./uploads"))

//在所有路由之前，封装res.err函数中间件
app.use((req, res, next) => {
    //status的默认值为1，表示失败的情况
    res.err = (err) => {
        res.send({
            status: 1,
            msg: err || err.message
            //msg: err instanceof Error ? err.message : err
        })
    }
    next()
})

//当客户把token字符串发送到服务器，我们在服务器内第一时间就可以把token转化回对象，只要配置成功了express-jwt，就会自动把用户信息挂载到req.user上面
//先导入全局的配置文件
const config = require("./config/config")
//再导入express-jwt第三方包
const expressJWT = require("express-jwt")
//使用全局中间件来解析token字符串，unless方法用来指定哪些接口不需要进行Token的身份验证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

//导入user 的router模块
const userRouter = require("./router/user")
app.use("/api", userRouter)

//导入userinfo 的router模块
const userinfoRouter = require("./router/userinfo")
app.use("/my", userinfoRouter)

//导入artcate 的router模块
const artcateRouter = require("./router/artcate")
app.use("/my/article", artcateRouter)

//导入article 的router模块
const articleRouter = require("./router/article")
app.use("/my/article", articleRouter)

//验证失败的中间件，放在路由之后，进行全局捕获
app.use((err, req, res, next) => {
    //数据验证失败
    // if (joi.ValidationError) {
    //     return res.err(err)
    // }
    //console.log(joi.ValidationError);
    if (err instanceof joi.ValidationError) {
        return res.send({
            status: 1,
            msg: err.details[0].message
        })
    }
    //在身份验证失败之后，捕获并处理Token认证失败后的错误
    if (err.name === "UnauthorizedError") return res.err("身份认证失败！")
    //未知错误
    res.err(err)
})
//3.调用app.listen方法，指定端口号并启动web服务器
app.listen(3007, () => {
    console.log('Express server running at http://127.0.0.1:3007');
});