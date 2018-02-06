const express = require('express');
const Router = express.Router();
const untils = require('utility')
const model = require('./model.js');
const User = model.getModel('user');
const Chat = model.getModel('chat');
const _filter = { 'pwd': 0, '_v': 0 }


Router.get('/list', function (req, res) {
    // User.remove({},function(){})
    const { type } = req.query;
    User.find({ type }, function (err, doc) {
        return res.json({ code: 0, data: doc });
    })
})

//用户信息列表
Router.get('/getmsglist', function (req, res) {
    const user = req.cookies.userid;

    User.find({}, function (e, userdoc) {
        let users = {};
        userdoc.forEach(v => {
            users[v._id] = { name: v.user, avatar: v.avatar }
        })

        Chat.find({ '$or': [{ from: user }, { to: user }] }, function (err, doc) {
            if (!err) {
                return res.json({ code: 0, msgs: doc ,users:users})
            }
        })
 
    })

})



Router.post('/register', function (req, res) {
    const { user, pwd, type } = req.body;
    User.findOne({ user }, function (err, doc) {
        if (doc) {
            return res.json({ code: 1, msg: '用户名重复' })
        }
        const userModel = new User({ user, type, pwd: untils.md5(untils.md5(pwd)) })

        userModel.save(function (e, d) {
            if (e) {
                return res.json({ code: 1, msg: '后端出错了' })
            }
            const { user, type, _id } = d;
            res.cookie('userid', _id)
            return res.json({ code: 0, data: { user, type, _id } })
        })
    })
})

Router.post('/login', function (req, res) {
    const { user, pwd } = req.body;
    User.findOne({ user, pwd: untils.md5(untils.md5(pwd)) }, _filter, function (err, doc) {
        if (!doc) {
            return res.json({ code: 1, msg: '用户名或密码错误' })
        }
        res.cookie('userid', doc._id)
        return res.json({ code: 0, data: doc })
    })
})

Router.post('/updata', function (req, res) {
    const userid = req.cookies.userid;
    if (!userid) {
        return res.json({ code: 1, msg: '后端出错了' })
    }
    const body = req.body;
    User.findByIdAndUpdate(userid, body, function (err, doc) {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body)
        return res.json({ code: 0, data: doc })
    })
})

Router.get('/info', function (req, res) {

    const { userid } = req.cookies
    if (!userid) {
        return res.json({ code: 1 })
    }
    User.findOne({ _id: userid }, _filter, function (err, doc) {
        if (err) {
            return res.json({ code: 1, msg: '后端出错了' })
        }
        if (doc) {
            return res.json({ code: 0, data: doc })
        }
    })
})

module.exports = Router;