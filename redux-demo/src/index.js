import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { Button }  from 'antd-mobile'
import  reducer from './reducer.js'
import './config.js'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRouter from './component/authrouter/authrouter'
import Bossinfo from './container/bossinfo/bossinfo'
import Geniusinfo from './container/geniusinfo/geniusinfo'

const store = createStore(reducer,compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

class Index extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                <div>
                <AuthRouter></AuthRouter>
                    <Switch>
                        <Route path="/bossinfo" component={Bossinfo} ></Route>
                        <Route path="/geniusinfo" component={Geniusinfo} ></Route>                        
                        <Route path="/login" component={Login}></Route>
                        <Route path="/register" component={Register}></Route>     
                    </Switch>
                </div>
                </BrowserRouter>
            </Provider>
        )
    }
} 
ReactDom.render(<Index/>,document.getElementById('root'));