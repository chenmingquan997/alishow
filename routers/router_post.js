const express = require('express');
//创建路由对象
const router = express.Router();

const path = require('path');
const db = require('../db.js');
const moment = require('moment');

//显示添加文章页 --- admin/post/addpost.html
router.get('/admin/post/addpost', (req, res) => {
    res.render(path.join(rootPath, 'view', 'admin/post/addpost.html'));
})

//显示文章列表页 --- admin/post/posts.html
router.get('/admin/post/posts', (req, res) => {
    res.render(path.join(rootPath, 'view', 'admin/post/posts.html'));
})


module.exports = router;