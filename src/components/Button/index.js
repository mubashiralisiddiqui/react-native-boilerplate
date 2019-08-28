import React, { useContext } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    ActivityIndicator
} from 'react-native';
import { RFValue } from '../../constants';
import { NetworkContext } from '../NetworkProvider';


const Button = (props) => {
    const { isConnected } = useContext(NetworkContext).state;

    getButtonStylings = () => {
        const { rounded, backgroundColor } = props
        return {

            borderRadius: rounded ? 30 : 0,
            width: '100%',
            height: 50,
            backgroundColor: backgroundColor || '#8dc23c',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderColor: backgroundColor ? 'white' : 'transparent',
            borderWidth: 1
        }
    }
    const {
        Title,
        icon,
        onPress = () => navigate('CallPlans'),
        loading,
        rounded = false
    } = props;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                disabled={!isConnected}
                onPress={onPress}
                style={getButtonStylings()}
            >
                <Text style={{ textAlign: 'left', color: 'white', fontSize: RFValue(18), fontFamily: 'Lato-MediumItalic' }}>
                        {Title}
                </Text>
                {loading ?
                    <ActivityIndicator
                        color="white"
                    />
                    : null
                }

                {icon}
            </TouchableOpacity>

        </View>
    );
}

export default Button;
const styles = new StyleSheet.create({
    container: {
        justifyContent: 'center',
        // width: '100%',
        alignItems: 'center',
        paddingVertical: 10,

    },
    button: {
        borderRadius: 30,
        width: '100%',
        height: 50,
        backgroundColor: '#8dc23c',
        // justifyContent: 'center',
        // alignItems: 'center',
        // flexDirection: 'row'

    }
})

