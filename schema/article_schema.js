//首先引入joi第三方模块，并且初始化代码
const joi = require("@hapi/joi")

/**
* string() 值必须是字符串
* alphanum() 值只能是包含 a-zA-Z0-9 的字符串
* min(length) 最小长度
* max(length) 最大长度
* required() 值是必填项，不能为 undefined
* allow() 允许里面存在填的值
* valid() 只能填写里面的值
* pattern(正则表达式) 值必须符合正则表达式的规则
* integer() 必须为整数
* ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
* not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
* concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
* dataUri() 指的是如下格式的字符串数据
* data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
*/

//定义 标题,分类id,内容,发布状态的验证规则
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow("")
const state = joi.string().valid("草稿", "已发布").required()



//暴露标题,分类id,内容,发布状态的验证规则
exports.add_article_schema = {
    body: {
        title,
        cate_id,
        content,
        state
    }
}