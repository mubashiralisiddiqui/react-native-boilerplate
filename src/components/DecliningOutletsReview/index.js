import React, { Component } from 'react';
import { View } from 'react-native';
import ImageBackgroundWrapper from '../ImageBackground';
import { CallPlanHeader } from '../Headers';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser } from '../../reducers/authReducer';
import { getDecliningOutletsLoading, getDecliningOutlets } from './reducer';
import { getDecliningCONSGOutlets } from './services';

class DecliningOutletReview extends Component {
    render() {
        <ImageBackgroundWrapper>
            <CallPlanHeader />

        </ImageBackgroundWrapper>
    }
}

/**
 * @const function mapStateToProps
 * @description It will map the redux state to this component
 * @param {*} state
 * @returns Object
 * @memberof DecliningOutletReview
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */
const mapStateToProps = state => {
    return {
        loading: getDecliningOutletsLoading(state),
        declining_outlets: getDecliningOutlets(state),
        user: getUser(state),
    }
}

/**
 * @const function mapDispatchToProps
 * @description It will actionable redux methods to this component
 * @param {*} dispatch
 * @returns Object
 * @memberof DecliningOutletReview
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */
const mapDispatchToProps = dispatch => bindActionCreators({
    getOutlets: getDecliningCONSGOutlets,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DecliningOutletReview)