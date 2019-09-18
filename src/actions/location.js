/**
 * @namespace Actions/location
 * @file Action creators of geolocation section of this application. 
 * This application uses JSDoc for documentation. Please see official website for reference.
 * Add author tag to the existing function if you edit any existing functionality.
 *
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 */

 import {
    GET_CURRENT_LOCATION,
    GET_CURRENT_LOCATION_SUCCESS,
    GET_CURRENT_LOCATION_FAILURE,
} from './types'

/**
 * Action creator, triggers when app starts fetching the GPS location of the application.
 *
 * @function getLocation
 * @memberof Actions/location
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @returns {Object}
 */
export function getLocation () {
    return {
        type: GET_CURRENT_LOCATION,
    }
}

/**
 * Action creator, triggers when the app successfuly get the location coordinates of the device
 *
 * @function getLocationSuccess
 * @memberof Actions/location
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {Object} coords
 * @returns {Object}
 */
export function getLocationSuccess (coords) {
    return {
        type: GET_CURRENT_LOCATION_SUCCESS,
        coords,
    }
}

/**
 * Action creator, triggers when navigator returns any exception / error
 *
 * @function getLocationFailure
 * @memberof Actions/location
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {String|Object} error
 * @returns {Object}
 */
export function getLocationFailure (error) {
    return {
        type: GET_CURRENT_LOCATION_FAILURE,
        error,
    }
}