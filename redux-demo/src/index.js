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

const store = createStore(reducer,compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

class Index extends React.Component {
    render() {
        return (
            <Provider>
                <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/"  ></Route>
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