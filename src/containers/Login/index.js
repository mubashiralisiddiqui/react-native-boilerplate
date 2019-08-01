/**
 *  start of Login container
 */
import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { LoginForm, ImageHeader, ImageBackgroundWrapper } from '../../components'
import { brandColors } from '../../constants';
import { loginUser } from '../../services/auth'
import { getLoginLoding, getLoginError } from '../../reducers/authReducer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

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
            const {LoginId, Password} = this.state;
            this.props.loginUser({
                LoginId,
                Password,
            }, () => {
                this.props.navigation.navigate('CallPlans');
            }, () => {
                alert('Invalid credentials')
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
                        loading={this.props.loading}
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
const mapStateToProps = state => {
    return {
        error: getLoginError(state),
        loading: getLoginLoding(state),
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    loginUser: loginUser,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)


const styles = {
    InputContainer: {
        display: 'flex',
        justifyContent: 'center',
    }
}