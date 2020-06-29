import React, { Component } from 'react'
import {
    Card, // 卡片 
    WhiteSpace, // 上下留白
    WingBlank, // 左右留白
} from 'antd-mobile';
import { withRouter } from 'react-router-dom'

const Header = Card.Header
const Body = Card.Body

class UserList extends Component {

    render() {
        let { userList } = this.props
        // 把還沒完善資訊的使用者濾掉
        userList = userList.filter(user => user.avatar)

        return (

            // 將內容往中間推 因為上下 header.footer都固定 
            <WingBlank style={{ marginBottom: 50, marginTop: 45 }}>
                <WhiteSpace />
                {userList.map((user) => (
                    <Card key={user._id} onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                        <Header extra={user.account} thumb={require(`./../../assets/imgs/${user.avatar}.png`)} />
                        <Body>
                            <div>職位：{user.post}</div>
                            {user.company ? <div>公司：{user.company}</div> : null}
                            {user.salary ? <div>月薪：{user.salary}</div> : null}
                            <div>描述：{user.info}</div>
                        </Body>
                    </Card>
                ))}
            </WingBlank>

        )
    }
}


export default withRouter(UserList)