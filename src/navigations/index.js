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


import {
    Login,
    CallPlans,
    DoctorLocation,
    CallExecution,
    NewDoctor,
    Samples,
    AuthCheck,
    SavedData,
    CallExecutionUnplanned,
    WebView,
} from '../containers';
import DrawerContent from './drawercontent'

// this is the Application stack which is wrapped in createstackNavigator
// and it shuold be a stacknavigator  there can be different ways but I use like this

const CallPlansStack = createStackNavigator({
    CallPlans,
    CallExecution,
    CallExecutionUnplanned,
})

const AddNewDoctorStack = createStackNavigator({
    NewDoctor,
})

const WebViewStack = createStackNavigator({
    WebView
})

const SamplesStack = createStackNavigator({
    Samples,
})
const AppStack = createStackNavigator({
    DoctorLocation,
})
// drawer stack passing Appstack in drawe so that all can be accessible in our  drawerstack
const RootStack = createDrawerNavigator({
    CallPlans: CallPlansStack,
    NewDoct: AddNewDoctorStack,
    Samples: SamplesStack,
    Main: AppStack,
    Web: WebViewStack,
},
    // drawer component mean we are using our custom drawer if we dont use it by defautl 
    // drawer path will be shown in side menu like Main which is current in drawer
    {
        unmountInactiveRoutes: true,
        contentComponent: DrawerContent,
        contentOptions: {
            activeTintColor: '#fff',
            activeBackgroundColor: '#6b52ae',
        },
        // initialRouteName: 'SelectInterpreterScreen'
    }
)

// if user logout we will use this one 
const AuthStack = createStackNavigator({
    Login
})

// authloading is where we decide where to send user loginscreen or app 

export default createAppContainer(createSwitchNavigator(
    {
        App: RootStack, // the whole app routes
        Auth: AuthStack, // when user logout
        AuthCheck: AuthCheck, // where we decid where to switch app or auth
    },
    {
        
        initialRouteName: 'AuthCheck'
    }
))