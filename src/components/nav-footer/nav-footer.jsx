import React, { Component } from 'react'
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom'

const Item = TabBar.Item

class NavFooter extends Component {
    render() {
        let { navList, unReadMsgs } = this.props
        const path = this.props.location.pathname

        navList = navList.filter(nav => !nav.hide)
        return (
            <TabBar>
                {navList.map((nav, key) => (
                    <Item key={key}
                        title={nav.text}
                        icon={{ uri: require(`./imgs/${nav.icon}.png`) }}
                        badge={nav.path === '/message' ? unReadMsgs : 0}
                        selectedIcon={{ uri: require(`./imgs/${nav.icon}-selected.png`) }}
                        selected={path === nav.path}
                        onPress={() => { this.props.history.replace(nav.path) }}
                    />
                ))}
            </TabBar>
        )
    }
}


// 暴露使用withRouter包裝過的NavFooter
// 包裝後的 NavFooter 會有路由組件的屬性 history./location/match
export default withRouter(NavFooter)