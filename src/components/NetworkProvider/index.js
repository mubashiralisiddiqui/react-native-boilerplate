import React from 'react';
import {NetInfo} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { parse, getStorage, todayDate, setStorage, stringify, removeStorage } from '../../constants';
import { submitCallSingle, syncCall } from '../../services/callServices';
import { objectExpression } from '@babel/types';

export const NetworkContext = React.createContext({
    isConnected: false,
    type: 'unknown',
    effectiveType: 'unknown',
});

class NetworkProviderClass extends React.PureComponent {
    state = {
        isConnected: false,
        type: 'unknown',
        effectiveType: 'unknown',
    };

    setConnectivity = ({type, effectiveType, isConnected}) => {
        return this.setState({
            type,
            effectiveType,
            isConnected,
        })
    }

    sync = async (calls, index) => {
        if(index !== 0) {
            console.log(calls, index)
            let a = await this.props.syncCall(calls[index])
            console.log(a)
            // if(a == 1) {
                delete calls[index]
                console.log(calls, Object.keys(calls), 'iterated', Object.keys(calls).length > 0)
                if(Object.keys(calls).length > 0) {
                    await setStorage('offlineCalls', stringify(calls))
                    await this.sync(calls, Object.keys(calls)[0] || 0);
                }
                await removeStorage('offlineCalls')
                return a
            // }
        }
        return true;
    }

    syncCalls = async () => {
        const jsonParamsArray = ['jsonDailyCall', 'jsonDailyCallDetail', 'jsonGiftDetail', 'jsonSampleDetail']
        let calls = await getStorage('offlineCalls');
        if(calls != null) {
            calls = parse(calls);
            console.log(calls, 'from the connectivity')
            Object.keys(calls).map(call => {
                Object.keys(calls[call]).map(single => {
                    if(jsonParamsArray.includes(single) && typeof parse(calls[call][single]) == 'string') {
                        calls[call][single] = parse(calls[call][single])
                    }
                })
            })
            Object.keys(calls).map(async (call) => {
                await this.props.syncCall(calls[call])
            })
        }
    }

    async componentDidMount() {
        console.log(todayDate())
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
        if(isConnected) this.syncCalls();

        return this.setConnectivity({type, effectiveType, isConnected})
    };

    render() {
        return (
            <NetworkContext.Provider value={this.state}>
                {this.props.children}
            </NetworkContext.Provider>
        );
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    syncCall: syncCall
}, dispatch)

export const NetworkProvider =  connect(mapStateToProps, mapDispatchToProps)(NetworkProviderClass)