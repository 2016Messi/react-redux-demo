import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

@withRouter
export default class Authrouter extends React.Component {

    componentWillMount() {
        const publicList = ['/login','/register'];
        const pathName = this.props.location.pathname;
        if(publicList.includes(pathName)){
            return null;
        }
        //获取用户信息
    
        axios.get('/user/info').
            then(res => {
                if(res.status === 200){
                    if(res.data.code === 0){
                        console.log('登陆成功')
                    }else{
                        console.log(this.props.history);
                        this.props.history.push('/login')
                    }
                    console.log(res.data);
                }
            }
            );

    }

    render() {
        return (
            <div>11</div>
        )
    }
}