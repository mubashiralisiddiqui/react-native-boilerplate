

import React, { Fragment, Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput, Button } from '../../components';
import LoginHoc from '../../containers/LoginHoc';
import { Text, CheckBox } from 'react-native-elements';
import { brandColors } from '../../constants';
import { styles } from './styles';

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
            return (
                <Fragment>
                    <Text h1 style={styles.heading}>Login</Text>
                    <TextInput
                        placeholder="Login ID"
                        keyboardType="email-address"
                        handleChange={onChange}
                        underlineColor="black"
                        secureTextEntry={false}
                        value={email}
                        onKeyUp={onKeyUp}
                        type="text"
                        leftIcon={<Icon
                            size={20}
                            name="user"
                            color={brandColors.darkBrown} />}
                        error={errors.LoginId}    
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
                            <Icon
                                size={25}
                                name="eye-slash"
                                color={passwordIconColor}
                                onPress={passwordVisible}
                            />}
                        error={errors.Password}
                    />
                    {/* <CheckBox
                        title="Keep me signed in"
                        containerStyle={styles.checkbox}
                        textStyle={styles.checkboxText}
                    /> */}
                    <Button
                        loading={loading}
                        Title="Login"
                        onPress={(e) => onSubmit(e)}
                        rounded={true}
                    />
                </Fragment >
            )
    }

}
export default LoginHoc(LoginForm) 