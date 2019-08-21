var express = require('express');
var router = express.Router();
var models = require('../../models');

router.get('/', async (req, res) => {
    await models.Article.findAll({
        include: [models.Catalogue]
    }).then((result) => {
        res.json({
            articles: result
        })
    })
})

router.post('/', async (req, res) => {
    await models.Article.create(req.body).then((result) => {
        res.json({
            articles: result
        })
    })
})


module.exports = router;