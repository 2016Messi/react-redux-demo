import React from 'react'
import { NavBar, InputItem, TextareaItem, Button, WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import AvatarSelector from './../../component/avatarSelector/avatarSelector'
import { updata } from './../../redux/user.redux'

@connect(state => state.user, { updata })
class Bossinfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            title: '',
            company: '',
            money: '',
            desc: ''
        }
        this.onChange = this.handleChange.bind(this)
    }
    handleChange(type, val) {
        this.setState({
            [type]: val
        })
    }

    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redireactTo
        return (
            <div>
                {redirect&&redirect!==path? <Redirect to={redirect} />:null}
                <NavBar mode='dark'>BOSS</NavBar>
                {/* 修改头像 */}
                <AvatarSelector selectorAvatar={(avatarName) => {
                    this.setState({
                        avatar: avatarName
                    })
                }} ></AvatarSelector>
                <WhiteSpace></WhiteSpace>
                <InputItem onChange={(val) => this.handleChange('title', val)}>招聘职位</InputItem>
                <InputItem onChange={(val) => this.handleChange('company', val)}>公司名称</InputItem>
                <InputItem onChange={(val) => this.handleChange('money', val)}>职位薪资</InputItem>
                <TextareaItem autoHeight={true} title="职位描述" onChange={(val) => this.handleChange('desc', val)} row={7}></TextareaItem>
                <Button type='primary' onClick={() => this.props.updata(this.state)} >保存</Button>
            </div>
        )
    }
}
export default Bossinfo;
