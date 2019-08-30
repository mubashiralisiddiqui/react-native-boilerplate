import React, { useContext } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements';
import { NetworkContext } from '../../components/NetworkProvider'
import { brandColors, RFValue } from '../../constants';
import { MaterialCommunityIcon } from '../Icons'

const ConnectivityStatus = () => {
    const { isConnected, type, isInternetReachable } = useContext(NetworkContext).state;
    const getIcon = () => {
        switch(type) {
            case '2g': {
                return 'signal-2g'
            }
            case '3g': {
                return 'signal-3g'
            }
            case '4g': {
                return 'signal-4g'
            }
            case 'wifi': {
                return 'signal-variant'
            }
            default: {
                return isConnected && isInternetReachable ? 'signal-variant' : 'wifi-off'
            }
        }
    }
    return (
        <View style={{width: '13%'}}>
            {
                isConnected && isInternetReachable ?
                <Button
                    type="clear"
                    title="Connected"
                    titleStyle={{color: brandColors.lightGreen, fontSize: RFValue(11)}}
                    icon={<MaterialCommunityIcon name={getIcon()} color={brandColors.lightGreen} />}
                />
                : <Button
                    type="clear"
                    title="Unavailable"
                    titleStyle={{fontSize: RFValue(11), color: 'red'}}
                    icon={<MaterialCommunityIcon name={getIcon()} color="red" />}
                />
            }
        </View>
    );
}
export default ConnectivityStatus;