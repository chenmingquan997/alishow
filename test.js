//目标: 读取routers目录下所有的文件
//1. 加载 fs 模块
const fs = require('fs');
const path = require('path');

//2. 调用readdir方法
fs.readdir(path.join(__dirname, 'routers'), (err, result) => {
    if (err) {
        //读取失败
        return console.log(err);
    }
    //读取成功，循环将这些模块加载，再注册成中间件
    //console.log(result);
    for (let i = 0; i < result.length; i++) {
        let router = require(path.join(__dirname, 'routers', result[i]));
    }
})