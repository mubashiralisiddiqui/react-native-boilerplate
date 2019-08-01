import React from 'react';
import {NetInfo} from 'react-native';

export const NetworkContext = React.createContext({
    isConnected: false,
    type: 'unknown',
    effectiveType: 'unknown',
});

export class NetworkProvider extends React.PureComponent {
    state = {
        isConnected: false,
        type: 'unknown',
        effectiveType: 'unknown',
    };

    setConnectivity = ({type, effectiveType, isConnected}) => {
        console.log(type, effectiveType, 'nn')
        return this.setState({
            type,
            effectiveType,
            isConnected,
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
            <NetworkContext.Provider value={this.state}>
                {this.props.children}
            </NetworkContext.Provider>
        );
    }
}