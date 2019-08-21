/**
 * @file Container component that shows the home screen with a daily call listing
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { CallPlanHeader } from '../../components/Headers';
import { ImageBackgroundWrapper, ScreenLoader } from '../../components';
import { navigationOption, authUser, getToken } from '../../constants'
import ItemCard from '../../components/Itemcard';
import { getProductsWithSamples } from '../../services/productService'
import { getTodayCalls, getTodayUnplannedCalls } from '../../services/callServices'
import { getAllGifts } from '../../services/giftService'
import { connect } from 'react-redux';
import { getCalls, getCallsError, getCallsLoading, getUnplannedCalls } from '../../reducers/callsReducers'
import { bindActionCreators } from 'redux'
import { getProducts } from '../../reducers/productsReducer';
import { getUser, isRSM, isSPO } from '../../reducers/authReducer';
import { NetworkContext } from '../../components/NetworkProvider';
import CallPlansListHeader from '../../components/CallPlansListHeader';
import { getAllDesignations, getAllSpecialities, getDoctorByEmployeeId } from '../../services/doctor';
import { getAllCities } from '../../services/city';
import { getEmployees } from '../../services/auth';

/**
 * @class CallPlans
 * @classdesc This is a container class that shows the daily calls of the day
 * @extends {Component}
 * 
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */

class CallPlans extends Component {

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
    async componentDidMount() {
        const user = this.props.user;
        const userDataPayload = {
            Token: getToken,
            EmployeeId: user.EmployeeId,
        }
        Promise.all([
            this.props.getTodayCalls(userDataPayload),
            this.props.getProductsWithSamples(userDataPayload),
            this.props.getAllGifts(),
            this.props.getDesignations(),
            this.props.getSpecialities(),
            this.props.getCities(),
            this.props.getUnplannedCalls(userDataPayload),
            this.props.isRSM
            ? this.props.getReportingEmployees(userDataPayload)
            : this.props.getDoctorsByEmployee(userDataPayload),
        ]).then(response => {
            console.log(response)
            this.context.showRefresh()
        })
        // TODO: need to remove this if everything works just fine.
        // this.props.getTodayCalls({
        //     Token: getToken,
        //     EmployeeId: user.EmployeeId,
        // });
        // this.props.getProductsWithSamples({
        //     Token: getToken,
        //     EmployeeId: user.EmployeeId
        // })
        // this.props.getAllGifts();
        // this.props.getDesignations();
        // this.props.getSpecialities();
        // this.props.getCities();

        // if(this.props.isRSM) {
        //     this.props.getReportingEmployees({
        //         EmployeeId: this.props.user.EmployeeId,
        //         Token: getToken,
        //     })
        // }

        // if(this.props.isSPO) {
        //     this.props.getDoctorsByEmployee({
        //         EmployeeId: this.props.user.EmployeeId
        //     });
        // }
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
     * @function
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
                <ImageBackgroundWrapper>
                    <CallPlanHeader />
                    { this.shouldShowLoader() ? <ScreenLoader /> : null }
                    <CallPlansListHeader />
                    <ScrollView showsVerticalScrollIndicator={false} style={{ width: '99%' }}>
                        {
                            this.props.calls.map((call, i) => {
                                return (<ItemCard
                                    key={i}
                                    name={`${call.Doctor.DoctorName}`}
                                    category={call.TeamName}
                                    doctorClass={call.Doctor.ClassName}
                                    loading={this.state.loadingButton}
                                    onPressHandler={() => this.onPress(call)}
                                    status={call.IsExecuted}
                                    isOffline={call.IsExecutedOffline && call.IsExecutedOffline}
                                />)
                            })
                        }
                        {
                            this.props.unplannedCalls.map((call, i) => {
                                return (<ItemCard
                                    key={i}
                                    name={`${call.Doctor.DoctorName}`}
                                    category={call.TeamName}
                                    doctorClass={call.Doctor.ClassName}
                                    loading={this.state.loadingButton}
                                    onPressHandler={() => this.onPress(call)}
                                    status={call.IsExecuted}
                                    isOffline={call.IsExecutedOffline && call.IsExecutedOffline}
                                    isUnplanned={true}
                                />)
                            })
                        }
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
        error: getCallsError(state),
        loading: getCallsLoading(state),
        calls: getCalls(state),
        products: getProducts(state),
        user: getUser(state),   
        isRSM: isRSM(state),
        isSPO: isSPO(state),
        unplannedCalls: getUnplannedCalls(state),
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
