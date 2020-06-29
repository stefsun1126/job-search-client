import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import { NavBar } from 'antd-mobile';


import BossInfo from './../boss-info/boss-info'
import WorkerInfo from './../worker-info/worker-info'
import { getRedirectTo } from './../../utils/index'
import Boss from './../boss/boss'
import Worker from './../worker/worker'
import Message from './../message/message'
import Personal from './../personal/personal'
import NotFound from './../not-found/not-found'
import NavFooter from './../nav-footer/nav-footer'
import Chat from './../chat/chat'

export default class Main extends Component {
    constructor(props) {
        super(props)
        // 子路由組件相關資訊
        // 元素順序不要改 因為下面有案找順序設隱藏
        this.navList = [
            {
                path: '/boss',
                component: Boss,
                title: '應徵者列表',
                icon: 'worker',
                text: '應徵者',
            },
            {
                path: '/worker',
                component: Worker,
                title: '老闆列表',
                icon: 'boss',
                text: '老闆',
            },
            {
                path: '/message',
                component: Message,
                title: '訊息列表',
                icon: 'message',
                text: '訊息',
            },
            {
                path: '/personal',
                component: Personal,
                title: '個人中心',
                icon: 'personal',
                text: '個人',
            }
        ]
    }

    componentDidMount = () => {
        const userId = Cookies.get('userid')
        const user = this.props
        // 如果 cookie 有值 , 且 user state 的 _id 沒值 , 則發請求獲取 user資料
        if (userId && !user._id) {
            this.props.getUser()
        }
    }

    render() {
        // 實現自動登入
        // 讀取 cookie 中的 userid
        const userId = Cookies.get('userid')
        // 如果 cookie 沒有 , 自動重定向到登入頁面
        if (!userId) {
            return <Redirect to="/login" />
        }
        // 如果 cookie 有 , 讀取 redux user state
        const { user, unReadMsgs } = this.props
        // user state 還沒值時 , 等等componentDidMount就會請求 , 這段期間就先顯示空 (null)
        if (!user._id) {
            return null
        } else {
            // 使用者如果直接請求 /bossinfo or /workerinfo 則直接根據路由返回頁面即可
            // 使用者如果請求 / 跟目錄 , 則依據 type , path 返回頁面
            let path = this.props.location.pathname
            if (path === '/') {
                path = getRedirectTo(user.type, user.avatar)
                return <Redirect to={path} />
            }
        }
        // 路徑
        const path = this.props.location.pathname
        // 根據 Path 去找出目前的 component , current 可能為空值 , 因為bossinfo.workerinfo不再navList裡
        const current = this.navList.find(e => e.path === path)

        // 根據用戶類型過濾 老闆 or 應徵者 列表
        if (current) {
            if (user.type === "0") {
                //應徵者 要顯示老闆列表
                this.navList[0].hide = true
            } else {
                //老闆 要顯示應徵者列表
                this.navList[1].hide = true
            }
        }

        return (
            <div>
                {current ? <NavBar className="sticky-am-header">{current.title}</NavBar> : null}
                <Switch>
                    {this.navList.map((e, k) => (<Route key={k} path={e.path} component={e.component} />))}
                    <Route path="/bossinfo" component={BossInfo} />
                    <Route path="/workerinfo" component={WorkerInfo} />
                    <Route path="/chat/:userid" component={Chat} />
                    <Route component={NotFound} />
                </Switch>
                {current ? <NavFooter navList={this.navList} unReadMsgs={unReadMsgs} /> : null}
            </div>
        )
    }
}