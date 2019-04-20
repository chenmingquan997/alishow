//个人中心相关处理

const express = require('express');
//创建路由对象
const router = express.Router();

const path = require('path');
const db = require('../db.js');
const moment = require('moment');

//显示 profile.html 文件 -- admin/center/profile.html
router.get('/admin/center/profile', (req, res) => {
    console.log(req.session.userInfo);
    res.render(path.join(rootPath, 'view', 'admin/center/profile.html'), req.session.userInfo);
})

//显示修改密码页面 --- admin/center/password-reset.html
router.get('/admin/center/repassword', (req, res) => {
    res.render(path.join(rootPath, 'view', 'admin/center/password-reset.html'));
})


module.exports = router;