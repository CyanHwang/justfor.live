var express = require('express');
var router = express.Router();
var models = require('../../models');

router.get('/', async (req, res) => {
    let result = await models.Tip.findAll({
        order: [
            ['id', 'ASC']
        ]
    });
    res.json({
        tips: result,
        status: '查询成功'
    })
})

router.get('/:id', async (req, res) => {
    let result = await models.Tip.findByPk(req.params.id, {
        include: [
            {model: models.Catalogue,
            as:'catalogues'
            }
          ],
        where: {TipId:req.params.id},
    })
    res.json({
        tip: result,
        status: '查询成功'
    })
})

router.post('/', async (req, res) => {
    let result = await models.Tip.create(req.body);
    res.json({
        tips: result,
        status: '新增成功'
    })
})


router.put(`/:id`, async (req, res) => {
    let result = await models.Tip.findByPk(req.body.id)
    result.update(req.body);
    res.json({
        tip: result,
        status: '编辑成功'
    })
})

router.delete(`/:id`, async (req, res) => {
    let result = await models.Tip.findByPk(req.params.id);
    result.destroy();
    res.json({
        status: '删除成功'
    })
})


module.exports = router;