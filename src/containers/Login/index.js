/**
 *  start of Login container
 */
import React, { Component } from 'react';
import { View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { LoginForm, ImageHeader, ImageBackgroundWrapper } from '../../components'
import { brandColors } from '../../constants';
import { login } from '../../services'

class Login extends Component {
    static navigationOptions = {
        header: null,
    }
    state = {
        LoginId: '',
        Password: '',
        loading: false,
        secure: true,
        passwordIconColor: brandColors.darkBrown,
        errors: {
            LoginId: {
                show: false,
                message: '',
            },
            Password: {
                show: false,
                message: '',
            }
        }
    }
    onChange = (key, value) => {
        this.setState({[key] : value})
    }
    onKeyEvent = (field, event) => {
        if(field == 'LoginId' && event.nativeEvent.key === '@') {
            this.setState({
                LoginId: `${this.state.LoginId}hudsonpharma-sales.com`
            })
        }

    }

    stopLoader = () => {
        this.setState({
            loading: false,
        })
    }
    startLoader = () => {
        this.setState({
            loading: true,
        })
    }
    
    onSubmit = () => {
        this.setState({
            errors: {
                LoginId: {
                    message: this.state.LoginId.trim() === '' ?
                        'Please enter Login ID'
                        : '',
                },
                Password: {
                    message: this.state.Password === ''
                        ? 'Please enter Password'
                        : '',
                }
            }
        })
        if( !this.state.loading
            && this.state.errors.LoginId.message === ''
            && this.state.errors.Password.message === '' ) {
            this.startLoader();
            const {LoginId, Password} = this.state;
            login({
                LoginId,
                Password,
            }, () => {
                this.stopLoader()
                this.props.navigation.navigate('CallPlans');
            }, () => {
                alert('Invalid credentials')
                this.stopLoader();
            })
        }
    }
    showPassword = () => {
        this.setState({
            secure: !this.state.secure,
            passwordIconColor: !this.state.secure === true ? brandColors.darkBrown : brandColors.green
        })
    }
    render() {
        return (
            <ImageBackgroundWrapper>
                <KeyboardAwareScrollView contentContainerStyle={styles.InputContainer}>
                    <ImageHeader
                    />
                    <LoginForm
                        onKeyUp={this.onKeyEvent}
                        email={this.state.LoginId}
                        password={this.state.Password}
                        loading={this.state.loading}
                        onChange={this.onChange}
                        onSubmit={this.onSubmit}
                        showPassword={this.state.secure}
                        passwordVisible={this.showPassword}
                        passwordIconColor={this.state.passwordIconColor}
                        errors={this.state.errors}
                    />
                </KeyboardAwareScrollView >
            </ImageBackgroundWrapper>
        )                                                                                                                                                                           
    }
}                                                                                                                                   
export default Login

// end of Login container
const styles = {
    InputContainer: {
        display: 'flex',
        justifyContent: 'center',
    }
}