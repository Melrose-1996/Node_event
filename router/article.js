//开始发布新文章！！！

//导入express
const express = require("express")

//导入解析formdata格式表单数据的包
const multer = require("multer")

//导入处理路径的核心模块
const path = require("path")

//创建multer的实例对象，通过 dest属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, "../uploads") })

//导入暴露获取文章分类列表的路由处理函数
const article_router = require("../router_handler/article_router")

//先导入验证规则模块-- @escook/express-joi
const expressJoi = require("@escook/express-joi")
//导入需要验证规则的对象
const { add_article_schema } = require("../schema/article_schema")

//导入服务器模块化路由
const router = express.Router()

//发布新文章
router.post("/add", upload.single("cover_img"), expressJoi(add_article_schema), article_router.addArticle)




//向外共享路由对象
module.exports = router