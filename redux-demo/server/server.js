const express = require('express');
const model = require('./model.js');

const Chat = model.getModel('chat');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

//work with express 
const server = require('http').Server(app)
const  io = require('socket.io')(server);

io.on('connection',function(socket){
    socket.on('sendmsg',function(data){
        const {from , to, msg} = data;
        const chatid = [from,to].sort().join('_');
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            io.emit('recvmsg',Object.assign({},doc._doc))
        })
        console.log(data)
    })
})

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/user',userRouter);

// app.get('/',function(req,res){
//     res.send('<h1>hello world</h1>');
// })

server.listen(9093,function(){
    console.log('Node app start at port 9093');
})
 