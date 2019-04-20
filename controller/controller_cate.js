const path = require('path');
const db = require('../db.js');
const moment = require('moment');

let cate = (req, res) => {
    res.render(path.join(rootPath, 'view', 'admin/cate/cate.html'));
}

let getCate = (req, res) => {
    //1. 编写SQL语句
    const sql = 'select * from ali_cate';

    //2. 执行SQL语句
    //result = [
    //  {cate_id:1, cate_name:"潮科技", cate_icon:"fa-leaf", cate_addtime:"2018-05-08"},
    //  {cate_id:2, cate_name:"奇趣事", cate_icon:"fa-glass", cate_addtime:"2018-05-07"},
    //  ...
    //]
    db.query(sql, (err, result) => {
        //3. 处理SQL执行结果 --- 将执行结果返回给前端(cate.html)
        if (err) {
            console.log(err);
            return res.send({code:201, message:"查询栏目列表信息失败"});
        }

        res.send({code:200, message:"查询栏目列表信息成功", list: result});
    })
}

let addCate = (req, res) => {
    res.render(path.join(rootPath, 'view', 'admin/cate/addcate.html'));
}

let addCateDeal = (req, res) => {
    //1. 接收数据 -- 表单提交的栏目名和栏目图标
    const data = {
        cate_name: req.body.name,
        cate_icon: req.body.icon,
        cate_addtime: moment().format('YYYY-MM-DD')
    }

    //2. 编写SQL语句
    const sql = 'insert into ali_cate set ?';

    //3. 执行SQL语句
    db.query(sql, data, (err, result) => {
        //4. 处理SQL执行结果 --- 结果返回给前端
        if (err) {
            console.log(err);
            return res.send({code:201, message:"添加新栏目失败"});
        }

        res.send({code:200, message:"添加新栏目成功"});
    })
}

let delCate = (req, res) => {
    //1. 接收数据 --- cate_id
    const id = req.body.id;

    //2. 编写SQL语句
    const sql = 'delete from ali_cate where cate_id=?';

    //3. 执行SQl语句
    db.query(sql, id, (err, result) => {
        //4. 处理SQL执行结果 --- 将成功/失败返回给前端
        if (err || result.affectedRows != 1) {
            console.log(err);
            return res.send({code:201, message:"删除栏目失败"});
        }

        res.send({code:200, message:"删除栏目成功"});
    })
}

let editCate = (req, res) => {
    //1. 接收数据 --- cate_id
    //get方式的传参（?id=1&name=zs）,使用 req.query.id、req.query.name
    const id = req.query.id;

    //2. 编写SQL语句
    const sql = 'select * from ali_cate where cate_id=?';

    //3. 执行SQL语句
    // result = [{cate_id:, cate_name:"", cate_icon:"", cate_addtime:""}];
    db.query(sql, id, (err, result) => {
        //4. 将查询结果显示到编辑页面上 (admin/cate/editcate.html)
        //参数1: 模板文件路径
        //参数2: 要渲染到模板页上的数据 --- js/json
        res.render(path.join(rootPath, 'view', 'admin/cate/editcate.html'), result[0]);
    })
}

let modifyCate = (req, res) => {
    //1. 接收数据
    const data = {
        cate_name: req.body.name,
        cate_icon: req.body.icon
    }
    const id = req.body.id;

    //2. 编写SQL
    const sql = 'update ali_cate set ? where cate_id=?';

    //3. 执行SQl语句
    db.query(sql, [data, id], (err, result) => {
        //4. 处理SQL执行结果
        if (err || result.affectedRows != 1) {
            console.log(err);
            return res.send({code:201, message:"修改栏目失败"});
        }

        res.send({code:200, message:"修改栏目成功"});
    })
}

module.exports = {
    cate,
    getCate,
    addCate,
    addCateDeal,
    delCate,
    editCate,
    modifyCate
}