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
        text,
        leftIcon

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
                    onChangeText={handleChange}
                    value={text}
                    rightIcon={leftIcon}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    autoCapitalize={'none'}
                    />
            </View>
        </View>
    )
}
export default InputText