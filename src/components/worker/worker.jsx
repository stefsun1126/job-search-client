import { connect } from 'react-redux'

import view from './view'
import { getUserList } from './../../redux/actions'

const Worker = connect(
    (state) => ({
        userList: state.userList
    }),
    {
        getUserList
    }
)(view)


export default Worker


