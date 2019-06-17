import React from 'react';
import { View, Text, TextInput, } from 'react-native';
import { Input } from 'react-native-elements';

import { styles } from './style'
const InputText = (
    {
        placeholder = "Login ID",
        keyboardType = "default",
        handleChange = () => ({}),
        underlineColor = "",
        secureTextEntry = false,
        text,
        leftIcon

    }
) => {
    return (
        <View style={styles.outerContainer}>
            <View
                style={styles.inputContainer}
            >
                {/* {icon} */}
                <Input
                    style={styles.input}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor='lightgray'
                    keyboardType={keyboardType}
                    onChangeText={() => handleChange()}
                    value={text}
                    // leftIcon={leftIcon}
                    rightIcon={leftIcon}
                    />
            </View>
        </View>
    )
}
export default InputText