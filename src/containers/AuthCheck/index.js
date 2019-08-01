import React, { Component } from 'react';
import { View, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { authUser } from '../../constants'

class AuthCheck extends Component {
    state = {
        loading: true,
        src: require('../../assets/images/HPLogo.png'),
        user: null
    }

    async componentDidMount() {
        const user = await this.props.authUser();
        this.navigateNow(!(user === null))
    }

    navigateNow = (verified = true) => {
        verified 
        ? this.props.navigation.navigate('CallPlans')
        : this.props.navigation.navigate('Login')
    }
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={this.state.src}
                />
                <ActivityIndicator
                    size={30}
                />
            </View>
         );
    }
}
const mapStateToProps = state => {
    return {
        // error: getLoginError(state),
        // loading: getLoginLoding(state),
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    authUser: authUser,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AuthCheck)
    
const styles = {
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 'auto',
        height: 'auto',
    },
};