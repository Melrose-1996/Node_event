//导入express模块
const express = require("express")
//导入路由处理函数
const userinfo_router = require("../router_handler/userinfo_router")

//创建路由对象
const router = express.Router()

//先导入验证规则模块-- @escook/express-joi
const expressJoi = require("@escook/express-joi")
//导入需要验证规则的对象
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require("../schema/user_schema")

//获取用户基本信息
router.get("/userinfo", userinfo_router.getUserInfo)

//更新用户信息
router.post("/userinfo", expressJoi(update_userinfo_schema), userinfo_router.updateUserInfo)

//重置密码
router.post("/updatepwd", expressJoi(update_password_schema), userinfo_router.updatePassword)

//更新头像
router.post("/update/avatar", expressJoi(update_avatar_schema), userinfo_router.updateAvatar)



module.exports = router