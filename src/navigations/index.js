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

import { Login } from '../containers';



const AppStack = createDrawerNavigator({
    Home: {
        screen: Login
    }
})
const AuthStack = createStackNavigator({
    Login
})

export default createAppContainer(createSwitchNavigator(
    {
        App: AppStack,
        Auth: AuthStack
    },
    {
        initialRouteName: 'App'
    }
))