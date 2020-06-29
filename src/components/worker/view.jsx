import React, { Component } from 'react'
import { List } from 'antd-mobile';

import UserList from './../user-list/user-list'

export default class Worker extends Component {

    componentDidMount = () => {
        this.props.getUserList('1')
    }

    render() {
        const { userList } = this.props
        return (
            <List>
                <UserList userList={userList} />
            </List>
        )
    }
}