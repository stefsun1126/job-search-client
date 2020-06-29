import { connect } from 'react-redux'

import view from './view'
import { getUser } from './../../redux/actions'

const Main = connect(
    (state) => ({
        user: state.user,
        unReadMsgs: state.msgList.unReadMsgs
    }),
    {
        getUser
    }
)(view)


export default Main