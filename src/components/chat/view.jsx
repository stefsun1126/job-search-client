import React, { Component } from 'react'
import { NavBar, List, InputItem, Grid, Icon } from 'antd-mobile'

const Item = List.Item
/* 聊天室窗 */
export default class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: '',
            isShow: false
        }
        // cr. https://emojipedia.org/people/
        this.emojis = ['😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😗', '😚', '🤪', '😷', '😕']

    }

    // 掛載完後 將列表顯示在最下面
    componentDidMount() {
        window.scrollTo(0, document.body.scrollHeight)
    }

    // 當發完訊息更新完後也要將列表顯示在最下面
    componentDidUpdate() {
        window.scrollTo(0, document.body.scrollHeight)
    }

    // 離開時將訊息已讀掉
    componentWillUnmount = () => {
        const { user, match } = this.props
        const from = match.params.userid
        const to = user._id
        this.props.readMsgs(from, to)
    }

    // 發送訊息
    handleSend = () => {
        const { user, sendMsg } = this.props
        const from = user._id
        const to = this.props.match.params.userid
        const content = this.state.content
        sendMsg({ from, to, content })
        // 清除輸入框內容
        this.setState({ content: '' })
    }

    // 點擊表情框
    toggleShow = () => {
        const { isShow } = this.state
        this.setState({ isShow: !isShow })
        // 這個有ui component有bug , 隱藏在出現要重新 resize(還要異步)
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }

    // 點擊表情
    clickEmoji = (text) => {
        const { content } = this.state
        this.setState({
            content: content + text
        })
    }

    render() {
        const { user } = this.props
        let { users, chatMsgs } = this.props.msgList
        const { isShow } = this.state
        // 當前使用者_id
        const meId = user._id
        // 聊天對象 _id
        const targetId = this.props.match.params.userid

        // 確保消息資料已經抓到
        // 沒有的話先返回空白頁面 這之後再做看要返回怎樣的頁面
        if (!users[meId]) {
            return null
        }

        // 聊天對象帳號
        const targetAccount = users[targetId].account

        // 過濾聊天訊息 chatMsgs 目前是包含我跟所有對象的訊息
        // chat_id 聊天對象id的字串 用這個欄位判定
        const chat_id = [meId, targetId].sort().join('_')
        chatMsgs = chatMsgs.filter(msg => msg.chat_id === chat_id)

        // 獲取聊天對象的頭像
        const targetAvatar = require(`./../../assets/imgs/${users[targetId].avatar}.png`)

        return (
            <div id='chat-page'>
                <NavBar
                    className="sticky-am-header"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}

                >
                    {targetAccount}
                </NavBar>
                {/* 往上下推 不要讓navbar.輸入框擋到 */}
                <List style={{ marginBottom: 44, marginTop: 45 }}>
                    {chatMsgs.map((msg) => {
                        if (msg.from === targetId) {
                            // 別人發過來的
                            return (
                                <Item
                                    thumb={targetAvatar}
                                >
                                    {msg.content}
                                </Item>
                            )
                        } else {
                            // 自己發的
                            return (
                                <Item
                                    className='chat-me'
                                    extra='我'
                                >
                                    {msg.content}
                                </Item>
                            )
                        }
                    })}
                </List>

                {/* 雖然不是antd的tab-bar組件，但需要的style是一樣的，所以拿來用 */}
                <div className='am-tab-bar'>
                    <InputItem
                        placeholder="請輸入要發送的內容"
                        value={this.state.content}
                        onChange={(val) => this.setState({ content: val })}
                        onFocus={() => this.setState({ isShow: false })}
                        extra={
                            <span>
                                <span role="img" aria-label="face" style={{ marginRight: 5 }} onClick={this.toggleShow}>😃</span>
                                <span onClick={this.handleSend}>發送</span>
                            </span>
                        }
                    />
                    {isShow ? (
                        <Grid
                            data={
                                this.emojis.map((emoji) => (
                                    { text: emoji }
                                ))
                            }
                            isCarousel={true}
                            columnNum={8}
                            carouselMaxRow={4}
                            onClick={(el) => this.clickEmoji(el.text)}
                        />
                    ) : null}
                </div>
            </div>
        )
    }
}