const express = require('express');
//创建路由对象
const router = express.Router();

const path = require('path');
const db = require('../db.js');

//显示轮播图管理页 --- admin/other/slides.html
router.get('/admin/other/slides', (req, res) => {
    res.render(path.join(rootPath, 'view', 'admin/other/slides.html'));
})

module.exports = router;