import React, { Component } from 'react'
import {
    List, // 列表 container
    Grid //表格
} from 'antd-mobile';


export default class HeaderSelector extends Component {
    constructor(props) {
        super(props)

        // icon列表
        this.listHeader = []
        // 將 icon 及 test 塞入數組
        for (let i = 0; i < 20; i++) {
            this.listHeader.push({
                text: `頭像${i + 1}`,
                icon: require(`./../../assets/imgs/頭像${i + 1}.png`)
            })
        }

        // 當前選中的頭像base64
        this.state = {
            icon: null
        }
    }

    // 參數將 el 解構
    handleOnClick = ({ icon, text }) => {
        const { handleAvatar } = this.props
        // 更新當前state
        this.setState({
            icon
        })
        // 更新 parent state
        handleAvatar(text)
    }

    render() {
        const { icon } = this.state
        return (
            <List renderHeader={() => !icon ? '請選擇頭像' : (
                <div>
                    <span>已選擇頭像:</span>
                    <img src={icon} alt="avatar" />
                </div>
            )} >
                <Grid data={this.listHeader} columnNum={5} onClick={(el) => { this.handleOnClick(el) }} />
            </List>
        )
    }
}