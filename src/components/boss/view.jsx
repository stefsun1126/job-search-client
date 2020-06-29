import React, { Component } from 'react'
import { List } from 'antd-mobile';


import UserList from './../user-list/user-list'

export default class Boss extends Component {

    componentDidMount = () => {
        this.props.getUserList('0')
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