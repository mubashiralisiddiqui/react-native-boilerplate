/**
 *  start of Login container
 */
import React, { Component } from 'react';
import { LoginForm, ImageHeader, MultipleImageBackgroundWrapper } from '../../components'
import { brandColors, RFValue, validate } from '../../constants';
import { services } from '../../services'
import { getLoginLoding, getLoginError, backgroundImages } from '../../reducers/authReducer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { NetworkContext } from '../../components/NetworkProvider';
import { View, KeyboardAvoidingView  } from 'react-native'
import { Text, Card } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
        validations: {
            LoginId: {
                required: true,
                email: true,
            },
            Password: {
                required: true,
            }
        },
        errors: {
            LoginId: '',
            Password: '',
        }
    }
    onChange = (key, value) => {
        // this.setState({ [key]: value })
    }
    onKeyEvent = (field, event) => {
        const { nativeEvent: { text } } = event
        if (field == 'LoginId' && text[text.length - 1] === '@' && !this.state.LoginId.includes('hudsonpharma-sales.com')) {
            this.setState({
                LoginId: `${this.state.LoginId}@hudsonpharma-sales.com`
            })
        }
        else {
            this.setState({
                [field]: text
            })
        }

    }

    onSubmit = () => {
        const { LoginId, Password } = this.state
        const [errors, shouldSubmit] = validate(this.state.validations, { LoginId, Password })
        if(shouldSubmit) {
            this.props.loginUser({
                LoginId,
                Password,
            }, () => {
                this.props.navigation.navigate('AuthCheck');
            }, () => {
                alert('Invalid credentials')
            })
            return;
        }
        this.setState({ errors })
    }

    showPassword = () => {
        this.setState({
            secure: !this.state.secure,
            passwordIconColor: !this.state.secure === true ? brandColors.darkBrown : brandColors.green
        })
    }

    componentDidMount() {
        this.props.getBackgroundImages()
    }

    render() {
        return (
            <MultipleImageBackgroundWrapper images={this.props.images}>
                <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'} contentContainerStyle={styles.InputContainer}>
                    <KeyboardAvoidingView  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Card containerStyle={{ borderRadius: 15, width: '90%', justifyContent: 'center', alignItems: 'center', opacity: 0.9 }}>
                            <ImageHeader
                            />
                            <Text style={{color: brandColors.darkBrown , opacity: 1, textAlign: 'center', fontFamily: 'Lato-HeavyItalic', fontSize: RFValue(30) }}>Login</Text>
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
                    </KeyboardAvoidingView >
                </KeyboardAwareScrollView >
            </MultipleImageBackgroundWrapper>
        )
    }
}
const mapStateToProps = state => {
    return {
        error: getLoginError(state),
        loading: getLoginLoding(state),
        images: backgroundImages(state),
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    loginUser: services().authService.loginUser,
    getBackgroundImages: services().authService.getBackgroundImages,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)


const styles = {
    InputContainer: {
        flex: 1,
    }
}