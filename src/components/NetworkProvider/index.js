import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { parse, getStorage, setStorage, brandColors, stringify, RFValue} from '../../constants';
import { alertData } from '../../constants/messages'
import { syncCall, updateCallStatus, updatedCalls} from '../../services/callServices';
import NetInfo from "@react-native-community/netinfo";
import DropdownAlert from 'react-native-dropdownalert';
import DropDownHolder from '../../classes/Dropdown';
import { getVersion } from '../../reducers/appReducer';
import { getAppVersion } from '../../services';

export const NetworkContext = React.createContext({
    isConnected: false,
    type: 'unknown',
    isInternetReachable: false,
    isRefreshing: false,
    isSyncing: false,
});

class NetworkProviderClass extends React.PureComponent {
    state = {
        isConnected: false,
        type: 'unknown',
        isInternetReachable: false,
        details: null,
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

    async componentDidMount() {
        const {details, isConnected, isInternetReachable, type} = await NetInfo.fetch();

        this.setConnectivity({ details, isConnected, isInternetReachable, type });
        this.setState({
            netInfoEventListener: NetInfo.addEventListener(this.handleConnectivityChange)
        })
        this.checkVersionUpdate();
    }

    componentWillUnmount() {
        this.state.netInfoEventListener();
    }

    handleConnectivityChange = (state) => this.setConnectivity(state)

    checkVersionUpdate = () => {
        this.props.getLatestVersion();
    }

    render() {
        return (
            <NetworkContext.Provider value={{state: this.state }}>
                {this.props.children}
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
        version: getVersion(state),
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    syncCall: syncCall,
    updateCalls: updatedCalls,
    getLatestVersion: getAppVersion
}, dispatch)

export const NetworkProvider =  connect(mapStateToProps, mapDispatchToProps)(NetworkProviderClass)