//开始获取文章分类列表

//导入express
const express = require("express")

//导入暴露获取文章分类列表的路由处理函数
const artCate_router = require("../router_handler/artcate_router")

//先导入验证规则模块-- @escook/express-joi
const expressJoi = require("@escook/express-joi")
//导入需要验证规则的对象
const { add_cate_schema, delete_cate_schema, update_cate_schema } = require("../schema/artcate_schema")

//导入服务器模块化路由
const router = express.Router()

//获取文章分类列表数据
router.get("/cates", artCate_router.getArticleCates)

//新增文章分类
router.post("/addcates", expressJoi(add_cate_schema), artCate_router.addArticleCates)

//根据 id 删除文章分类
router.get("/deletecate/:id", expressJoi(delete_cate_schema), artCate_router.deleteCateById)

//根据 id 获取文章分类
router.get("/cates/:id", expressJoi(delete_cate_schema), artCate_router.getArticleById)

//根据id更新文章分类
router.post("/updatecate", expressJoi(update_cate_schema), artCate_router.updateCateById)







module.exports = router