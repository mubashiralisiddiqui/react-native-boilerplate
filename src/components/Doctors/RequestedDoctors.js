import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { getPendingRequests } from './services';
import { getUser } from '../../reducers/authReducer';
import { DoctorList } from '..';

class RequestedDoctors extends PureComponent {

    componentDidMount() {
        this.props.getPendingRequests({
            EmployeeId: this.props.user.EmployeeId
        })
    }

    render() {
        return (
            <View onLayout={this.onLayout} style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
                <DoctorList isPending />
            </View>           
        )
    }
}

/**
 * @const function mapStateToProps
 * @description It will map the redux state to this component
 * @param {*} state
 * @returns Object
 * @memberof MyDoctors
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */
const mapStateToProps = state => {
    return {
        user: getUser(state),
    }
}

/**
 * @const function mapDispatchToProps
 * @description It will actionable redux methods to this component
 * @param {*} dispatch
 * @returns Object
 * @memberof MyDoctors
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */
const mapDispatchToProps = dispatch => bindActionCreators({
    getPendingRequests: getPendingRequests,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RequestedDoctors)