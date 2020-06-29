import React, { Component } from 'react'
import { WhiteSpace } from 'antd-mobile';

import logo from './logo.png'
import './logo.less'

export default class Logo extends Component {
    render() {
        return (
            <div className="container">
                <WhiteSpace />
                <img
                    className="container__logo"
                    src={logo}
                    alt="logo" />
                <WhiteSpace />
            </div>
        )
    }
}