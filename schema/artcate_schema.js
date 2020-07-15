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

//定义name和alias的校验规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()

//定义分类id的校验规则
const id = joi.number().integer().min(1).required()



//暴露name和alias的校验规则
exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}

//暴露分类id的校验规则
exports.delete_cate_schema = {
    params: {
        id
    }
}

//暴露更新id的校验规则
exports.update_cate_schema = {
    body: {
        Id: id,
        name,
        alias
    }
}