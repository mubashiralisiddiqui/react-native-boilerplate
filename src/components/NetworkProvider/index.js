import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { parse, getStorage, setStorage, brandColors, stringify, authUser, getToken, RFValue} from '../../constants';
import { alertData } from '../../constants/messages'
import { syncCall, getTodayCalls, updateCallStatus, updatedCalls, getTodayUnplannedCalls } from '../../services/callServices';
import { Button } from 'react-native-elements';
import { FontAwesomeIcon } from '../Icons'
import { getAllGifts } from '../../services/giftService';
import { getProductsWithSamples } from '../../services/productService';
import { getAllCities } from '../../services/city';
import { getAllDesignations, getAllSpecialities, getDoctorByEmployeeId } from '../../services/doctor';
import { getUser, isRSM } from '../../reducers/authReducer';
import { getEmployees } from '../../services/auth';
import NetInfo from "@react-native-community/netinfo";
import DropdownAlert from 'react-native-dropdownalert';
import DropDownHolder from '../../classes/Dropdown';

export const NetworkContext = React.createContext({
    isConnected: false,
    type: 'unknown',
    isInternetReachable: false,
    showRefresh: false,
    isRefreshing: false,
    isSyncing: false,
});

class NetworkProviderClass extends React.PureComponent {
    state = {
        isConnected: false,
        type: 'unknown',
        isInternetReachable: false,
        details: null,
        showRefresh: false,
        isRefreshing: false,
        netInfoEventListener: () => null,
        isSyncing: false,
    };

    showDropdown = (isConnected, isReachable) => {
        if(!isConnected && !isReachable) {
            DropDownHolder.show(alertData.connectivity.unavailable);
        }
        if(isConnected && !isReachable) {
            DropDownHolder.show(alertData.connectivity.limited);
        }
    }

    setConnectivity = ({details, isConnected, isInternetReachable, type}) => {
        this.showDropdown(isConnected, isInternetReachable)
        
        this.setState({
            type,
            isInternetReachable,
            isConnected,
            details,
        })
        if(isInternetReachable && this.state.isSyncing == false) this.syncCalls();
    }

    syncCalls = async () => {
        this.setState({
            isSyncing: true,
        })
        const jsonParamsArray = ['jsonDailyCall', 'jsonDailyCallDetail', 'jsonGiftDetail', 'jsonSampleDetail']
        let calls = await getStorage('offlineCalls');

        if(! _.isEmpty(parse(calls))) {
            DropDownHolder.show(alertData.call.syncing)
            calls = parse(calls);
            Object.keys(calls).map(call => {
                Object.keys(calls[call]).map(single => {
                    if(jsonParamsArray.includes(single) && typeof parse(calls[call][single]) == 'string') {
                        calls[call][single] = parse(calls[call][single])
                    }
                })
            })
            let promises = Object.keys(calls).map(async (call) => {
                let response = await this.props.syncCall(calls[call])
                return Number(call) 
            })
            let result = await Promise.all(promises)
            const updatedCalls = await updateCallStatus(result)
            this.props.updateCalls(updatedCalls);
            result.map(id => {
                return delete calls[id]
            })
            setStorage('offlineCalls', stringify(calls))
            this.setState({
                isSyncing: false,
            }, () => DropDownHolder.show(alertData.call.synced))
        }
    }

    showRefresh = () => {
        this.setState({
            showRefresh: true
        })
    }
    hideRefresh = () => {
        this.setState({
            showRefresh: false
        })
    }

    handleRefresh = () => {
        this.setState({
            isRefreshing: true
        })
        this.SyncApp();
    }

    SyncApp = () => {
        const payload = {
            Token: getToken,
            EmployeeId: this.props.user.EmployeeId
        }
        DropDownHolder.show(alertData.refresh.init)
        Promise.all([
            this.props.getTodayCalls(payload, true),
            this.props.getProductsWithSamples(payload, true),
            this.props.getAllGifts({}, true),
            this.props.getCities(true),
            this.props.getDesignations(true),
            this.props.getSpecialities(true),
            this.props.getUnplannedCalls(payload, true),
            this.props.isRSM
            ? this.props.getReportingEmployees(payload, true)
            : this.props.getDoctorsByEmployee(payload, true)
        ]).then(response => {
            DropDownHolder.show(alertData.refresh.success)
            this.setState({
                isRefreshing: false,
            })
        })
    }

    async componentDidMount() {
        const {details, isConnected, isInternetReachable, type} = await NetInfo.fetch();

        this.setConnectivity({ details, isConnected, isInternetReachable, type });
        this.setState({
            netInfoEventListener: NetInfo.addEventListener(this.handleConnectivityChange)
        })
    }

    componentWillUnmount() {
        this.state.netInfoEventListener();
        // NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = (state) => this.setConnectivity(state)

    render() {
        return (
            <NetworkContext.Provider value={{state: this.state, hideRefresh: this.hideRefresh, showRefresh: this.showRefresh}}>
                {this.props.children}
                {
                    this.state.showRefresh &&
                    <View style={{position: 'absolute', top: 60, right: 10, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Button
                            loading={this.state.isRefreshing}
                            loadingProps={{ color: brandColors.lightGreen }}
                            type="clear"
                            disabled={!this.state.isConnected}
                            title="Refresh"
                            onPress={this.handleRefresh}
                            titleStyle={{color: brandColors.lightGreen, fontSize: RFValue(14)}}
                            icon={<FontAwesomeIcon name="refresh" size={RFValue(18)} color={brandColors.lightGreen} />}
                        />
                    </View>
                }
                <DropdownAlert
                    messageStyle={{
                        fontSize: RFValue(15),
                        fontFamily: 'Lato-Medium',
                        textAlign: 'left',
                        fontWeight: 'normal',
                        color: 'white',
                        backgroundColor: 'transparent'
                    }}
                    titleStyle={{
                        fontSize: RFValue(17),
                        textAlign: 'left',
                        fontWeight: 'normal',
                        color: 'white',
                        backgroundColor: 'transparent',
                        fontFamily: 'Lato-BoldItalic'
                    }}
                    successColor={brandColors.lightGreen}
                    updateStatusBar={false}
                    closeInterval={4000}
                    ref={ref => DropDownHolder.setDropDown(ref) }
                />
            </NetworkContext.Provider>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: getUser(state),
        isRSM: isRSM(state),
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    syncCall: syncCall,
    getTodayCalls: getTodayCalls,
    getProductsWithSamples: getProductsWithSamples,
    getAllGifts: getAllGifts,
    getAuthUser: authUser,
    updateCalls: updatedCalls,
    getCities: getAllCities,
    getDesignations: getAllDesignations,
    getSpecialities: getAllSpecialities,
    getDoctorsByEmployee: getDoctorByEmployeeId,
    getReportingEmployees: getEmployees,
    getUnplannedCalls: getTodayUnplannedCalls,
}, dispatch)

export const NetworkProvider =  connect(mapStateToProps, mapDispatchToProps)(NetworkProviderClass)