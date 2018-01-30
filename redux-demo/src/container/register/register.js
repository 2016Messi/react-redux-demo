import React from 'react'
import Logo from './../../component/logo/logo'
import { Button, WingBlank, WhiteSpace, InputItem, List, Radio } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register  } from './../../redux/user.redux'
import myFrom from './../../component/myfrom/myfrom'

@connect(state => (state.user), { register })
@myFrom

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.getRegisterMes = this.getRegisterMes.bind(this);
    }

    componentDidMount(){
        this.props.handleChange('genius','type')
    }

    //向reducer传入登录信息
    getRegisterMes() {
        this.props.register(this.props.state);
    }

    render() {
        const RadioItem = Radio.RadioItem

        return (
            <div>
                {this.props.redireactTo ? <Redirect to={this.props.redireactTo} /> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg}
                        <InputItem onChange={val => this.props.handleChange(val, 'user')} >用户名</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem onChange={val => this.props.handleChange(val, 'pwd')} type='password'>密码</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem onChange={val => this.props.handleChange(val, 'repeatpwd')} type='password'>确认密码</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <RadioItem checked={this.props.state.type === 'genius'} onChange={() => this.props.handleChange("genius", 'type')} >
                            牛人
                    </RadioItem>

                        <RadioItem checked={this.props.state.type === 'boss'} onChange={() => this.props.handleChange("boss", 'type')}>
                            BOSS
                    </RadioItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={this.getRegisterMes}>注册</Button>
                </WingBlank>


            </div>
        )
    }

}