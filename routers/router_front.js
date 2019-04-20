//编写前台相关的代码
//前台首页、列表页、详情页
//
const express = require('express');
//创建路由对象
const router = express.Router();

const path = require('path');
const db = require('../db.js');

//显示前台首页 --- index.html
router.get('/index', (req, res) => {
    //1. 编写SQL语句 --- 查询所有栏目信息
    const sql = `select * from ali_cate;
                 select * from ali_article order by rand() limit 0,5;
                 select * from ali_pic;
                 select * from ali_article where article_focus=1 order by article_addtime desc limit 0,5;
                 select * from ali_article join ali_admin on article_adminid=admin_id join ali_cate on article_cateid=cate_id order by article_addtime desc limit 0,3`;

    //2. 执行SQl语句
    db.query(sql, (err, result) => {
        //console.log(result);
        //改造分配给模板页的数据结构
        const data = {
            cate: result[0],
            rand: result[1],
            pic: result[2],
            focus: result[3],
            news: result[4]
        }
        res.render(path.join(rootPath, 'view', 'index.html'), data);
    }) 
})

//显示前台列表页
router.get('/list', (req, res) => {
    //接收栏目id
    const cate_id = req.query.id;

    const sql = `select * from ali_cate;
                 select * from ali_article order by rand() limit 0,5;
                 select * from ali_cate where cate_id=${cate_id};
                 select ali_article.*, ali_admin.admin_nickname from ali_article join ali_admin on article_adminid=admin_id where article_cateid=${cate_id}`;

    db.query(sql, (err, result) => {
        //改造查询结果
        const data = {
            cate: result[0],
            rand: result[1],
            name: result[2][0], //result[2] = [{cate_id:1, cate_name:"", ...}] 
            list: result[3]
        }

        res.render(path.join(rootPath, 'view', 'list.html'), data);
    })  
})

//显示前台文章详情页
router.get('/detail', (req, res) => {
    const article_id = req.query.id;

    const sql = `select * from ali_cate;
                 select * from ali_article order by rand() limit 0,5;
                 select ali_article.*,ali_admin.admin_nickname,
                     ali_cate.cate_id,ali_cate.cate_name from ali_article
                     join ali_admin on ali_article.article_adminid=ali_admin.admin_id
                     join ali_cate on ali_article.article_cateid=ali_cate.cate_id
                     where ali_article.article_id=${article_id}`;

    db.query(sql, (err, result) => {
        const data = {
            cate: result[0],
            rand: result[1],
            article: result[2][0]  //result[2] = [{article_id:1, article_title:"", ...}]
        }
        res.render(path.join(rootPath, 'view', 'detail.html'), data);
    })
})

module.exports = router;