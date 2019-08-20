var express = require('express');
var router = express.Router();
var models = require('../../models');

router.post('/', (req, res) => {
    models.Tip.create(req.body).then(result=>{
        res.json({tips:result})
    })
})

router.get('/',(req,res)=>{
    models.Tip.findAll({order: [['id', 'ASC']]}).then(result=>{
        res.json({tips:result})
    })
})

router.put(`/`,(req,res)=>{
    models.Tip.findByPk(req.body.id).then(result=>{
        result.update(req.body)
        res.json({tip:result})
    })
})


module.exports = router;