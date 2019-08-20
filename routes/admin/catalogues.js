var express = require('express');
var router = express.Router();
var models = require('../../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post('/', (req, res) => {
    models.Catalogue.create(req.body).then(result=>{
        res.json({catalogues:result})
    })
})

router.get('/',(req,res)=>{
        //  分页参数
        var currentPage = req.param('currentPage') == undefined ? 1 : req.param('currentPage'); // 判断当前是第几页，如果是undefined就是第一页
        var pageSize =  req.param('pageSize') == undefined ? 10 : req.param('pageSize'); // 每页只显示1条
        var data = {}; // 定义一个空的data，等下读数据
    
        // 定义一个参数，按照商品名称模糊搜索
        var keyword = req.query.keyword;
        if(keyword != undefined && keyword != ''){
            data.title = {
                [Op.like]: '%' + keyword + '%' // 模糊搜索组成前后%中间是定义的接收数据用+连接
            }
        }
        //按分类搜索
        var TipId = req.query.TipId;
        if(TipId != undefined && TipId != ''){
            data.TipId = {
                [Op.eq]: TipId, // 比较精确的搜索
            }
        }
    models.Catalogue.findAndCountAll({
        include:[models.Tip],
        where:data,
        offset:(currentPage - 1) * pageSize,
        limit:parseInt(pageSize),
        order: [['id', 'ASC']]
    }).then(result=>{
        res.json({
            catalogues:result.rows,
            pagination:{
                currentPage:parseInt(currentPage),
                pageSize:parseInt(pageSize),
                total:result.count,
            }
        })
    })
})

router.put(`/`,(req,res)=>{
    models.Catalogue.findByPk(req.body.id).then(result=>{
        result.update(req.body)
        res.json({catalogues:result})
    })
})


module.exports = router;