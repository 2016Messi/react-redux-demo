import React from 'react'
import { NavBar, InputItem, TextareaItem, Button, WhiteSpace, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import AvatarSelector from './../../component/avatarSelector/avatarSelector'
import { updata } from './../../redux/user.redux'

@connect(state => state.user, { updata })
class Geniusinfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            title: '',
            desc: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
    }
    handleChange(type, val) {
        this.setState({
            [type]: val
        })
    }
    save() {
        var flag = 1;
        for (var key in this.state) {
            if (this.state[key] === '') {
                flag = 0;
                break;
            }
        }
        if (flag === 0) {
            Toast.info('请将信息补全')
        } else {
            this.props.updata(this.state)
        }
    }

    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redireactTo
        return (
            <div>
                {redirect && redirect !== path ? <Redirect to={redirect} /> : null}
                <NavBar mode='dark'>BOSS</NavBar>
                {/* 修改头像 */}
                <AvatarSelector selectorAvatar={(avatarName) => {
                    this.setState({
                        avatar: avatarName
                    })
                }} ></AvatarSelector>
                <WhiteSpace></WhiteSpace>
                <InputItem onChange={(val) => this.handleChange('title', val)}>求职岗位</InputItem>

                <TextareaItem autoHeight={true} title="个人简介" onChange={(val) => this.handleChange('desc', val)} row={7}></TextareaItem>
                <Button type='primary' onClick={this.save} >保存</Button>

            </div>
        )
    }
}
export default Geniusinfo;
