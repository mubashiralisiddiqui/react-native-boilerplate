

import React, { Component } from 'react';
import { FontAwesomeIcon } from '../Icons';
import { TextInput, Button } from '../../components';
import LoginHoc from '../../containers/LoginHoc';
import { brandColors, RFValue } from '../../constants';
import { View, KeyboardAvoidingView } from 'react-native'

class LoginForm extends Component {
    render() {
        const {
            email,
            password,
            onChange,
            loading,
            onSubmit,
            onKeyUp,
            showPassword,
            passwordVisible,
            passwordIconColor,
            errors,
        } = this.props;
    console.log(this.props)

        return (
            <KeyboardAvoidingView style={{ width: '150%'}}>

                <TextInput
                    placeholder="Login ID"
                    keyboardType="email-address"
                    handleChange={onChange}
                    underlineColor="black"
                    secureTextEntry={false}
                    value={email}
                    onKeyUp={onKeyUp}
                    type="text"
                    leftIcon={<FontAwesomeIcon
                        size={20}
                        name="user"
                        color={brandColors.darkBrown} />}
                    error={errors.LoginId || ''}
                />
                <TextInput
                    placeholder="Password"
                    keyboardType="default"
                    handleChange={onChange}
                    underlineColor="black"
                    secureTextEntry={showPassword}
                    value={password}
                    onKeyUp={onKeyUp}
                    type="password"
                    leftIcon={
                        <FontAwesomeIcon
                            style={{ zIndex: 1000000000 }}
                            size={ RFValue(25)}
                            name="eye-slash"
                            color={passwordIconColor}
                            onPress={passwordVisible}
                        />}
                    error={errors.Password || ''}
                />
                <Button
                    loading={loading}
                    Title="Submit"
                    onPress={(e) => onSubmit(e)}
                    rounded={true}
                />
            </KeyboardAvoidingView>
            // <View style={{ width: '150%'}}>
                // {/* <Text style={styles.heading}>Login</Text> */}
            // </View>
        )
    }

}
export default LoginHoc(LoginForm) 