import React from 'react'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import browserCookie from 'browser-cookies'
import { Redirect } from 'react-router-dom'
import { logoutSubmit } from './../../redux/user.redux'


const ListItem = List.Item
const Brief = List.Item.Brief
@connect(state => state.user, { logoutSubmit })
class User extends React.Component {
    constructor(props) {
        super(props)

        this.logout = this.logout.bind(this);
    }

    logout() {
        const myAlert = Modal.alert;
        myAlert('注销', '您确认注销登录吗？', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
                text: '确认', onPress: () => {
                    browserCookie.erase('userid')
                    this.props.logoutSubmit()
                }

            }
        ])

    }
    render() {
        console.log(this.props)
        // const{ myDesc, myImg, myMoney, myMsg } = this.props.
        // const myMsg = this.props.type === 'boss' ? this.props.company : null        
        // const myImg = this.props.avatar ? <img style={{ width: 50 }} src={require(`./../img/${this.props.avatar}.png`)} alt="" /> : null;
        // const myDesc = this.props.desc?this.props.desc.split('\n').map((v,i)=><Brief key={i} >{v}</Brief>):null;
        // const myMoney = this.props.money? <Brief>薪资:{this.props.money}</Brief>:null;
        return this.props.user ? (
            <div>
                <Result
                    img={<img style={{ width: 50 }} src={require(`./../img/${this.props.avatar}.png`)} alt="" />}
                    title={this.props.user}
                    message={this.props.company} />
                <List renderHeader={() => '简介'}>
                    <ListItem multipleLine={true}>
                        {this.props.title}
                        {this.props.desc.split('\n').map((v, i) => <Brief key={i} >{v}</Brief>)}
                        {<Brief>薪资:{this.props.money}</Brief>}
                    </ListItem>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <ListItem style={{ zIndex: 1 }} onClick={this.logout}  >
                        退出登录
                    </ListItem>
                </List>
            </div>
        ) : <Redirect to='/login' />    
    }
}

export default User;