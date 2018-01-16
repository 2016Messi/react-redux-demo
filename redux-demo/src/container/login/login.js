import React from 'react'
import Logo from './../../component/logo/logo'
import { Button, WingBlank, WhiteSpace, InputItem, List } from 'antd-mobile'

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
    }
    register() {
        console.log(this.props)
        this.props.history.push('/register')
    }
    render() {
        return (
            <div>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem>用户</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem>密码</InputItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    
                    <Button type="primary">登陆</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }

}