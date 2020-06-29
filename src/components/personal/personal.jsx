import { connect } from 'react-redux'

import view from './view'
import { resetUser } from './../../redux/actions'

const Personal = connect(
    (state) => ({
        user: state.user
    }),
    {
        resetUser
    }
)(view)


export default Personal