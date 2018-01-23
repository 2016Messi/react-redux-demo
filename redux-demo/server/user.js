const express = require('express');
const Router = express.Router();
const untils = require('utility')
const model = require('./model.js');
const User = model.getModel('user');
const _filter = {'pwd':0,'_v':0}


Router.get('/list',function(req,res){
    
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

        const userModel = new User({user,type,pwd:untils.md5(untils.md5(pwd))})

        userModel.save(function(e,d){    
            if(e){
                return res.json({code:0,msg:'后端出错了'})
            }
            const {user, type, _id} = d;
            res.cookie('userid',_id)
            return res.json({code:0,data:{user,type,_id}})
        })
    })
})

Router.post('/login',function(req,res){
    const {user,pwd} = req.body;
    User.findOne({user,pwd:untils.md5(untils.md5(pwd))},_filter,function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'用户名或密码错误'})
        }
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc}) 
    })
})   

Router.get('/info',function(req,res){

    const {userid} = req.cookies
    if(!userid){
        return res.json({code:1})
    }
    User.findOne({_id:userid},_filter,function(err,doc){
        if(err){
            return res.json({code:1,msg:'后端出错了'})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
})

module.exports  = Router;