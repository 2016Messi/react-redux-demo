import React from 'react'
// import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
@connect(state=>state.chat)
@withRouter
class NavLinkBar extends React.Component{


    render(){
        const navList = this.props.data.filter(v=>!v.hide);
        console.log(this.props)
        return (
            <div>
                <TabBar>
                    {navList.map(v=>(
                        <TabBar.Item 
                        badge={v.path==='/msg'?this.props.unread:null}
                        key	= {v.icon}
                        title={v.text}
                        icon={require(`./img/${v.icon}.png`)}
                        selectedIcon={require(`./img/${v.icon}-active.png`)}
                        selected={this.props.location.pathname===v.path}
                        onPress={()=>this.props.history.push(v.path)}
                    >
                    </TabBar.Item>
                    ))}
                </TabBar>
            </div>
        )
    }
}

export default NavLinkBar