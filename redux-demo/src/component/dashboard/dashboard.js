import React from 'react'
import { Route } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import  NavLinkBar  from './../navlink/navlink'

function Boss(){
    return <div>BOSS首页</div>
}
function Genius(){
    return <div>牛人首页</div>
}
function Msg(){
    return <div>消息列表页面</div>
}
function User(){
    return <div>个人中心页面</div>
}
@connect(state=>state,{})



class Dashboard extends React.Component{
    render(){
        const user =this.props.user;
        const navList = [{
            path:'/boss',
            text:'牛人',
            icon:'boss',
            title:'牛人列表',
            component:Boss,
            hide:user.type=='genius'
        },
        {
            path:'/genius',
            text:'boss',
            icon:'job',
            title:'BOSS列表',
            component:Genius,
            hide:user.type=='boss' 
        },
        {
            path:'/msg',
            text:'消息',
            icon:'msg',
            title:'消息列表',
            component:Msg
        },{
            path:'/me',
            text:'我',
            icon:'user',
            title:'个人中心',
            component:User
        }
        ]
        console.log(this.props);
        return (
            <div>
                <NavBar mode='dard'>{navList.find(v=>v.path===this.props.location.pathname).title}</NavBar>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default Dashboard;