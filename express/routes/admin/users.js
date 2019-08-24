var express = require('express');
var router = express.Router();
var models = require('../../models');
// 登录生成token,密码加密&验证
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.get('/list', async (req, res) => {
    const result = await models.Admin.findAll({
        order: [
            ['id', 'DESC']
        ]
    })
    res.json({
        admins: result,
        status: '查询成功'
    })
})

router.get('/list/:id', async (req, res) => {
    const result = await models.Admin.findByPk(req.params.id)
    res.json({
        admin: result,
        status: '查询成功'
    })
})

router.post('/sign-in', async (req, res) => {
    var {
        username,
        password
    } = req.body
    if (!username || !password) {
        return res.status(422).send({
            sucess: false,
            message: '用户名或密码不能为空！'
        })
    } else {
        const user = await models.Admin.findOne({
            where: {
                username: username
            }
        })
        if (!user) {
            return res.status(422).json({
                sucess: false,
                message: '用户不存在！'
            })
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(422).json({
                success: false,
                message: '密码错误！'
            })
        }
        var token = jwt.sign({
            user: {
                id: user.id,
                username: username,
                admin: true
            }
        }, process.env.SECRET, {
            expiresIn: 60 * 60 * 24 * 7
        });

        res.json({
            success: true,
            message: '登录成功！',
            token: token
        })
    }
})

router.post('/sign-up', async (req, res) => {
    var {
        username,
        password,
        check_password
    } = req.body

    if (!username || !password) {
        res.json({
            success: false,
            message: '用户名或密码不能为空！'
        })
        return;
    }

    if (check_password != password) {
        res.json({
            success: false,
            message: '两次密码输入不一致！'
        })
        return;
    }
    const result = await models.Admin.findOne({
        where: {
            username: username
        }
    });
    if (result) {
        res.json({
            success: false,
            message: '用户名已注册！'
        })
        return;
    }
    password = bcrypt.hashSync(password, 10);
    user = await models.Admin.create({
        username: username,
        password: password,
    })
    res.json({
        success: true,
        message: '注册成功',
        user: user
    })
})
module.exports = router;