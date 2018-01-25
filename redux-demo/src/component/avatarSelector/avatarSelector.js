import React from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'
class AvatarSelector extends React.Component {

    static PropTypes = {
        selectorAvatar : PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const avatarList = 'boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra'
            .split(',')
            .map(val => ({
                icon: require(`./../img/${val}.png`),
                text: val
            }))
        const gridHeader = this.state.icon ?
            <div>
                <span>已选择头像 </span >
                <img src={this.state.icon} style={{ width: 20 }} alt="" />
            </div>
            : '请选择一个头像'

        return (
            <div>
                <List renderHeader={() => gridHeader}>
                    <Grid
                        data={avatarList}
                        columnNum={5}
                        onClick={elm => {
                            this.props.selectorAvatar(elm.text)
                            this.setState(elm)
                        }} />
                </List>
            </div>
        )
    }
}
export default AvatarSelector