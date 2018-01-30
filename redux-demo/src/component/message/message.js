import React from 'react'

class Msg extends React.Component{

    render(){
        console.log(this.props)
        return(
            <div>消息列表 </div>
        )
    }
}

export default Msg;
