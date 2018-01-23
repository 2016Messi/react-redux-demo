import axios from 'axios' 
import { getRedirectPath } from '../until'
const REGISTER_SUCCESS = "REGISTER_SUCCESS"
const ERROR_MSG = "ERROR_MSG"

const initState = {
    redireactTo:'',
    isAuth:false,
    user: '',
    pwd:'',
    repeatpwd:'',   
    type:''
}
export function user(state=initState,action){
  
    switch(action.type){
        case REGISTER_SUCCESS: 
            return {...state,msg:'',isAuth:true,redireactTo:getRedirectPath(action.playdata),...action.playdata}
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
        default: 
            return state    
    }
}
export function text(){
    alert(1);
}

function registerSucess(data){
    return {type:REGISTER_SUCCESS,playdata:data};
}

function registerError(msg){
    return {msg,type:ERROR_MSG}
}
export function register({user,pwd,repeatpwd,type}){
 
    if(!user||!pwd){
        return registerError("用户名密码必须输入")
    }
    if(pwd!==repeatpwd){
        return registerError("您输入的密码不同")        
    }

    return dispatch=>{
        axios.post('/user/register',{user,pwd,type}).then(
            res=>{
                if(res.status===200&&res.data.code===0){
                    dispatch(registerSucess({user,pwd,type}))
                }else{
                    dispatch(registerError(res.data.msg))
                }
            }
        )
    }
}