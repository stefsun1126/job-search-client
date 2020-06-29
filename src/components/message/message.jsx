import { connect } from 'react-redux'

import view from './view'


const Message = connect(
    (state) => ({
        user: state.user,
        msgList: state.msgList
    }),
    {

    }
)(view)


export default Message