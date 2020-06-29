import { connect } from 'react-redux'

import view from './view'
import { login } from './../../redux/actions'

const Login = connect(
    // state
    (state) => ({
        user: state.user
    }),
    // dispatch action
    {
        login
    }
)(view)

export default Login