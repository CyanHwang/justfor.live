var express = require('express');
var router = express.Router();
var models = require('../../models');

router.post('/', async (req, res) => {
    await models.Tip.create(req.body).then(result => {
        res.json({
            tips: result
        })
    })
})

router.get('/', async (req, res) => {
    await models.Tip.findAll({
        order: [
            ['id', 'ASC']
        ]
    }).then(result => {
        res.json({
            tips: result
        })
    })
})

router.put(`/`, async (req, res) => {
    await models.Tip.findByPk(req.body.id).then(result => {
        result.update(req.body)
        res.json({
            tip: result
        })
    })
})


module.exports = router;