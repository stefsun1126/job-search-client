import React, { Component } from 'react'
import { List, Badge } from 'antd-mobile';


const Item = List.Item;
const Brief = Item.Brief;

// 返回個別chat_id最後的聊天訊息
function getLastMsgs(msgs, userId) {
    // 將每一組的最後一個訊息找出來變成一個對象 { chat_id1 : lastMsg }  , lastMsg { id , from , to .... , unReadCount }
    let lastMsgsObj = {}
    msgs.map((msg) => {
        // 如果是別人發給當前使用者的且未讀 , unReadCount 才能為1 
        if (msg.to === userId && !msg.read) {
            msg.unReadCount = 1
        } else {
            msg.unReadCount = 0
        }
        // 之前有沒有最後訊息
        const lastMsg = lastMsgsObj[msg.chat_id]

        // 之前沒最後訊息直接放屬性
        if (!lastMsg) {
            lastMsgsObj[msg.chat_id] = msg
        } else {
            // 保存之前的未讀統計值
            const unReadCount = lastMsg.unReadCount
            // 已經存在最後訊息 , 則比對 , 看誰在後面塞進去
            if (msg.basis.createTime > lastMsg.basis.createTime) {
                lastMsgsObj[msg.chat_id] = msg
            }
            // 最後再將新的累計未讀添加到分組的對象
            lastMsgsObj[msg.chat_id].unReadCount = unReadCount + msg.unReadCount
        }
        return null
    })

    // 單獨將lastMsg取出 , 上一步驟弄成對象只是為了方便比對
    const lastMsgsArr = Object.values(lastMsgsObj)

    // 將降序結果返回 
    return lastMsgsArr.sort((b, a) => {
        if (a.basis.createTime > b.basis.createTime) {
            return 1
        } else if (a.basis.createTime === b.basis.createTime) {
            return 0
        } else {
            return -1
        }
    })
}

/* 聊天列表 */
export default class Message extends Component {
    render() {
        const { user } = this.props
        const { users, chatMsgs } = this.props.msgList
        const lastMsgs = getLastMsgs(chatMsgs, user._id)
        return (
            <div>
                {/* 往上下推 不要讓navbar.footbar擋到 */}
                <List style={{ marginBottom: 50, marginTop: 45 }}>
                    {
                        lastMsgs.map((msg) => {
                            // 獲取聊天對象
                            const targetId = msg.to === user._id ? msg.from : msg.to
                            const target = users[targetId]
                            return (
                                <Item key={msg._id}
                                    arrow="horizontal"
                                    thumb={require(`./../../assets/imgs/${target.avatar}.png`)}
                                    onClick={() => this.props.history.push(`/chat/${targetId}`)}
                                    extra={<Badge text={msg.unReadCount} />}
                                >
                                    {target.account}
                                    <Brief>{msg.content}</Brief>
                                </Item>
                            )
                        })
                    }
                </List>
            </div>
        )
    }
}