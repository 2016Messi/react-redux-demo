import React from 'react'
import io from 'socket.io-client'
import { List, InputItem, NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg,recvMsg } from './../../redux/chat.redux'

const Item = List.Item
 

@connect(state => state, { getMsgList, sendMsg,recvMsg })

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            msg: []
        }
    }
    componentDidMount() {
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }

    }

    handleSubmit() {     
        this.setState({ text: '' })
        const from = this.props.user._id;   //来自  
        const to = this.props.match.params.user;             //发送至
   
        const msg = this.state.text;     //信息内容
        this.props.sendMsg({from,to,msg})
    }

    render() {

        console.log(this.props)
        const userid = this.props.match.params.user;
        const user = this.props.chat.users;
            if(!user[userid]){
                return null
            }
        return (
            <div id='chat-page'>
                <NavBar mode='dark'>
                    {user[userid].name}
                </NavBar>
                {this.props.chat.chatmsg.map((v, i) => {
                    return v.from===userid?
                    <List key={i}>
                        <Item>{v.content}</Item>
                    </List>
                    :
                    <List key={i}>
                    <Item className='chat-me' extra={'avatar'} >{v.content}</Item>
                </List>
                })}



                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder='请输入'
                            onChange={val => this.setState({ text: val })}
                            value={this.state.text}
                            extra={<span onClick={() => this.handleSubmit()} > 发送 </span>}
                        >

                        </InputItem>
                    </List>
                </div>
            </div>

        )
    }
}
export default Chat;