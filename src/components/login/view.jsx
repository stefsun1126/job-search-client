import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {
    NavBar, // 頭頂導航
    List, // 列表 container
    InputItem, // 輸入框
    WhiteSpace, // 上下留白
    WingBlank, // 左右留白
    Button // 按鈕
} from 'antd-mobile';

import Logo from './../logo/logo'

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // 帳號
            account: '',
            // 密碼
            pwd: ''
        }
    }

    // 點選登入
    login = () => {
        const { login } = this.props
        const { account, pwd } = this.state
        login(account, pwd)
    }

    // 切換到 /register
    toRegister = () => {
        this.props.history.replace('/register')
    }

    // 獲取輸入資訊
    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    }

    render() {
        const { msg, redirectTo } = this.props.user
        if (redirectTo) {
            return <Redirect to={redirectTo} />
        }
        return (
            <div>
                <NavBar>&nbsp;0&nbsp;4</NavBar>
                <Logo />
                <WingBlank size="lg">
                    <List>
                        {msg ? <div className="error-msg">{msg}</div> : null}
                        <WhiteSpace />
                        {/* input antd 有提供 onChange事件 會把輸入的值直接當參數傳到回調函數 */}
                        <InputItem placeholder="請輸入帳號" onChange={(val) => this.handleChange('account', val)}>帳&emsp;&emsp;號：</InputItem>
                        <WhiteSpace />
                        <InputItem placeholder="請輸入密碼" type="password" onChange={(val) => this.handleChange('pwd', val)}>密&emsp;&emsp;碼：</InputItem>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.login}>登入</Button>
                        <Button onClick={this.toRegister}>尚未註冊</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}