//完成管理员增删改查操作

const express = require('express');
//创建路由对象
const router = express.Router();

const path = require('path');
const db = require('../db.js');
const moment = require('moment');

//显示 users.html 页面 --- admin/user/users.html
router.get('/admin/user/users', (req, res) => {
    res.render(path.join(rootPath, 'view', 'admin/user/users.html'));
})

//查询管理员列表
router.get('/admin/user/getUsers', (req, res) => {
    //1. 编写SQL语句
    const sql = 'select * from ali_admin';

    //2. 执行SQL语句
    db.query(sql, (err, result) => {
        //3. 处理SQL执行结果
        if (err) {
            return res.send({code:201, message:"查询管理员列表失败"});
        }

        res.send({code:200, message:"查询管理员列表成功", data: result});
    })
})


//显示添加新管理员页面 --- admin/user/adduser.html
router.get('/admin/user/adduser', (req, res) => {
    res.render(path.join(rootPath, 'view', 'admin/user/adduser.html'));
})

//添加新管理员
router.post('/admin/user/addUserDeal', (req, res) => {
    //1. 接收数据
    const data = {
        admin_email: req.body.email,
        admin_nickname: req.body.nickname,
        admin_pwd: req.body.password,
        admin_state: req.body.state,
        admin_addtime: moment().format('YYYY-MM-DD')
    }
	console.log(data);
    //2. 编写SQL
    const sql = 'insert into ali_admin set ?';

    //3. 执行SQL语句
    db.query(sql, data, (err, result) => {
        //4. 处理SQL执行结果
        if (err || result.affectedRows != 1) {
            return res.send({code:201, message:"添加新管理员失败"});
        }

        res.send({code:200, message:"添加新管理员成功"});
    })
})

//批量删除管理员
router.post('/admin/user/delusers', (req, res) => {
    //1. 接收数据 --- 管理员id值 ids
    const ids = req.body.ids;  // 1,2,3,5

    //2. 编写SQL语句
    const sql = `delete from ali_admin where admin_id in (${ids})`;

    //3. 执行SQL语句
    db.query(sql, (err, result) => {
        if (err) {
            return res.send({code:201, message:"批量删除管理员失败"});
        }

        return res.send({code:200, message:"批量删除管理员成功"});
    })
})

//显示管理员编辑页
router.get('/admin/user/edituser', (req, res) => {
    //1. 接收数据 --- admin_id
    const admin_id = req.query.id;

    //2. 编写SQL语句
    const sql = 'select * from ali_admin where admin_id=?';

    //3. 执行SQL语句
    //result = [{admin_id:5, admin_email:"lb@ali.com", admin_nickname:"鲁班", ...}];
    db.query(sql, admin_id, (err, result) => {
        res.render(path.join(rootPath, 'view', 'admin/user/edituser.html'), result[0]);
    })
})

//修改管理员信息
router.post('/admin/user/modifyuser', (req, res) => {
    //1. 接收数据 --- 表单提交的管理员信息
    const data = {
        admin_email: req.body.email,
        admin_nickname: req.body.nickname,
        admin_tel: req.body.tel,
        admin_state: req.body.state
    }
    const admin_id = req.body.id;

    //2. 编写SQL语句
    const sql = 'update ali_admin set ? where admin_id=?';

    //3. 执行SQL语句
    db.query(sql, [data, admin_id], (err, result) => {
        if (err || result.affectedRows != 1) {
            return res.send({code:201, message:"修改管理员信息失败"});
        }


        res.send({code:200, message:"修改管理员信息成功"});
    })
})

module.exports = router;