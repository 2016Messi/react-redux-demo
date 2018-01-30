import React from 'react'
import io from 'socket.io-client'
import { List,InputItem } from 'antd-mobile'
 
const socket = io('ws://localhost:9093')

 
class Chat extends React.Component{
    constructor(props){
        super(props);
       this.state={
           text:''
       }
    }
    componentDidMount(){
    }

    handleSubmit(){
        // console.log(this.props.state);
        socket.emit('sendmsg',{text:this.state.text})
        this.setState({text:''})
        
    }

    render(){
        // console.log(this.props)
        return(
            
            <div className="stick-footer">你点击的用户是：{this.props.match.params.user}
                <List>
                    <InputItem
                        placeholder='请输入'
                        onChange = {val=>this.setState({text:val})}                        
                        value = {this.state.text}
                        extra = {<span onClick={()=>this.handleSubmit()} > 发送 </span>}
                    >
                    
                    </InputItem>
                </List>
            </div>
        )
    }
}
export default Chat;