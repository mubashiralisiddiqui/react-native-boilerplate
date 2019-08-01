import React from 'react';
import {NetInfo} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { parse, getStorage, todayDate } from '../../constants';
import { submitCallSingle, syncCall } from '../../services/callServices';

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
            if(a == 1) {
                delete calls[index]
                return this.sync(calls, Object.keys(calls)[0] || 0);
            }
        }
        return true;
    }

    syncCalls = async () => {
        let calls = await getStorage('offlineCalls');
        if(calls != null) {
            calls = parse(calls);
            let test = this.sync(calls, Object.keys(calls)[0])
            console.log(test)
            console.log(calls, 'from the connectivity')
            // Object.keys(calls).map(call => {
            //     if(this.state.isConnected) {
            //         this.props.syncCall(calls[call]).then(response => {
            //             delete calls[call];
            //         })
            //     }
            //     console.log(calls[call])
            // })
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