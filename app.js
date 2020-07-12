//1.导入模块
const express = require('express');
//2.创建express的服务器实例
const app = express();

//导入cors中间件来解决跨域问题
const cors = require("cors")
app.use(cors())

//配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))

//导入router模块
const router = require("./router/user")
app.use("/api", router)


//3.调用app.listen方法，指定端口号并启动web服务器
app.listen(3000, () => {
    console.log('Express server running at http://127.0.0.1:3000');
});