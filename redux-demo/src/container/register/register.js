import React from 'react'
import Logo from './../../component/logo/logo'
import { Button, WingBlank, WhiteSpace, InputItem, List, Radio } from 'antd-mobile'

export default class Register extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            user : '',
            pwd : '' ,
            repeatpwd :'',
            type :'genius'
        }
        this.getRegisterMes=this.getRegisterMes.bind(this);
    }
    getRegisterMes(){
        console.log(this.state)
    }
    handleChange(val,type){
        this.setState({
            [type]:val
        })
    }
    render(){
        const RadioItem = Radio.RadioItem        
        return (
            <div>
                <Logo></Logo>
                <List>
                    <InputItem onChange={val=>this.handleChange(val,'user')} >用户名</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <InputItem onChange={val=>this.handleChange(val,'pwd')} type='password'>密码</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <InputItem onChange={val=>this.handleChange(val,'repeatpwd')} type='password'>确认密码</InputItem>                
                    <WhiteSpace></WhiteSpace>    
                    <RadioItem checked={this.state.type==='genius'} onChange={()=>this.handleChange("genius",'type')} >
                        牛人
                    </RadioItem>
       
                    <RadioItem  checked={this.state.type==='boss'} onChange={()=>this.handleChange("boss",'type')}>
                        BOSS
                    </RadioItem>
                </List>
                <WhiteSpace></WhiteSpace>
                <Button type="primary" onClick={this.getRegisterMes}>注册</Button>

            </div> 
        )
    }

}