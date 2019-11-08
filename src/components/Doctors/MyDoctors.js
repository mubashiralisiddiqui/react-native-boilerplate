import React, { PureComponent } from 'react';
import { View, Dimensions } from 'react-native';
import { DoctorList } from '..';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { getToken } from '../../constants';
import { getDoctorByEmployeeId } from '../../services/doctor';
import { getUser } from '../../reducers/authReducer';

class MyDoctors extends PureComponent {
    state = {
        width: Dimensions.get('window').width
    }

    onLayout = () => {
        this.setState({
            width: Dimensions.get('window').width
        })
    }

    componentDidMount() {
        this.props.getDoctorsByEmployee({
            EmployeeId: this.props.user.EmployeeId,
            Token: getToken
        })
    }

    render () {
        return (
            <View onLayout={this.onLayout} style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
                <DoctorList />
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
    getDoctorsByEmployee: getDoctorByEmployeeId,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyDoctors)