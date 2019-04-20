//数据库操作模块

//1. 加载 mysql 模块
const mysql = require('mysql');

//2. 创建mysql链接对象
const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'alishow',
    //允许同时执行多条SQL语句
    multipleStatements: true
})

//3. 链接mysql服务器
conn.connect();

//4. 导出conn对象
module.exports = conn;