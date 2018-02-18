import React from 'react'
import { Route, Switch  } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import NavLinkBar from './../navlink/navlink'
import Boss from './../boss/boss'
import Genius from './../genius/genius'
import Msg from './../message/message'
import User from './../center/center' 
import { getMsgList, sendMsg,recvMsg } from './../../redux/chat.redux'


@connect(state => state, { getMsgList, sendMsg,recvMsg })




class Dashboard extends React.Component {

    componentDidMount(){
		if (!this.props.chat.chatmsg.length) {
			this.props.getMsgList()
			this.props.recvMsg()
		}
    }



    render() {
        const user = this.props.user;
        const navList = [{
            path: '/boss',
            text: '牛人',
            icon: 'boss',
            title: '牛人列表',
            component: Boss,
            hide: user.type === 'genius'
        },
        {
            path: '/genius',
            text: 'boss',
            icon: 'job',
            title: 'BOSS列表',
            component: Genius,
            hide: user.type === 'boss'
        },
        {
            path: '/msg',
            text: '消息',
            icon: 'msg',
            title: '消息列表',
            component: Msg
        }, {
            path: '/me',
            text: '我',
            icon: 'user',
            title: '个人中心',
            component: User
        }
        ]
        const myTitle = 
           this.props.location.pathname==='/login' ?
           null:navList.find(v => v.path === this.props.location.pathname).title
        return (
            <div>
                <header>
                    <NavBar mode='dard'>{myTitle}</NavBar>
                </header>
                <article>
                    <Switch>
                        {navList.map((v,i)=>(
                            <Route key={i} path={v.path} component={v.component}  />
                        ))}
                    </Switch>
                </article>
                <footer>
                    <NavLinkBar data={navList}></NavLinkBar>
                </footer>
            </div>
        )
    }
}

export default Dashboard;