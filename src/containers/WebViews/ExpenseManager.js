import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { NetworkContext } from '../../components/NetworkProvider';
import { getUser } from '../../reducers/authReducer';
import {connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { navigationOption, jsCodeForWebViews } from '../../constants';
import { ScreenLoader } from '../../components';

class Web extends Component {
    state = {
        loading: true
    }
    static contextType = NetworkContext;
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Expense Manager'))

    getUrl = () => {
        return 'http://portal.hudsonpharma.com/Login.aspx?ReturnURL=/Pages/ExpensePortal/ExpensePortal.aspx'
    }
    render() {
        let string = jsCodeForWebViews(this.props.user);
        return (

            <WebView
                source={{ uri: this.getUrl() }}
                injectedJavaScript={string}
                javaScriptEnabled={true}
                renderLoading={ScreenLoader}
                startInLoadingState={true}
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