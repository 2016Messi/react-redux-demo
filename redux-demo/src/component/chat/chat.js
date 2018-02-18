import React from 'react'
import io from 'socket.io-client'
import {List,InputItem,NavBar,Icon, Grid} from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from './../../redux/chat.redux'
import {getChatId} from '../../until'

const Item = List.Item


@connect(state => state, { getMsgList, sendMsg, recvMsg })

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            msg: []
        }
    }
	componentDidMount(){
		if (!this.props.chat.chatmsg.length) {
			this.props.getMsgList()
			this.props.recvMsg()	
		}
	}

    handleSubmit() {
        this.setState({ text: '' })
        const from = this.props.user._id;   //来自  
        const to = this.props.match.params.user;             //发送至
        const msg = this.state.text;     //信息内容
        this.props.sendMsg({ from, to, msg })
    }

    render() {
        const userid = this.props.match.params.user
        const users = this.props.chat.users;
        if (!users[userid]) {
            return null
        }
        const chatid = getChatId(userid, this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid===chatid)
        
        return (
            <div id='chat-page'>
                <NavBar mode='dark'
                    icon={<Icon type="left" />}
                    onLeftClick={() => {
                        this.props.history.goBack()
                    }}
                >
                    {users[userid].name}
                </NavBar>
                        {console.log(chatmsgs)}
                {chatmsgs.map((v, i) => {
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
                     return v.from === userid ?
                        (<List key={i}>
                            <Item thumb={avatar}>{v.content}</Item>
                        </List>)
                        :
                        (<List key={i}>
                            <Item className='chat-me' extra={<img src={avatar} />} >{v.content}</Item>
                        </List>)
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