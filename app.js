//1. 加载 express 模块
const express = require('express');

//2. 创建服务器
const app = express();

//3. 启动服务器
app.listen(3000, () => {
    console.log('Alishow-Server running at http://127.0.0.1:3000');
})

//将 __dirname 保存到全局作用域中
global.rootPath = __dirname;

//托管静态资源
app.use('/assets', express.static('./view/assets'));
app.use('/uploads', express.static('./view/uploads'));
app.use('/upload', express.static('./upload'));

//配置模板引擎
app.engine('html', require('express-art-template'));

//加载body-parser模块，再注册为中间件
//注册了该中间件之后，req对象才有了 body 属性
const bp = require('body-parser');
app.use(bp.urlencoded({extended:false}));

//加载 express-session 模块，并注册为中间件
//注册该中间件之后， req对象才有了 session子对象
//req.session
const session = require('express-session');
app.use(session({
    secret: 'eyfy24fyed',
    resave: false,
    saveUninitialized: false
}))

//将检测session的中间件函数进行注册
app.use(checkSession);

const fs = require('fs');
const path = require('path');
//加载路由模块，在注册为中间件
//参数1: 要读取的文件夹的路径（绝对路径和相对路径均可）
//参数2: 回调函数，函数中有两个参数  err  result
//    err: 成功时，null； 失败时，错误对象
//    result: 成功时，数组包含了文件夹下所有的文件和子文件的名称；失败时，undefined
fs.readdir(path.join(__dirname, 'routers'), (err, result) => {
    if (err) {
        //读取失败
        return console.log(err);
    }
    //读取成功，循环将这些模块加载，再注册成中间件
    //console.log(result);
    for (let i = 0; i < result.length; i++) {
        let router = require(path.join(__dirname, 'routers', result[i]));
        app.use(router);
    }
})

//fs模块中有readdir方法
//readdir功能: 能够读取一个读取一个文件夹下所有的文件和文件夹的名称
//fs.readdir

const url = require('url');

function checkSession (req, res, next) {
    // /admin/login
    // /admin/checkLogin
    // /admin/cate/cate
    // 首页(/index)、列表页(/list)、详情页(/detail) 都不要检测session
    
    //使用url.parse插接url地址
    const urlObj = url.parse(req.url, true);
    //req.url = '/index'  ==>  urlObj = {pathname: '/index', query:{}};
    //req.url = '/list?id=1'  ==> urlObj = {pathname: '/list', query: {id:1}}
    //req.url = '/admin/cate/cate' ==> urlObj = {pathname:'/admin/cate/cate', query:{}}

    // 将允许直接访问的路由设置为一个数组
    const allow_url = ['/admin/login', '/admin/checkLogin', '/index', '/list', '/detail'];
    // 判断当前访问的路由是否存在于该数组中，如果存在则next(), 如果不存在则检测session
    if(allow_url.includes(urlObj.pathname) == true) {
        //当前访问的url地址存在于allow_url数组中，直接next();
        next();
    } else {
        //不存在时，检测session
        if (req.session.isLogin != true) {
            //不等于true时说明没有登录，跳转回登录页 （/admin/login）
            return res.redirect('/admin/login');
        }
        next();
    }
}