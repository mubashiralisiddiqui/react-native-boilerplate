import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { NetworkContext } from '../../components/NetworkProvider';
import { getUser } from '../../reducers/authReducer';
import {connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { navigationOption } from '../../constants';

class Web extends Component {
    state = {
        loading: true
    }
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Training Portal'))

    static contextType = NetworkContext;
    // static navigationOptions = {
    //     header: null,
    // }

    getJsCode = () => {
        let username = this.props.user.LoginId
        let password = this.props.user.Password
        return `
        // document.onload(function() {
            if(document.cookie != '' && !document.cookie.includes('${username}')){
                // setCookie('RoleId', null, -1);
                // setCookie('UserId', null, -1);
                let cookies = document.cookie.split(';')
                for (let i = 0; i < cookies.length; i++) {
                    let cookie = cookies[i];
                    let eqPos = cookie.indexOf("=");
                    let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                    date = new Date();
                    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
                    document.cookie = name + "=null;expires="+ date + "; path=/";
                }
                window.location.reload()
            }
            document.getElementById('txtUsername').value = '${username}';
            document.getElementById('txtPassword').value = '${password}';
            document.getElementById('btnLogin').click();
        // })
        `
    }

    getUrl = () => {
        return 'http://portal.hudsonpharma.com/Login.aspx?ReturnURL=/Pages/TrainingPortal/TrainingPortal.aspx'
    }
    componentDidMount() {
        this.context.hideRefresh();
    }
    render() {
        let string = this.getJsCode();
        return (
            <WebView
                allowFileAccess={true}
                domStorageEnabled={true}
                source={{ uri: this.getUrl() }}
                injectedJavaScript={string}
                javaScriptEnabled={true}
            />
        )
    }
}
/**
 * @const function mapStateToProps
 * @description It will map the redux state to this component
 * @param {*} state
 * @returns Object
 * @memberof CallPlans
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */
const mapStateToProps = state => {
    return {
        user: getUser(state),
    }
}

/**
 * @const function mapDispatchToProps
 * @description It will actionable redux methods to this component
 * @param {*} dispatch
 * @returns Object
 * @memberof CallPlans
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */
const mapDispatchToProps = dispatch => bindActionCreators({
    // 
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Web)