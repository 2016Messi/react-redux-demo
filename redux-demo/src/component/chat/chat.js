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
        // console.log(this.state.msg)

        //页面加载后获取聊天列表
        // this.props.getMsgList()
        // this.props.recvMsg()
    }

    handleSubmit() {
        // console.log(this.props.state);
     
        this.setState({ text: '' })
        const from = this.props.user._id;   //来自  
        const to = this.props.match.params.user;             //发送至
   
        const msg = this.state.text;     //信息内容
        this.props.sendMsg({from,to,msg})
    }

    render() {

        console.log(this.props)
        const user = this.props.match.params.user;
        // console.log(this.props)
        return (
            <div id='chat-page'>
                <NavBar mode='dark'>
                    {this.props.match.params.user}  
                </NavBar>
                {this.props.chat.chatmsg.map((v, i) => {
                    return v.from==user?
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