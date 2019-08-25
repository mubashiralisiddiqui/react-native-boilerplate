import React from 'react';
import {NetInfo, View} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { parse, getStorage, setStorage, brandColors, stringify, authUser, getToken } from '../../constants';
import { syncCall, getTodayCalls, updateCallStatus, updatedCalls, getTodayUnplannedCalls } from '../../services/callServices';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import { getAllGifts } from '../../services/giftService';
import { getProductsWithSamples } from '../../services/productService';
import { getAllCities } from '../../services/city';
import { getAllDesignations, getAllSpecialities, getDoctorByEmployeeId } from '../../services/doctor';
import { getUser, isRSM } from '../../reducers/authReducer';
import { getEmployees } from '../../services/auth';
import { RFValue } from 'react-native-responsive-fontsize';

export const NetworkContext = React.createContext({
    isConnected: false,
    type: 'unknown',
    effectiveType: 'unknown',
    showRefresh: false,
    isRefreshing: false,
});

class NetworkProviderClass extends React.PureComponent {
    state = {
        isConnected: false,
        type: 'unknown',
        effectiveType: 'unknown',
        showRefresh: false,
        isRefreshing: false,
    };

    setConnectivity = ({type, effectiveType, isConnected}) => {
        this.setState({
            type,
            effectiveType,
            isConnected,
        })
        if(isConnected) this.syncCalls();
    }

    syncCalls = async () => {
        const jsonParamsArray = ['jsonDailyCall', 'jsonDailyCallDetail', 'jsonGiftDetail', 'jsonSampleDetail']
        let calls = await getStorage('offlineCalls');
        if(calls != null) {
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

    handleRefresh = async () => {
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
        Promise.all([
            this.props.getTodayCalls(payload, true),
            this.props.getProductsWithSamples(payload, true),
            this.props.getAllGifts({}, true),
            this.props.getCities(true),
            this.props.getDesignations(true),
            this.props.getSpecialities(true),
            this.props.getUnplannedCalls(payload),
            this.props.isRSM
            ? this.props.getReportingEmployees(payload)
            : this.props.getDoctorsByEmployee(payload),
        ]).then(response => {
            this.setState({
                isRefreshing: false,
            })
        })
    }

    async componentDidMount() {
        const isConnected = await NetInfo.isConnected.fetch();
        const { type, effectiveType } = await NetInfo.getConnectionInfo();
        this.setConnectivity({ type, effectiveType, isConnected });

        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = async (isConnected) => {
        const {type, effectiveType} = await NetInfo.getConnectionInfo();

        return this.setConnectivity({type, effectiveType, isConnected})
    };

    render() {
        return (
            <NetworkContext.Provider value={{state: this.state, hideRefresh: this.hideRefresh, showRefresh: this.showRefresh}}>
                {this.props.children}
                {
                    this.state.showRefresh ?
                    <View style={{position: 'absolute', top: 60, right: 10, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Button
                            loading={this.state.isRefreshing}
                            loadingProps={{ color: brandColors.lightGreen }}
                            type="clear"
                            disabled={!this.state.isConnected}
                            title="Refresh"
                            onPress={this.handleRefresh}
                            titleStyle={{color: brandColors.lightGreen, fontSize: RFValue(10)}}
                            icon={<Icon name="refresh" size={20} color={brandColors.lightGreen} />}
                        />
                    </View> : null
                }
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