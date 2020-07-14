//用作登录注册功能！！
//创建express的服务器实例
const express = require('express');



//导入服务器模块化路由
const router = express.Router();
const user_rouder = require("../router_handler/user_router")

//导入验证表单数据的中间件   --注意设置表单规则并且暴露出来的是@hapi/joi包，用与把暴露出来的规则实际验证的是@escook/express-joi包
const expressJoi = require("@escook/express-joi")
//导入需要的验证规则对象
const { reg_login_schema } = require("../schema/user_schema")

//注册新用户
router.post("/regust", expressJoi(reg_login_schema), user_rouder.regust)

//登录功能，验证规则由于是跟注册是一样的，所以现在直接添加就完了！
router.post("/login", expressJoi(reg_login_schema), user_rouder.login)


module.exports = router



