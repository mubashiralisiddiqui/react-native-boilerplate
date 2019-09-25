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
    CallExecutionUnplanned,
    Planner,
    Expense,
    Training,
    ActivityRequest,
    PettyCash,
} from '../containers';
import DrawerContent from './drawercontent'

// this is the Application stack which is wrapped in createstackNavigator
// and it shuold be a stacknavigator  there can be different ways but I use like this

// const CallPlansStack = createStackNavigator({
//     CallPlans,
//     CallExecution,
//     CallExecutionUnplanned,
// })

// const AddNewDoctorStack = createStackNavigator({
//     NewDoctor,
// })

// const CallPlannerStack = createStackNavigator({
//     Planner,
// })
// const ExpenseManagerStack = createStackNavigator({
//     Expense,
// })
// const TrainingPortalStack = createStackNavigator({
//     Training,
// })

// const ActivityRequestStack = createStackNavigator({
//     ActivityRequest,
// })

// const PettyCashStack = createStackNavigator({
//     PettyCash,
// })


// const SamplesStack = createStackNavigator({
//     Samples,
// })
// const AppStack = createStackNavigator({
//     DoctorLocation,
// })

const MainStack = createStackNavigator({
    CallPlans,
    CallExecution,
    CallExecutionUnplanned,
    DoctorLocation,
    Samples,
    NewDoctor,
    Planner,
    Expense,
    Training,
    ActivityRequest,
    PettyCash

    // CallPlans: CallPlansStack,
    // NewDoct: AddNewDoctorStack,
    // Samples: SamplesStack,
    // Main: AppStack,
    // Expense: ExpenseManagerStack,
    // Training: TrainingPortalStack,
    // Planner: CallPlannerStack,
    // Activity: ActivityRequestStack,
    // PettyCash: PettyCashStack,
}, {
    initialRouteName: 'CallPlans'
})
// drawer stack passing Appstack in drawe so that all can be accessible in our  drawerstack
const RootStack = createDrawerNavigator(
    {Main: MainStack},
    // drawer component mean we are using our custom drawer if we dont use it by defautl 
    // drawer path will be shown in side menu like Main which is current in drawer
    {
        unmountInactiveRoutes: true,
        edgeWidth: 50,
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