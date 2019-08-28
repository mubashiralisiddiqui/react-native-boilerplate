import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {

        setTimeout(() => {
            this.props.navigation.navigate('App');
        }, 1500)
        // this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={{ justifyContent: 'center', display: 'flex', flex: 1 }}>
                <ActivityIndicator
                    size={0}
                />
                <StatusBar hidden={false} backgroundColor="blue" barStyle="light-content" />
            </View>
        );
    }
}
