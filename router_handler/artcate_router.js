//导入数据库操作模块
const db = require("../db/index")


//暴露获取文章分类列表的路由处理函数
exports.getArticleCates = (req, res) => {
    //res.send("artcate is ok!")
    //定义查询分类列表的数据的sql语句 -- is_delect 为0 则表示没有被 标记为删除 的数据 ,后面的order by id asc表示把查询后的结果根据id从小到大进行排序！
    const sqlStr1 = "select * from ev_article_cate where is_delect=0 order by id asc"
    //调用db.query()执行sql语句
    db.query(sqlStr1, (err, results) => {
        //sql语句执行失败
        if (err) return res.err(err)
        //sql语句执行成功
        res.send({
            status: 0,
            msg: "获取文章列表成功！",
            data: results
        })

    })

}


//暴露新增文章分类列表的路由处理函数
exports.addArticleCates = (req, res) => {
    //res.send("addArticleCates is ok!")
    //定义查询分类名称和分类别名是否被占用的sql的语句
    const sqlStr2 = "select * from ev_article_cate where name=? or alias=?"
    //调用db.query()执行sql语句
    db.query(sqlStr2, [req.body.name, req.body.alias], (err, results) => {
        //sql语句执行失败
        if (err) return res.err(err)
        //分类名称和分类别名全都被占用
        //res.send(results[0])
        if (results.length === 2) {
            return res.err("分类名称与别名均被占用，请换别的重试！")
        }
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) {
            return res.err("分类名称与别名均被占用，请换别的重试！")
        }
        //分类名称和分类别名 只有一个被占用
        if (results.length === 1 && results[0].name === req.body.name) {
            return res.err("分类名称被占用，请换别的重试！")
        }
        if (results.length === 1 && results[0].alias === req.body.alias) {
            return res.err("分类别名被占用，请换别的重试！")
        }

        //定义插入文章分类的sql的语句
        const sqlStr3 = "insert into ev_article_cate set?"
        //调用db.query()执行sql语句
        db.query(sqlStr3, req.body, (err, results) => {
            //sql语句执行失败
            if (err) return res.err(err)
            //sql语句执行成功，但是影响行数不等于1
            if (results.affectedRows !== 1) return res.err("添加文章分类失败！")
            //sql语句执行成功
            res.send({
                status: 0,
                msg: "新增文章分类成功！"
            })
        })
    })
}


//暴露根据id删除文章分类的路由处理函数
exports.deleteCateById = (req, res) => {
    //res.send("deleteCateById is ok")
    //定义根据id删除文章分类的sql的语句
    const sqlStr4 = "update ev_article_cate set is_delect=1 where id=?"
    //调用db.query()执行sql语句
    db.query(sqlStr4, req.params.id, (err, results) => {
        //sql语句执行失败
        if (err) return res.err(err)
        //sql语句执行成功，但是影响行数不等于1
        if (results.affectedRows !== 1) return res.err("删除文章分类失败！")
        //sql语句执行成功
        res.send({
            status: 0,
            msg: "删除文章分类成功！"
        })
    })
}

//暴露根据id 获取文章分类的路由处理函数
exports.getArticleById = (req, res) => {
    //res.send("getArticleById is ok")
    //定义根据id 获取文章分类的sql的语句
    const sqlStr5 = "select * from ev_article_cate where id=?"
    //调用db.query()执行sql语句
    db.query(sqlStr5, req.params.id, (err, results) => {
        //sql语句执行失败
        if (err) return res.err(err)
        //sql语句执行成功，但是查询不到任何数据
        if (results.length !== 1) return res.err("获取文章分类数据失败！")
        //sql语句执行成功
        res.send({
            status: 0,
            msg: "获取文章分类数据成功！",
            data: results[0]
        })
    })
}

//暴露根据id更新文章分类
exports.updateCateById = (req, res) => {
    //res.send("updateCateById is ok")
    //定义查询分类名称与分类别名是否被占用的sql语句
    const sqlStr6 = "select * from ev_article_cate where Id<>? and (name=? or alias=?)"
    //调用db.query()执行sql语句
    db.query(sqlStr6, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
        //sql语句执行失败
        if (err) return res.err(err)
        //sql语句执行成功，但是分类名称和分类别名都被占用
        if (results.length === 2) return res.err("分类名称和分类别名均被占用，请换别的重试！")
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.err("分类名称和分类别名均被占用，请换别的重试！")
        //sql语句执行成功，但是分类名称和分类别名有一个被占用
        if (results.length === 1 && results[0].name === req.body.name) return res.err("分类名称被占用，请换别的重试！")
        if (results.length === 1 && results[0].alias === req.body.alias) return res.err("分类别名被占用，请换别的重试！")

        //更新文章分类的sql的语句
        const sqlStr7 = "update ev_article_cate set ? where Id=?"
        //调用db.query()执行sql语句
        db.query(sqlStr7, [req.body, req.body.Id], (err, results) => {
            //sql语句执行失败
            if (err) return res.err(err)
            //sql语句执行成功，但是查询不到任何数据
            if (results.affectedRows !== 1) return res.err("更新文章分类数据失败！")
            //sql语句执行成功
            res.send({
                status: 0,
                msg: "更新文章分类数据成功！",
                data: results[0]
            })
        })
    })
}