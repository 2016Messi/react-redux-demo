import axios from 'axios' 
import { getRedirectPath } from '../until'
const REGISTER_SUCCESS = "REGISTER_SUCCESS"
const ERROR_MSG = "ERROR_MSG"
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_DATA = 'LOGIN_DATA'

const initState = {
    redireactTo:'',
    isAuth:false,
    user: '',
    type:''
}
export function user(state=initState,action){
    switch(action.type){
        case REGISTER_SUCCESS: 
            return {...state,msg:'',isAuth:true,redireactTo:getRedirectPath(action.playdata),...action.playdata}
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
        case LOGIN_DATA:
            return {...state ,...action.playdata}
        case LOGIN_SUCCESS:        
            return {...state,msg:'',isAuth:true,redireactTo:getRedirectPath(action.playdata),...action.playdata}            
        default: 
            return state    
    }
}

export function loginData(LoginData){
    return {type:LOGIN_DATA,playdata:LoginData}
}

export function login({user,pwd}){
    if(!user||!pwd){
        return msgError('用户名密码必须输入')
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd}).then(
            res=>{
                if(res.status===200&&res.data.code===0){
                    dispatch(loginSuccess(res.data.data))
                }else{
                    dispatch(msgError(res.data.msg))
                }
            }
        )
    }
}

function registerSucess(data){
    return {type:REGISTER_SUCCESS,playdata:data};
}
function loginSuccess(data){
    return {type:LOGIN_SUCCESS,playdata:data}
}
function msgError(msg){
    return {msg,type:ERROR_MSG}
}
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
                    dispatch(registerSucess({user,type}))
                }else{
                    dispatch(msgError(res.data.msg))
                }
            }
        )
    }
}