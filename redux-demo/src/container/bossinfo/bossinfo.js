import React from 'react'
import { NavBar, InputItem, TextareaItem, Button, WhiteSpace } from 'antd-mobile'
import AvatarSelector from './../../component/avatarSelector/avatarSelector'
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
        this.onChange = this.onChange.bind(this)
    }
    onChange(type, val) {
        this.setState({
            [type]: val
        })
    }

    render() {
        return (
            <div>
                <NavBar mode='dark'>BOSS</NavBar>
                {/* 修改头像 */}
                <AvatarSelector selectorAvatar={(avatarName) => {
                    this.setState({
                        avatar: avatarName
                    })
                }} ></AvatarSelector>
                    <WhiteSpace></WhiteSpace>
                <InputItem onChange={(val) => this.onChange('title', val)}>招聘职位</InputItem>
                <InputItem onChange={(val) => this.onChange('company', val)}>公司名称</InputItem>
                <InputItem onChange={(val) => this.onChange('money', val)}>职位薪资</InputItem>
                <TextareaItem autoHeight={true} title="职位描述" onChange={(val) => this.onChange('desc', val)} row={7}></TextareaItem>
                <Button type='primary'>保存</Button>


            </div>
        )
    }
}
export default Bossinfo;
