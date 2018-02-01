import React from 'react'
import { Card, WhiteSpace } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter
class UserCard extends React.Component {
    handleClick(val){
        this.props.history.push(`/chat/${val.user}`)
    }
    render() {
        const datas = this.props.cardData;
        const cards = datas.map((val) => (
            val.avatar ? (
                <div key={val._id} 
                    onClick={()=>this.handleClick(val)}
                >
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
                </div>) : null

        ))
        return (
            <div>
                {cards}
            </div>
        )
    }
}

export default UserCard