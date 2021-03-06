import React from 'react'
import Logo from './../../component/logo/logo'
import { Button, WingBlank, WhiteSpace, InputItem, List } from 'antd-mobile'
import {  login } from '../../redux/user.redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import myFrom from './../../component/myfrom/myfrom'
@connect(state =>state.user,{login})
@myFrom
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);        
    }
    register() {
        console.log(this.props)
        this.props.history.push('/register')
    }
    login(){
        this.props.login(this.props.state)
    }
 
    render() {
        return (
            <div>
                {(this.props.redireactTo&&this.props.redireactTo!=='/login')?<Redirect to={this.props.redireactTo} />:null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                    {this.props.msg }
                        <InputItem onChange={val=>this.props.handleChange(val,'user')}  >用户</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem onChange={val=>this.props.handleChange(val,'pwd')}  >密码</InputItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    
                    <Button type="primary" onClick={this.login} >登陆</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }

}