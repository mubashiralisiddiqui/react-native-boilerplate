import React, { Component } from 'react';
import { WebView } from 'react-native';
import { NetworkContext } from '../../components/NetworkProvider';
import { getUser } from '../../reducers/authReducer';
import {connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { RSM_ROLE_ID } from '../../constants';

class Web extends Component {
    state = {
        loading: true
    }
    static contextType = NetworkContext;
    static navigationOptions = {
        header: null,
    }

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
        switch(this.props.navigation.getParam('type')) {
            case 'rsm_planner': {
                return this.props.user.RoleId == RSM_ROLE_ID
                ? 'http://portal.hudsonpharma.com/Login.aspx?ReturnURL=/Pages/Planningportal/PlanningPortal_Managers.aspx'
                : 'http://portal.hudsonpharma.com/Login.aspx?ReturnURL=/Pages/Planningportal/planningportal.aspx'
            }
            case 'expense_manager': {
                return 'http://portal.hudsonpharma.com/Login.aspx?ReturnURL=/Pages/ExpensePortal/ExpensePortal.aspx'
            }
            
            case 'training_portal': {
                return 'http://portal.hudsonpharma.com/Login.aspx?ReturnURL=/Pages/TrainingPortal/TrainingPortal.aspx'
            }
            default: {
                return 'https://google.com'
            }
        }
    }
    componentDidMount() {
        this.context.hideRefresh();
    }
    render() {
        let string = this.getJsCode();
        return (

            <WebView
                source={{ uri: this.getUrl() }}
                // source={{ uri: 'http://portal.hudsonpharma.com/Login.aspx?ReturnURL=/Pages/PlanningPortal/PlanningPortal.aspx' }}
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