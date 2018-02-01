import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
 
import  reducer from './reducer.js'
import './config.js'
import Login from './container/login/login'
import Register from './container/register/register' 
import AuthRouter from './component/authrouter/authrouter'
import Bossinfo from './container/bossinfo/bossinfo'
import Geniusinfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
import './index.css'

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
                        <Route path="/chat/:user" component={Chat}></Route>                              
                        <Route component={Dashboard}></Route>
                    </Switch>
                </div>
                </BrowserRouter>
            </Provider>
        )
    }
} 

ReactDom.render(<Index/>,document.getElementById('root'));