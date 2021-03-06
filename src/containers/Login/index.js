
/**
 *  start of Login container
 */
import React, { Component } from 'react';

import { View, Text } from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { LoginForm, ImageHeader } from '../../components'


class Login extends Component {
    static navigationOptions = {
        header: null,
        // drawerLockMode: 'locked-closed'
    }

    render() {
        return (
            <View style={styles.InputContainer}>
                <KeyboardAwareScrollView contentContainerStyle={{ justifyContent: 'center', display: 'flex' }}>

                    <ImageHeader

                    />

                    <LoginForm />


                </KeyboardAwareScrollView >
            </View >
        )
    }
}
export default Login

// end of Login container
const styles = {
    InputContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    }

}