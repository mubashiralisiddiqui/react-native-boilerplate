/*
* This file includes all the custom helper functions. All these methods will not be available
* directly to use, make sure to import them first before the usage.
*/

import React from 'react'
import { Icon } from 'react-native-elements';
import moment from 'moment';
import axios from 'axios';
import { AsyncStorage, Dimensions } from 'react-native'
import { loginSuccess } from '../actions/auth'
import { initiateResponseInterceotors } from '../services';

/* 
* Theme colors as designed in the logo composition. All the colors used in the application are derived from here.
* Except for disabled (greyed) color, it uses the default disabled layout.
*/
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
export const  RandomInteger = (min = 1, max = 999999) => {
   min = ceil(min);
   max = floor(max);
   return floor(random() * (max - min + 1)) + min;
}

/* 
* All the menu options for the application, every object's each property is required and should be
* to render the menu option. Any new option / or the priority of the existing option can be changed
* here.
*/
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
        label: 'Saved Data',
        navigateTo: 'SavedData'
    },{
        name: 'logout',
        label: 'Logout',
        navigateTo: 'Login'
    },
];

/*
* This is the method which is responsible for enabling the navigation menu on any container,
* You can provide custom title to show in headers.
*/
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

// Some global styling options
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

// it will return the array with the range provided
export const rangeArray = times => new Array(times).fill(times)

export const baseURL = 'http://portal.hudsonpharma.com/CRMService.svc/';
// export const baseURL = 'http://localhost:12670/CRMService.svc/';

// application token to use for the APIs
export const getToken = 'Fahad';

export const todayDate = (format = 'DD_MM_YYYY') => moment()/*.subtract(2, 'day')*//*.add(2, 'day')*/.format(format)

export const dateFormatRegexCalls = /^W*(calls)(0?[1-9]|[12][0-9]|3[01])[_](0?[1-9]|1[012])[_]\d{4}$/

export const dateFormatRegexProducts = /^W*(products)(0?[1-9]|[12][0-9]|3[01])[_](0?[1-9]|1[012])[_]\d{4}$/

export const dateFormatRegexGifts = /^W*(gifts)(0?[1-9]|[12][0-9]|3[01])[_](0?[1-9]|1[012])[_]\d{4}$/

export const log = (...data) => console.log(data)

export const parse = data => JSON.parse(data)

export const stringify = data => JSON.stringify(data)

export const get = (url, params) => {
    console.log(Axios)
    return Axios.get(url, params)
}

export const post = (url, params) => {
    // initiateResponseInterceotors();
    return Axios.post(url, params, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const getStorage = key => AsyncStorage.getItem(key)

export const setStorage = (key, value) => AsyncStorage.setItem(key, value)

export const Axios = axios.create({
    baseURL: baseURL,
});

export const getOrientation = () => {
    return Dimensions.get('window').width < Dimensions.get('window').height
        ? 'portrait'
        : 'landscape'
}

export const authUser = () => async (dispatch) => {
    let user = await getStorage('user')
    if(user !== null) {
        user = JSON.parse(user);
        dispatch(loginSuccess(user))
        return user;
    }
    return user;
}

export const getProducts = async () => {
    const user = await getStorage('user');
    const products = await getStorage(`${user.LoginId}-products`)
    if(products !== null) {
        return JSON.parse(products)
    }
    return [];
} 

export const getNameFromSelectedSamples = (selectedSamples, productId) => {
    if(selectedSamples[productId] === undefined) return '';
    return selectedSamples[productId].name;
}

export const getQuantityOfTheSelectedSamples = (selectedSamples, productId) => {
    if(selectedSamples[productId] === undefined) return '';
    return selectedSamples[productId].SampleQty;
}

export const getQuantityOrNameOfSelectedGift = (selectedGift, gifts, give = 'name') => {
    if(selectedGift[0] === undefined) return '';
    let gift = gifts.filter(gift => gift.GiftId == selectedGift[0].GiftId)[0]
    if(gift === undefined) return ''
    return give === 'name'
        ? gift.GiftName
        : selectedGift[0].GiftQty;
}

export const array_count = (array) => {
    let count = 0;
    for(var i = 0; i < array.length; ++i){
        if(array[i] !== undefined) count++
    }
    return count;
}

export const getAllStorageKeys = (callback, regex) => {
    return AsyncStorage.getAllKeys((err, keys) => callback(err, keys, regex));
}

export const removeStorage = key => AsyncStorage.removeItem(key)
export const removeStorageMultiple = keys => AsyncStorage.multiRemove(keys)

export const setDefault = (value, setDefault = '') => {
    if(value === undefined) return setDefault;
    if(value === null) return setDefault;
    return value;
}

export const userFullName = user => `${setDefault(user.FirstName)} ${setDefault(user.MiddleName)} ${setDefault(user.LastName)}`