import axios from 'axios' 
import { getRedirectPath } from '../until'
 
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = "ERROR_MSG"
const LOGIN_DATA = 'LOGIN_DATA'
const LOGOUT = 'LOGOUT'
const initState = {
    redireactTo:'',
    user: '',
    msg:'',
    type:''
}
export function user(state=initState,action){
    switch(action.type){
        case AUTH_SUCCESS: 
            return {...state,msg:'' ,redireactTo:getRedirectPath(action.playdata),...action.playdata}
        case ERROR_MSG:
            return {...state ,msg:action.msg}
        case LOGIN_DATA:
            return {...state ,...action.playdata}
        case LOGOUT:
            return {...initState, redireactTo:'/login' }
        default: 
            return state    
    }
}

function authSucess(data){
    return {type:AUTH_SUCCESS,playdata:data};
}
 
function msgError(msg){
    return {msg,type:ERROR_MSG}
}

//注册模块
export function register({user,pwd,repeatpwd,type}){
 
    if(!user||!pwd){
        return msgError("用户名密码必须输入")
    }
    if(pwd!==repeatpwd){
        return msgError("您输入的密码不同")        
    }

    return dispatch=>{
        axios.post('/user/register',{user,pwd,type}).then(
            res=>{
                if(res.status===200&&res.data.code===0){
                    dispatch(authSucess({user,type}))
                }else{
                    dispatch(msgError(res.data.msg))
                }
            }
        )
    }
}

//登陆模块
export function login({user,pwd}){
    if(!user||!pwd){
        return msgError('用户名密码必须输入')
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd}).then(
            res=>{
                if(res.status===200&&res.data.code===0){
                    dispatch(authSucess(res.data.data))
                }else{
                    dispatch(msgError(res.data.msg))
                }
            }
        )
    }
}

//保存登陆状态
export function loginData(LoginData){
    return {type:LOGIN_DATA,playdata:LoginData}
}

//保存用户信息
export function updata(data){
    return dispatch=>{
        axios.post('/user/updata',data)
        .then(res=>{
                if(res.status===200&&res.data.code===0){
                    dispatch(authSucess(Object.assign(data,res.data.data)))
                     
                }else{
                    dispatch(msgError(res.data.msg))
                }
            }
        )
    }
}

// 注销
export function logoutSubmit(){
    return {type:LOGOUT}
}
