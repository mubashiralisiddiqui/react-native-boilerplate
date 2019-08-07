import React, { useContext } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NetworkContext } from '../../components/NetworkProvider'
import { brandColors } from '../../constants';

const ConnectivityStatus = () => {
    const { isConnected, effectiveType } = useContext(NetworkContext).state;
    const getIcon = () => {
        switch(effectiveType) {
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
                return isConnected ? 'signal-variant' : 'wifi-off'
            }
        }
    }
    return (
        <View style={{width: '13%'}}>
            {
                isConnected === true ?
                <Button
                    type="clear"
                    title="Connected"
                    titleStyle={{color: brandColors.lightGreen, fontSize: 11}}
                    icon={<MaterialCommunityIcon name={getIcon()} color={brandColors.lightGreen} />}
                />
                : <Button
                    type="clear"
                    title="Unavailable"
                    titleStyle={{fontSize: 11, color: 'red'}}
                    icon={<MaterialCommunityIcon name={getIcon()} color="red" />}
                />
            }
        </View>
    );
}
export default ConnectivityStatus;