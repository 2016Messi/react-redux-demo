const express = require('express');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/user',userRouter);

// app.get('/',function(req,res){
//     res.send('<h1>hello world</h1>');
// })

app.listen(9093,function(){
    console.log('Node app start at port 9093');
})
 