//用作登录注册功能！！
const express = require('express');
//2.创建express的服务器实例
const router = express.Router();
const user_rouder = require("../router_handler/user_router")
//注册新用户
router.post("/regust", user_rouder.regust)


router.post("/login", user_rouder.login)


module.exports = router



