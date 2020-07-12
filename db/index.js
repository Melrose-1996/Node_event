//导入mysql模块
const mysql = require("mysql")

//创建数据库连接对象
const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "admin123",
    database: "my_db_01"
})
// // 测试 mysql 模块能够正常运行
// db.query('select 1', (err, results) => {
//     // mysql 模块如果错误，err 中会返回错误信息
//     if (err) return console.log(err.message)

//     // 能够成功的执行 SQL 语句
//     console.log(results)
// })
//向外共享db数据库连接对象
module.exports = db