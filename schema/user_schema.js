//首先引入joi第三方模块，并且初始化代码
const joi = require("@hapi/joi")

/**
* string() 值必须是字符串
* alphanum() 值只能是包含 a-zA-Z0-9 的字符串
* min(length) 最小长度
* max(length) 最大长度
* required() 值是必填项，不能为 undefined
* pattern(正则表达式) 值必须符合正则表达式的规则
* integer() 必须为整数
* ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
* not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
* concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
* dataUri() 指的是如下格式的字符串数据
* data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
*/


//定义用户名和密码的校验规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^\S*(?=\S{6,12})\S*$/).required()

//现在我们要定义id, nickname, email的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

//我们现在要定义头像数据的验证规则
const avatar = joi.string().dataUri().required()


//暴露验证密码和用户名的验证规则
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}

//暴露验证id,昵称和邮箱的验证规则
exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}

//暴露重置密码验证规则
exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref("oldPwd")).concat(password)
    }
}

//暴露验证头像数据的验证规则
exports.update_avatar_schema = {
    body: {
        avatar
    }
}