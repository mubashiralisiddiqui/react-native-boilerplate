import React from 'react';
import { View, Text, TextInput, } from 'react-native';

import { styles } from './style'
const InputText = (
    {
        placeholder = "Login ID",
        keyboardType = "default",
        handleChange = () => ({}),
        underlineColor = "",
        secureTextEntry = false,
        text,
        icon

    }
) => {
    return (
        <View style={styles.outerContainer}>
            <View
                style={styles.inputContainer}
            >
                {icon}
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor='lightgray'
                    keyboardType={keyboardType}
                    onChangeText={() => handleChange()}
                    value={text}
                    secureTextEntry={secureTextEntry}
                />
            </View>
        </View>
    )
}
export default InputText