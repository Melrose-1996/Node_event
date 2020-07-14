//导入express模块
const express = require("express")
//导入路由处理函数
const userinfo_router = require("../router_handler/userinfo_router")

//创建路由对象
const router = express.Router()

//获取用户基本信息
router.get("/userinfo", userinfo_router.getUserInfo)

module.exports = router