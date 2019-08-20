var express = require('express');
var router = express.Router();
var models = require('../../models');

router.get('/list', (req, res) => {
    models.Admin.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(result => {
        res.json({
            Admins: result
        });
    })
})


router.post('/sign-in', (req, res) => {
    var username = req.body.username
    var password = req.body.password

    if (!username || !password) {
        res.json({
            sucess: false,
            error: '用户名或密码不能为空'
        })
    } else {
        models.Admin.findOne({
            where: {
                username: username,
                password: password
            }
        }).then(result => {
            if (!result.username) {
                res.json({
                    sucess: false,
                    error: '用户名不存在！'
                })
            } else {
                var token = {username:result.username,
                             sex:result.sex,
                             };
                res.json({
                    success: true,
                    message: '登录成功',
                    token: token
                })
            }
        })
    }
})



module.exports = router;