import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    ActivityIndicator
} from 'react-native';


const Button = (props) => {

    getButtonStylings = () => {
        const { rounded, backgroundColor } = props
        return {

            borderRadius: rounded ? 30 : 0,
            width: '80%',
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
                onPress={onPress}
                style={getButtonStylings()}
            >
                {loading ?
                    <ActivityIndicator
                        color="white"
                    />
                    :
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>
                        {Title}
                    </Text>
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
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,

    },
    button: {
        borderRadius: 30,
        width: '80%',
        height: 50,
        backgroundColor: '#8dc23c',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'

    }
})

