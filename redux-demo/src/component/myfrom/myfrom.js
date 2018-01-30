import React from 'react'

export default function myFrom(Comp){
    return class WrapperComp extends React.Component{
        constructor(props){
            super(props);
            this.state={}
            this.handleChange = this.handleChange.bind(this)
        }
        handleChange(val,type){
            // console.log(val,type)
            this.setState({
                [type]:val
            })
        }
        render(){
            return (
                <Comp {...this.props} handleChange={this.handleChange} state={this.state} ></Comp>
            )
        }
    }
}