import React from 'react'
import logoImg from './logo.png'

export default class logo extends React.Component{

    render(){
        const logoStyle={
            marginTop:'50px',
            textAlign:'center',
            marginBottom:'20px'
        }
 
        return(
            <div style={logoStyle}>
                <img src={logoImg} alt=""/>
            </div>
        )
    }

}