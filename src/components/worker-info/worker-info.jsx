import { connect } from 'react-redux'

import view from './view'
import { update } from './../../redux/actions'

const WorkerInfo = connect(
    (state) => ({
        user: state.user
    }),
    {
        update
    }
)(view)


export default WorkerInfo 