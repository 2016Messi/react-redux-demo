import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter
class NavLinkBar extends React.Component{
    // static PropTypes = {
    //     data :PropTypes.array.isRequired
    // }
    render(){
        const navList = this.props.data.filter(v=>!v.hide);
  console.log(this.props)
        return (
            <div>
                <TabBar>
                    {navList.map(v=>(
                        <TabBar.Item 
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