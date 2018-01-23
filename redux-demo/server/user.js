const express = require('express');
const Router = express.Router();
const untils = require('utility')
const model = require('./model.js');
const User = model.getModel('user');

Router.get('/list',function(req,res){
    console.log(req);
    User.find({},function(err,doc){
        return res.json(doc);
    })
})

Router.post('/register',function(req,res){
 
    const {user,pwd,type} = req.body;
    User.findOne({user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }
        User.create({user,pwd:untils.md5(untils.md5(pwd)),type},function(e,d){
            if(e){
                return res.json({code:1,msg:'后端出错了'})
            }
            return res.json({code:0})
        })
    }
)
})

Router.get('/info',function(req,res){
    //用户有没有cookie
    return res.json({code:1})
})

module.exports  = Router;