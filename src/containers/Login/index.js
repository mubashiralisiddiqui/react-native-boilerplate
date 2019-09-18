/**
 *  start of Login container
 */
import React, { Component } from 'react';
import { LoginForm, ImageHeader, ImageBackgroundWrapper } from '../../components'
import { brandColors, RFValue } from '../../constants';
import { services } from '../../services'
import { getLoginLoding, getLoginError } from '../../reducers/authReducer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { NetworkContext } from '../../components/NetworkProvider';
import { View, ScrollView, Keyboard } from 'react-native'
import { Text, Card } from 'react-native-elements';

class Login extends Component {
    static navigationOptions = {
        header: null,
    }
    static contextType = NetworkContext;
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
        this.setState({ [key]: value })
    }
    onKeyEvent = (field, event) => {
        if (field == 'LoginId' && event.nativeEvent.key === '@' && !this.state.LoginId.includes('hudsonpharma-sales.com')) {
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
        Keyboard.dismiss();
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
        if (!this.state.loading
            && this.state.errors.LoginId.message === ''
            && this.state.errors.Password.message === '') {
            const { LoginId, Password } = this.state;
            this.props.loginUser({
                LoginId,
                Password,
            }, () => {
                this.props.navigation.navigate('AuthCheck');
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

    componentDidMount() {
        this.context.hideRefresh();
    }

    render() {
        return (
            <ImageBackgroundWrapper>
                <ScrollView keyboardShouldPersistTaps={'handled'} contentContainerStyle={styles.InputContainer}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Card containerStyle={{ borderRadius: 15, width: '75%', justifyContent: 'center', alignItems: 'center' }}>
                            <ImageHeader
                            />
                            <Text style={{ textAlign: 'center', fontFamily: 'Lato-HeavyItalic', fontSize: RFValue(30) }}>Login</Text>
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
                        </Card>
                    </View>
                </ScrollView >
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
    loginUser: services().authService.loginUser,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)


const styles = {
    InputContainer: {
        flex: 1,
    }
}