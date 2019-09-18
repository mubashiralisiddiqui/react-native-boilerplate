/**
 * @namespace Actions/gifts
 * @file Action creators of gifts section of this application. 
 * This application uses JSDoc for documentation. Please see official website for reference.
 * Add author tag to the existing function if you edit any existing functionality.
 *
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 */

import { GET_GIFTS, GET_GIFTS_FAILURE, GET_GIFTS_SUCCESS } from './types'


/**
 * Action creator for getting gifts initializations phase
 * 
 * @function getGifts
 * @memberof Actions/gifts
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @returns {Object}
 */
export function getGifts () {
    return {
        type: GET_GIFTS,
    }
}

/**
 * Action creator, triggered when get gifts API returns with a successful response.
 *
 * @function getGiftsSuccess
 * @memberof Actions/gifts
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {Array} gifts
 * @returns {Object}
 */
export function getGiftsSuccess(gifts) {
    return {
        type: GET_GIFTS_SUCCESS,
        gifts,
    }
}

/**
 * Action creator, triggered when getting gifts API returns a failed response
 *
 * @function getGiftsFailure
 * @memberof Actions/gifts
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {String|Object} error
 * @returns {Object}
 */
export function getGiftsFailure(error) {
    return {
        type: GET_GIFTS_FAILURE,
        error: error
    }
}