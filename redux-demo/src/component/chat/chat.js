import React from 'react'
import io from 'socket.io-client'
import { List, InputItem } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg,recvMsg } from './../../redux/chat.redux'

 

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
        this.props.getMsgList()
        this.props.recvMsg()
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
        console.log(1);

        // console.log(this.props)
        return (
            <div>
                {this.state.msg.map((v, i) => {
                    return <p key={i} >{v}</p>
                })}
                <div className="stick-footer">你点击的用户是：{this.props.match.params.user}
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