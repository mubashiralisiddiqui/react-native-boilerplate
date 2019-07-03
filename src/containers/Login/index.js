/**
 *  start of Login container
 */
import React, { Component } from 'react';
import { View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { LoginForm, ImageHeader, ImageBackgroundWrapper } from '../../components'

class Login extends Component {
    static navigationOptions = {
        header: null,
        // drawerLockMode: 'locked-closed'
    }
    state = {
        email: '',
        password: '',
        loading: false,
    }
    onChange = (key, value) => {
        this.setState({[key] : value})
    }
    onSubmit = () => {
        this.setState({
            loading: true,
        })
        setTimeout(() => this.props.navigation.navigate('CallPlans'), 1500)
        
    }
    render() {
        return (
            <ImageBackgroundWrapper>
                {/* <View style={styles.InputContainer}> */}
                    <KeyboardAwareScrollView contentContainerStyle={styles.InputContainer}>
                        <ImageHeader
                        />
                        <LoginForm loading={this.state.loading} onSubmit={this.onSubmit}/>
                    </KeyboardAwareScrollView >
                {/* </View > */}
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