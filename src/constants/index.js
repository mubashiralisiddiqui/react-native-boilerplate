/*
* This file includes all the custom helper functions. All these methods will not be available
* directly to use, make sure to import them first before the usage.
*/
import React from 'react'
import { Icon, Button } from 'react-native-elements';
import moment from 'moment';
import axios from 'axios';
import { AsyncStorage, Dimensions, View } from 'react-native'
import { loginSuccess } from '../actions/auth'
import { services } from '../services'
import { RFValue } from 'react-native-responsive-fontsize';

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
   return floor(random() * ( Number(max) - Number(min) + 1 )) + Number(min);
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
        navigateTo: 'CallPlans',
        icon: 'calendar-check',
        iconType: 'FontAwesome5'
    },{
        name: 'unplanned_visits',
        label: 'Unplanned Visits',
        navigateTo: 'CallExecutionUnplanned',
        icon: 'calendar-times',
        iconType: 'FontAwesome5'
    },{
        name: 'add_doctor',
        label: 'Add New Doctor',
        navigateTo: 'NewDoctor',
        icon: 'clinic-medical',
        iconType: 'FontAwesome5'
    },{
        name: 'sample_details',
        label: 'Sample Details',
        navigateTo: 'Samples',
        icon: 'medicinebox',
        iconType: 'AntDesign'
    },{
        name: 'change_doctor_location',
        label: 'Change Dr Location',
        navigateTo: 'DoctorLocation',
        icon: 'location-arrow',
        iconType: 'FontAwesome5'
    },{
        name: 'rsm_planner',
        label: 'Call Planner',
        navigateTo: 'WebView',
        icon: 'chart-pie',
        iconType: 'FontAwesome5'
    },{
        name: 'expense_manager',
        label: 'Expense Manager',
        navigateTo: 'WebView',
        icon: 'cash-register',
        iconType: 'FontAwesome5'
    },{
        name: 'training_portal',
        label: 'Training Portal',
        navigateTo: 'WebView',
        icon: 'clipboard-list',
        iconType: 'FontAwesome5'
    },{
        name: 'logout',
        label: 'Logout',
        navigateTo: 'Login',
        icon: 'logout',
        iconType: 'MaterialCommunityIcon',
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
            backgroundColor: brandColors.darkBrown,
        },
        headerTintColor: brandColors.lightGreen,
        titleStyle: {
            // textAlign: 'center',
            // alignSelf: 'center'
        },
        headerTitleStyle: {
            fontFamily: 'Lato-Regular',
            fontSize: RFValue(15),
            textAlign: 'center',
            flex: 1,
            marginRight: RFValue(88)
        },
        headerLeft: <View style={{marginHorizontal:RFValue(140)}}></View>,
        headerLeft: <Button
            type='clear'
            onPress={navigation.openDrawer}
            icon={<Icon
                name="align-left"
                type="font-awesome"
                size={RFValue(25)}
                color={brandColors.lightGreen}
            />}
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
        fontFamily: 'Lato-HeavyItalic',
        fontSize: RFValue(16),
        color: brandColors.darkBrown,
        fontWeight: 'normal'
    },
    inputStyle: {
        color: 'gray'
    }
}

// it will return the array with the range provided
export const rangeArray = times => new Array(times).fill(times)

export const baseURL = 'http://portal.hudsonpharma.com/CRMService.svc/';
export const baseURLSalesForce = 'http://portal.hudsonpharma.com/SalesForce.svc/';
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

export const AxiosSalesForce = axios.create({
    baseURL: baseURLSalesForce,
});

export const getOrientation = () => {
    return Dimensions.get('window').width < Dimensions.get('window').height
        ? 'portrait'
        : 'landscape'
}

export const authUser = () => async (dispatch) => {
    services().authService.loginUser({});
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

export const validate = (rules, values) => {
    const fieldsThatNeedsToValidate = Object.keys(values)
    console.log(fieldsThatNeedsToValidate)
    let errors = {}
    fieldsThatNeedsToValidate.map(field => {
        let rulesToCheck = rules[field] || null;
        Object.keys(rulesToCheck || {}).map(rule => {
            switch(rule) {
                case 'required': {
                    console.log(values[field], values, field)
                    if(`${values[field]}`.trim() == '' || values[field] == null || (!isNaN(values[field]) && values[field] == 0)) {
                        errors[field] = `${field} is required`
                    }
                    return;
                }
                case 'email': {
                    if(! /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values[field].trim())) {
                        errors[field] = errors[field] != undefined
                        ? errors[field]
                        : `Please provide the valid Email`
                    }
                    return;
                }
                case 'required_if': {
                    let checkValues = rulesToCheck.required_if
                    if(values[field] == '' && values[checkValues[0]] == checkValues[1]) {
                        // if(errors[checkValues[0]])
                        errors[field] = `${field} is required when ${checkValues[0]} is not available`;
                    }
                    if(values[field] != '') {
                        delete errors[checkValues[0]]
                    }
                    return;
                }
                default: {
                    errors[field] = ''
                    return;
                }
            }
        })
    })
    return [errors, _.isEmpty(errors)]
}

export const getDistance = (latitudeFrom, longitudeFrom, latitudeTo, longitudeTo, unit = 'meters') => {
	if ((latitudeFrom == latitudeTo) && (longitudeFrom == longitudeTo)) {
		return 0;
	}
    let radlatitudeFrom = Math.PI * latitudeFrom/180;
    let radlatitudeTo = Math.PI * latitudeTo/180;
    let theta = longitudeFrom - longitudeTo;
    let radTheta = Math.PI * theta/180;
    let distance = Math.sin(radlatitudeFrom) * Math.sin(radlatitudeTo) + Math.cos(radlatitudeFrom) * Math.cos(radlatitudeTo) * Math.cos(radTheta);
    distance = distance > 1 ? 1 : distance;
    distance = Math.acos(distance);
    distance = distance * 180/Math.PI;
    distance = distance * 60 * 1.1515 * 1609; // meters
    if (unit=="K") { distance = distance * 1.609344 } // Kilometers
    if (unit=="M") { distance = distance / 1609 } // miles
    return distance;
}

export const RSM_ROLE_ID = 6;
export const SPO_ROLE_ID = 7;

export const getFilesFromProducts = (products, productId) => {
    return products.filter(product => product.ProductTemplateId == productId)[0].Files
}