import React from 'react'
import {connect} from 'react-redux' 
import {List,Badge} from 'antd-mobile'
 
@connect(
	state=>state
)
class Msg extends React.Component{

    render(){

        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v=>{
			msgGroup[v.chatid] = msgGroup[v.chatid] || []
			msgGroup[v.chatid].push(v)
		})
        const chatList = Object.values(msgGroup);
        console.log(chatList)
        return(
            <div>消息列表 </div>
        )
    }
}

export default Msg;
