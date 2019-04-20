const express = require('express');
//创建路由对象
const router = express.Router();

//加载controller_cate.js 控制器模块
const cate_c = require('../controller/controller_cate.js');

//监听路由
//显示栏目列表页 --- admin/cate/cate.html
router.get('/admin/cate/cate', cate_c.cate);

//获取栏目列表数据
router.get('/admin/cate/getCate', cate_c.getCate);

//显示添加新栏目页面 --- admin/cate/addcate.html
router.get('/admin/cate/addcate', cate_c.addCate);

//添加新栏目处理
router.post('/admin/cate/addCateDeal', cate_c.addCateDeal);

//删除栏目
router.post('/admin/cate/delcate', cate_c.delCate);

//显示栏目编辑页
router.get('/admin/cate/editcate', cate_c.editCate);

//修改栏目信息
router.post('/admin/cate/modifycate', cate_c.modifyCate);

//导出路由模块
module.exports = router;