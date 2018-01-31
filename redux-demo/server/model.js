

const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/redux' 
mongoose.connect(DB_URL); 

const models = {
    'user':{
        'user':{'type':String, 'require':true},
        'pwd':{'type':String, 'require':true},
        'type':{'type':String, 'require':true},
        // 头像
        'avatar':{'type':String},
        // 个人简介
        'desc':{'type':String},
        // 职位名
        'title':{'type':String},
        //BOSS字段
        'company':{'type':String},
        'money':{'type':String}
    },
    'chat':{
        'chatid':{'type':String, 'require':true},    //聊天人id标识
        'from':{'type':String, 'require':true},     //信息来源
        'to':{'type':String, 'require':true},       //信息发给谁
        'read':{'type':String,'default':fasle},      //初始状态未读
        'content':{'type':String, 'require':true,'default':true},       //信息内容   
        'create_time':{type:Number,default:new Date().getTime()}        //发送的时间
    }
}

for(let m in models){
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel:function(name){
        return mongoose.model(name);
    }
}