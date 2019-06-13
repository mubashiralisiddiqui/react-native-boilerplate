import React from 'react'
import {Icon} from 'react-native-elements';
export const brandColors = {
    darkBrown: '#514835',
    green: '#11B14C',
    lightGreen: '#92C83E'
}

export const ceil = value => Math.ceil(value);
export const floor = value => Math.floor(value);
export const random = () => Math.random();

/**
* Returns a random integer between min (inclusive) and max (inclusive).
* The value is no lower than min (or the next integer greater than min
* if min isn't an integer) and no greater than max (or the next integer
* lower than max if max isn't an integer).
* Using Math.round() will give you a non-uniform distribution!
*/
export const  RandomInteger = (min = 1, max = 9999) => {
   min = ceil(min);
   max = floor(max);
   return floor(random() * (max - min + 1)) + min;
}

export const navigationOptions = [
    {
        name: 'call_plans',
        label: 'Call Plans',
        navigateTo: 'CallPlans'
    },{
        name: 'unplanned_visits',
        label: 'Unplanned Visits'
    },{
        name: 'add_doctor',
        label: 'Add New Doctor'
    },{
        name: 'downloads',
        label: 'Downloads'
    },{
        name: 'sample_detaisl',
        label: 'Sample Details'
    },{
        name: 'change_doctor_location',
        label: 'Change Dr Location',
        navigateTo: 'DoctorLocation'
    },{
        name: 'profile',
        label: 'Profile'
    },{
        name: 'saved_data',
        label: 'Saved Data'
    },{
        name: 'logout',
        label: 'Logout',
        navigateTo: 'Login'
    },
];

export const navigationOption = (navigation, title) => {
    return {
        title: title,
        headerStyle: {
            backgroundColor: brandColors.lightGreen,
        },
        headerTintColor: brandColors.darkBrown,
        titleStyle: {
            textAlign: 'center',
            alignSelf: 'center'
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 15,
            textAlign: 'center',
            flex: 1,
        },
        headerLeft: <Icon
            name="more-vertical"
            type="feather"
            size={25}
            color={brandColors.darkBrown}
            iconStyle={{ paddingLeft: 10 }}
            onPress={() => { navigation.openDrawer(); }}
        />,
    }
}