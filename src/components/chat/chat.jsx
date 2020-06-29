import { connect } from 'react-redux'

import view from './view'
import { sendMsg,readMsgs } from './../../redux/actions'

const Chat = connect(
    // state
    (state) => ({
        user: state.user,
        msgList: state.msgList
    }),
    // dispatch action
    {
        sendMsg,
        readMsgs
    }
)(view)

export default Chat