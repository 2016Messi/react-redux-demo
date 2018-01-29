import React from 'react'
import { WhiteSpace, WingBlank } from 'antd-mobile'
import { connect } from 'react-redux'
import { getUserList } from './../../redux/charuser.redux'
import UserCard from './../usercard/usercard'
@connect(state=>state.chatuser,{getUserList})

class Boss extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []  
        }
    }
    componentDidMount() {
        this.props.getUserList('genius')
    }
    render() {
        const datas = this.props.userlist
        return (
            <div>
                <WingBlank>
                    <WhiteSpace></WhiteSpace>
                    <UserCard cardData={datas}></UserCard>
                </WingBlank>
            </div>
        )
    }
}

export default Boss;
