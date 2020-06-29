import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {
    NavBar, // 頭頂導航
    List, // 列表 container
    InputItem, // 輸入框
    Button, // 按鈕
    TextareaItem // 多行輸入框
} from 'antd-mobile';

import HeaderSelector from './../header-selector/header-selector'

export default class BossInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            avatar: '',
            post: '',
            info: '',
            company: '',
            salary: ''
        }
    }

    // 資料庫存檔名就好 header:string
    handleAvatar = (header) => {
        this.setState({
            avatar: header
        })
    }

    handleChange = (attribute, val) => {
        this.setState({
            [attribute]: val
        })
    }

    save = () => {
        this.props.update(this.state)
    }

    render() {
        const { avatar, msg } = this.props.user
        if (avatar) {
            return <Redirect to='boss' />
        }
        return (
            <div>
                <NavBar>老闆訊息完善</NavBar>
                <HeaderSelector handleAvatar={this.handleAvatar} />
                <List>
                    <InputItem placeholder="請輸入招募職位" onChange={(val) => { this.handleChange('post', val) }}>招募職位</InputItem>
                    <InputItem placeholder="請輸入公司名稱" onChange={(val) => { this.handleChange('company', val) }}>公司名稱</InputItem>
                    <InputItem placeholder="請輸入職位薪資" onChange={(val) => { this.handleChange('salary', val) }}>職位薪資</InputItem>
                    <TextareaItem placeholder="請輸入職位要求" title="職位要求" rows={3} autoHeight onChange={(val) => { this.handleChange('info', val) }} />
                </List>
                {msg ? <div className="error-msg">{msg}</div> : null}
                <Button type="primary" onClick={this.save}>保存</Button>
            </div>
        )
    }
}