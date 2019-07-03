

import React, { Fragment, Component } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { TextInput, Button } from '../../components';
import LoginHoc from '../../containers/LoginHoc';
import { Text, CheckBox } from 'react-native-elements';
import { brandColors } from '../../constants';
import { styles } from './styles';

class LoginForm extends Component {
    render() {
            const {email, password, onChange, loading, onSubmit} = this.props;
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
                        leftIcon={<Icon
                            size={20}
                            name="user"
                            color={brandColors.darkBrown} />}
                    />
                    <TextInput
                        placeholder="Password"
                        keyboardType="default"
                        handleChange={onChange}
                        underlineColor="black"
                        secureTextEntry={true}
                        value={password}
                        leftIcon={
                            <Icon
                                size={20}
                                name="key"
                                color={brandColors.darkbrown}
                            />}
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