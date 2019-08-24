var express = require('express');
var router = express.Router();
var models = require('../../models');

router.get('/', async (req, res) => {
    let result = await models.Article.findAll({
        include: [models.Catalogue]
    });
    res.json({
        articles: result,
        status: '查询成功'
    })
});


router.get('/:id', async (req, res) => {
    let result = await models.Article.findByPk(req.params.id)
    res.json({
        article: result,
        status: '查询成功'
    })
})

router.post('/', async (req, res) => {
    let result = await models.Article.create(req.body)
    res.json({
        articles: result,
        status: '新增成功'
    })
});

router.put('/:id', async (req, res) => {
    let result = await models.Article.findByPk(req.params.id)
    result.update(req.body);
    res.json({
        article: result,
        status: '编辑成功'
    })
})

router.delete('/:id', async (req, res) => {
    let result = await models.Article.findByPk(req.params.id)
    result.destroy();
    res.json({
        status: '删除成功'
    })
})


module.exports = router;