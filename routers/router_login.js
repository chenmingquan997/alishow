//编写登录相关代码
//后台登录页、检测用户名密码、后台首页

const express = require('express');
//创建路由对象
const router = express.Router();

const path = require('path');
const db = require('../db.js');


//显示后台登录页 --- admin/login.html
router.get('/admin/login', (req, res) => {
    res.render(path.join(rootPath, 'view', 'admin/login.html'));
})

//验证登录信息
router.post('/admin/checkLogin', (req, res) => {
    //1. 接收数据 --- 用户名和密码
    const email  = req.body.email;
    const passwd = req.body.passwd;

    //2. 编写SQL语句
    const sql = 'select * from ali_admin where admin_email=? and admin_pwd=?';

    //3. 执行SQL语句
    //查询得到的是数组，增删改得到的是对象
    db.query(sql, [email, passwd], (err, result) => {
        //4. 处理SQL执行结果
        if (err || result.length != 1) {
            //登录失败
            return res.send({code:201, message:"登录失败"});
        }
        //登录成功, 将登录信息保存到session中
        //result = [{admin_id:1, admin_email:"", admin_nickname:"", ...}];
        req.session.isLogin = true;
        req.session.userInfo = result[0];

        res.send({code:200, message:"登录成功"});
    })
})

//退出登录
router.post('/admin/logout', (req, res) => {
    //回调函数中的参数是错误对象
    //如果清除session失败，则err是一个错误对象
    //如果清除session成功，则err是null
    req.session.destroy(function (err) {
        if (err) {
            //退出失败
            return res.send({code:201, message:"退出失败"});
        }

        res.send({code:200, message:"退出成功"});
    })
})

//显示后台首页  --- admin/index.html
router.get('/admin/index', (req, res) => {
    console.log(req.session.isLogin);
    console.log(req.session.userInfo);

    res.render(path.join(rootPath, 'view', 'admin/index.html'));
})

module.exports = router;