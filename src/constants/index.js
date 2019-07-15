import React from 'react'
import { Icon } from 'react-native-elements';
import moment from 'moment';
import axios from 'axios';
import { AsyncStorage } from 'react-native'

export const brandColors = {
    darkBrown: '#514835',
    green: '#11B14C',
    lightGreen: '#92C83E',
    overlayColor: 'rgba(81,72,53,.7)',
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
        label: 'Unplanned Visits',
        navigateTo: 'CallExecution',
    },{
        name: 'add_doctor',
        label: 'Add New Doctor',
        navigateTo: 'NewDoctor',
    },{
        name: 'downloads',
        label: 'Downloads'
    },{
        name: 'sample_details',
        label: 'Sample Details',
        navigateTo: 'Samples',
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
            name="align-left"
            type="font-awesome"
            size={20}
            color={brandColors.darkBrown}
            iconStyle={{ paddingLeft: 10 }}
            onPress={() => { navigation.openDrawer(); }}
        />,
    }
}

// export const styles = new StyleSheet.create({
export const styles = { 
    container: {
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
    },
    labelStyle: {
        fontWeight: 'bold',
        fontSize: 14,
        color: brandColors.darkBrown,
    },
    inputStyle: {
        color: 'gray'
    }
}

export const rangeArray = times => new Array(times).fill(times)

export const baseURL = 'http://localhost:12670/CRMService.svc/';
export const getToken = 'Fahad';

export const todayDate = (format = 'YYYY_MM_DD') => moment().format(format)

export const log = (...data) => console.log(data)

export const parse = data => JSON.parse(data)

export const stringify = data => JSON.stringify(data)

export const get = (url, params) => Axios.get(url, params)

export const post = (url, params) => Axios.post(url, params)

export const getStorage = key => AsyncStorage.getItem(key)

export const setStorage = (key, value) => AsyncStorage.setItem(key, value)

const Axios = axios.create({
    baseURL: 'http://localhost:12670/CRMService.svc/',
});
