import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import Login from './components/login/login'
import Register from './components/register/register'
import Main from './components/main/main'
import store from './redux/store'
import './assets/css/index.less'

// socket
// import './socket/socket'

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            {/* 有三個一級路由 , 然後頁面一次只能使用顯示一個 component , 所以要使用 Switch 切換 */}
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                {/* 默認路由 */}
                {/* 當收到收到的路由不是 /login or /register 就默認這個路由 */}
                <Route component={Main} />
            </Switch>
        </HashRouter>
    </Provider>

),
    document.getElementById('root')
)