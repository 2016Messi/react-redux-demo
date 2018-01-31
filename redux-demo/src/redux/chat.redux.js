import axios from 'axios'

//获取用户聊天列表
const MSG_LIST = 'MSG_LIST'
//获取信息
const MSG_RECV = 'MSG_RECV'
//获取已读
const MSG_READ = 'MSG_READ'

const initState = {
    chatmsg: [],
    unread:0
}

export function chat(state=initState,action){
    switch(action.type){
        case  MSG_LIST:
        case  MSG_RECV:
        case  MSG_READ:
        default : return state;
    }

}

export function getMsgList(data){
    return dispatch=>{
        res=>{
            if(res.state===200 && res.data.code===0){
                dispatch()
            }
        }
    }
}