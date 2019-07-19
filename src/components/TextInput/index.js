import React from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';
import { brandColors } from '../../constants';

import { styles } from './style'
const InputText = (
    {
        placeholder = "Login ID",
        keyboardType = "default",
        handleChange = () => ({}),
        underlineColor = "",
        secureTextEntry = false,
        value,
        leftIcon,
        onKeyUp,
        type,
        error

    }
) => {
    return (
        <View style={styles.outerContainer}>
            <View
                style={styles.inputContainer}
            >
                <Input
                    style={styles.input}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={brandColors.darkBrown}
                    keyboardType={keyboardType}
                    onChangeText={(text) => handleChange(type === 'password' ? 'Password' : 'LoginId', text)}
                    value={value}
                    rightIcon={leftIcon}
                    inputContainerStyle={{ borderBottomWidth: 0, paddingVertical:15 }}
                    autoCapitalize={'none'}
                    onKeyPress={(e) => onKeyUp(type === 'password' ? 'Password' : 'LoginId', e)}
                    errorMessage={error.message}
                    />
            </View>
        </View>
    )
}
export default InputText