/**
 * @namespace Actions/city
 * @file Action creators of city section of this application. 
 * This application uses JSDoc for documentation. Please see official website for reference.
 * Add author tag to the existing function if you edit any existing functionality.
 *
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 */

import {
    GET_CITIES,
    GET_CITIES_SUCCESS,
    GET_CITIES_FAILURE,
} from './types'

/**
 * Action creator of getCalls API failure response.
 * 
 * @function getCities
 * @memberof Actions/city
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @returns {Object}
 */
export function getCities () {
    return {
        type: GET_CITIES
    }
}

/**
 * Action creator of get cities API success response.
 * 
 * @function getCitiesSuccess
 * @memberof Actions/city
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {Array} cities
 * @returns {Object}
 */
export function getCitiesSuccess (cities) {
    return {
        type: GET_CITIES_SUCCESS,
        cities,
    }
}

/**
 * Action creator of get cities API failure response.
 * 
 * @function getCitiesFailure
 * @memberof Actions/city
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {String|Object} error
 * @returns {Object}
 */
export function getCitiesFailure (error) {
    return {
        type: GET_CITIES_FAILURE,
        error,
    }
}