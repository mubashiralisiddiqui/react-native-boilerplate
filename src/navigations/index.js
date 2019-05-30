/**
 *  setting up routes 
 */
import {
    createAppContainer,
    createSwitchNavigator,
    createStackNavigator,
    createDrawerNavigator
} from 'react-navigation';

// All views 
import { Login, AuthLoading, CallPlans} from '../containers';

const AppStack = createDrawerNavigator({
    Home: {
        screen: Login
    },
    CallPlans: {
        screen: CallPlans,
        navigationOptions: {
            title: 'Daily Calls',
            drawerLabel: "Daily Calls"
        },
    }
})
const AuthStack = createStackNavigator({
    Login
})

export default createAppContainer(createSwitchNavigator(
    {
        App: AppStack,
        Auth: AuthStack,
        AuthLoading: AuthLoading,
        CallPlans
    },
    {
        initialRouteName: 'AuthLoading'
    }
))