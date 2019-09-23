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
        this.setState({ [key]: value })
    }
    onKeyEvent = (field, event) => {
        if (field == 'LoginId' && event.nativeEvent.key === '@' && !this.state.LoginId.includes('hudsonpharma-sales.com')) {
            this.setState({
                LoginId: `${this.state.LoginId}hudsonpharma-sales.com`
            })
        }

    }

    onSubmit = () => {
        // alert('clicked')
        const { LoginId, Password } = this.state
        const [errors, shouldSubmit] = validate(this.state.validations, { LoginId, Password })
        if(shouldSubmit) {
            // alert('logging')
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
        alert('validations')
        this.setState({ errors })
    }

    showPassword = () => {
        this.setState({
            secure: !this.state.secure,
            passwordIconColor: !this.state.secure === true ? brandColors.darkBrown : brandColors.green
        })
    }

    componentDidMount() {
        this.context.hideRefresh();
        this.props.getBackgroundImages()
    }

    render() {
        return (
            <MultipleImageBackgroundWrapper images={this.props.images}>
                <ScrollView keyboardShouldPersistTaps={'always'} contentContainerStyle={styles.InputContainer}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Card containerStyle={{ borderRadius: 15, width: '75%', justifyContent: 'center', alignItems: 'center', opacity: 0.8 }}>
                            <ImageHeader
                            />
                            <Text style={{opacity: 1, textAlign: 'center', fontFamily: 'Lato-HeavyItalic', fontSize: RFValue(30) }}>Login</Text>
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