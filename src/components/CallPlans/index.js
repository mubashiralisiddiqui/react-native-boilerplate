/**
 * @file Container component that shows the home screen with a daily call listing
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */
import React, { PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { CallPlanHeader } from '../Headers';
import { ImageBackgroundWrapper, ScreenLoader, CallList, Refresh, CallPlansListHeader } from '..';
import { navigationOption, authUser, getToken } from '../../constants'
import { getProductsWithSamples } from '../../services/productService'
import { getTodayCalls, getTodayUnplannedCalls } from '../../services/callServices'
import { getAllGifts } from '../../services/giftService'
import { getCallsLoading } from '../../reducers/callsReducers'
import { getUser, isRSM } from '../../reducers/authReducer';
import { NetworkContext } from '../NetworkProvider';
import { getAllDesignations, getAllSpecialities, getDoctorByEmployeeId } from '../../services/doctor';
import { getAllCities } from '../../services/city';
import { getEmployees, loginUser } from '../../services/auth';
import Permissions from '../../classes/Permission'
import AsyncStorage from '@react-native-community/async-storage';

/**
 * @class CallPlans
 * @classdesc This is a container class that shows the daily calls of the day
 * @extends {Component}
 * 
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */

class CallPlans extends PureComponent {

    /**
     * @static
     * @memberof CallPlans
     */
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Daily Calls'))
    
    /**
     * @static
     * @memberof CallPlans
     */
    static contextType = NetworkContext
    state = {
        loadingButton: false,
        isLoading: false,
    }
    /**
     * @name componentDidMount
     * @async
     * @function
     * @description Handler that will be called as soon as the component gets mounted, it is responsible 
     *              for calling all the APIs that are needed at the start of the application
     * @returns {void}
     * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
     * @memberof CallPlans
     */
    componentDidMount() {
        try {
            Permissions.requestAll();
        } catch (e) {
            alert(e)
        }
        const user = this.props.user;
        this.props.checkForceLogout({
            LoginId: user.LoginId,
            Password: user.Password,
            checkForceLogout: true,
        }, () => {
            AsyncStorage.clear();
            this.props.navigation.navigate('AuthCheck');
        }, () => null)
        const userDataPayload = {
            Token: getToken,
            EmployeeId: user.EmployeeId,
        }
        this.props.getTodayCalls(userDataPayload)
        this.props.getProductsWithSamples(userDataPayload)
        this.props.getAllGifts()
        this.props.getDesignations()
        this.props.getSpecialities()
        this.props.getCities()
        this.props.getUnplannedCalls(userDataPayload)
        this.props.isRSM
        ? this.props.getReportingEmployees(userDataPayload)
        : this.props.getDoctorsByEmployee(userDataPayload)
    }

    /**
     * @name shouldShowLoader
     * @function
     * @description tells whether to show screen loader or not
     * @returns { void }
     * @memberof CallPlans
     * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
     */
    shouldShowLoader = () => {
        return this.props.loading;
    }
    /**
     * @name onPress
     * @description onPress handler of the single call selector
     * @param { Object } data - Call Details Data
     * @returns {void}
     * @memberof CallPlans
     * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
     */
    onPress = (data) => {
        this.props.navigation.navigate('CallExecution', {
            call_info: data,
            existing_call: true,
        })
    }

    /**
     * @name render
     * @function
     * @description Responsible for rendering layout for this component
     * @returns { void }
     * @memberof CallPlans
     * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
     */
    render() {
        return (
            <View style={styles.InputContainer}>
                <Refresh />
                <ImageBackgroundWrapper>
                    <CallPlanHeader />
                    { this.shouldShowLoader() && <ScreenLoader /> }
                    <CallPlansListHeader />
                    <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }}>
                        <CallList onPress={this.onPress} />
                        <CallList type="unplanned" />
                    </ScrollView>
                </ImageBackgroundWrapper>
            </View >
        )
    }
}

/**
 * @const function mapStateToProps
 * @description It will map the redux state to this component
 * @param {*} state
 * @returns Object
 * @memberof CallPlans
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */
const mapStateToProps = state => {
    return {
        loading: getCallsLoading(state),
        user: getUser(state),   
        isRSM: isRSM(state),
    }
}

/**
 * @const function mapDispatchToProps
 * @description It will actionable redux methods to this component
 * @param {*} dispatch
 * @returns Object
 * @memberof CallPlans
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */
const mapDispatchToProps = dispatch => bindActionCreators({
    checkForceLogout: loginUser,
    getTodayCalls: getTodayCalls,
    getProductsWithSamples: getProductsWithSamples,
    getAllGifts: getAllGifts,
    getAuthUser: authUser,
    getDesignations: getAllDesignations,
    getSpecialities: getAllSpecialities,
    getCities: getAllCities,
    getDoctorsByEmployee: getDoctorByEmployeeId,
    getReportingEmployees: getEmployees,
    getUnplannedCalls: getTodayUnplannedCalls,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CallPlans)

/**
 * @name styles
 * @constant
 * @type Object
 * @default
 */
const styles = {
    InputContainer: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#f1eee9',
        alignItems: 'center'
    }

}
