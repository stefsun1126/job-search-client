import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {
    NavBar, // 頭頂導航
    List, // 列表 container
    InputItem, // 輸入框
    WhiteSpace, // 上下留白
    WingBlank, // 左右留白
    Radio, // 單選框
    Button, // 按鈕
} from 'antd-mobile';

import Logo from './../logo/logo'

const ListItem = List.Item;
export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // 帳號
            account: '',
            // 密碼
            pwd: '',
            // 確認密碼
            confirmPwd: '',
            // 用戶類型
            // 0:應徵者 1:企業
            type: ''
        }
    }

    // 點選註冊
    register = () => {
        const { register } = this.props
        const { account, pwd, confirmPwd, type } = this.state
        register(account, pwd, confirmPwd, type)
    }

    // 切換到 /login
    toLogin = () => {
        this.props.history.replace('/login')
    }

    // 獲取輸入資訊
    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    }

    render() {
        // radio 用
        // checked antd提供的屬性 判斷radio是否被選取用
        const { type } = this.state
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
                        <InputItem placeholder="請再次輸入密碼" type="password" onChange={(val) => this.handleChange('confirmPwd', val)}>確認密碼：</InputItem>
                        <WhiteSpace />
                        <ListItem>
                            <span>用戶類型：&emsp;</span>
                            <Radio checked={type === "0"} onChange={() => this.handleChange('type', '0')} >&nbsp;應徵者</Radio>
                            &emsp;
                            <Radio checked={type === "1"} onChange={() => this.handleChange('type', '1')} >&nbsp;企業</Radio>
                        </ListItem>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.register}>註冊</Button>
                        <Button onClick={this.toLogin}>已有帳號</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}