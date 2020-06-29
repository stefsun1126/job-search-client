import React from 'react'
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile'
import Cookies from 'js-cookie'

const Item = List.Item
const Brief = Item.Brief

export default class Personal extends React.Component {

    logout = () => {
        Modal.alert('退出', '確定是否退出', [
            { 'text': '取消' },
            {
                'text': '確定',
                onPress: () => {
                    // 刪掉 cookies 的 userid
                    Cookies.remove('userid')
                    // init redux user state
                    this.props.resetUser()
                }
            }
        ])
    }

    render() {
        const { avatar, account, info, post, company, salary } = this.props.user
        return (
            // 將內容向下推
            <div style={{ marginBottom: 50, marginTop: 45 }}>
                <Result
                    img={<img src={require(`./../../assets/imgs/${avatar}.png`)} style={{ width: 50 }}
                        alt="header" />}
                    title={account}
                    message={company}
                />
                <List renderHeader={() => '相關訊息'}>
                    <Item multipleLine>
                        <Brief>職位: {post}</Brief>
                        <Brief>簡介: {info}</Brief>
                        {salary ? <Brief>薪資: {salary}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace />
                <List>
                    <Button type='warning' onClick={this.logout}>退出登入</Button>
                </List>
            </div>
        )
    }
}