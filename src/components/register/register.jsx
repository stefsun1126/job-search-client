import { connect } from 'react-redux'

import { register } from './../../redux/actions'
import view from './view'


const Register = connect(
    // mapStateToProps
    (state) => ({
        user : state.user
    }),
    // mapDispatchToProps
    {
        register
    }
)(view)

export default Register