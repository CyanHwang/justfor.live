var express = require('express');
var router = express.Router();
var models = require('../../models');

router.get('/list', async (req, res) => {
    const result = await models.Admin.findAll({
        order: [
            ['id', 'DESC']
        ]
    })
    res.json({
        Admins: result
    })
})


router.post('/sign-in', async (req, res) => {
    var username = req.body.username
    var password = req.body.password

    if (!username || !password) {
        res.json({
            sucess: false,
            error: '用户名或密码不能为空'
        })
    } else {
        const result = await models.Admin.findOne({
            where: {
                username: username,
                password: password
            }
        })
        if (!result.username) {
            res.json({
                sucess: false,
                error: '用户名不存在！'
            })
        } else {
            var token = {
                username: result.username,
                sex: result.sex,
            };
            res.json({
                success: true,
                message: '登录成功',
                token: token
            })
        }
    }
})

module.exports = router;