import React from 'react'
import axios from 'axios'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'

class Boss extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        axios.get('/user/list?type=genius').then(
            res => {
                if (res.data.code === 0) {
                    this.setState({ data: res.data.data })
                }
            }
        )
    }
    render() {
        const datas = this.state.data
        const cards = datas.map((val) => (
            <div key={val._id}>
                <Card>
                    <Card.Header
                        title={val.user}
                        thumb={require(`./../img/${val.avatar}.png`)}
                        extra={<span>{val.title}</span>}
                    />
                    <Card.Body>
                        {val.desc.split('\n').map((v, i) => (
                            <div key={i}>{v}</div>
                        ))}
                    </Card.Body>
                    <Card.Footer content={val.company} extra={<div>{val.money}</div>} />
                </Card>
                <WhiteSpace />
            </div>
        ))
        return (
            <div>
                <WingBlank>
                    <WhiteSpace></WhiteSpace>
                    {cards}
                </WingBlank>
            </div>
        )
    }
}

export default Boss;
