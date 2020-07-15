//导入处理路径的path核心模块
const path = require("path")

//导入数据库操作模块
const db = require("../db/index")



//暴露发布新文章的模板路由函数
exports.addArticle = (req, res) => {
    // console.log(req.body);
    // console.log('--------------------');
    // console.log(req.file);
    // res.send("articleAdd is ok")
    //判断客户是否提交了封面图片
    if (!req.file || req.file.fieldname !== "cover_img") return res.err("文章封面是必选参数！")
    //整理需要插入数据库的文章信息对象
    const articleInfo = {
        //标题,内容,状态,所属的分类Id
        ...req.body,
        //文章封面在服务器端存放的路径
        cover_img: path.join("/uploads", req.file.fieldname),
        //文章发布时间
        pub_date: new Date(),
        //文章作者的Id
        author_id: req.user.id
    }
    //定义发布文章的sql语句
    var sqlStr1 = "insert into ev_articles set ?"
    //调用db.query()执行sql语句
    db.query(sqlStr1, articleInfo, (err, results) => {
        //执行sql语句失败
        if (err) return res.err(err)
        //执行语句成功，但是影响的函数不为1
        if (results.affectedRows !== 1) return res.err("发布文章失败！")
        //发布文章成功
        res.send({
            status: 0,
            msg: "发布文章成功！"
        })
    })

}