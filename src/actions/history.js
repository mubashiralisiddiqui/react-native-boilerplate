/**
 * @namespace Actions/history
 * @file Action creators of gifts section of this application. 
 * This application uses JSDoc for documentation. Please see official website for reference.
 * Add author tag to the existing function if you edit any existing functionality.
 *
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 */

import { GET_HISTORY, GET_HISTORY_FAILURE, GET_HISTORY_SUCCESS } from './types';

/**
 * Action creator, triggers when the getting history API initialized
 *
 * @function getHistory
 * @memberof Actions/history
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @returns {Object}
 */
export function getHistory() {
    return {
        type: GET_HISTORY
    }
}

/**
 * Action creator, triggers when getting history API returns a success response
 *
 * @function getHistorySuccess
 * @memberof Actions/history
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {Array} history
 * @returns {Object}
 */
export function getHistorySuccess(history) {
    return {
        type: GET_HISTORY_SUCCESS,
        history,
    }
}

/**
 * Action creator, triggers when the getting history API returns a failed response
 *
 * @function getHistoryFailure
 * @memberof Actions/history
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @returns {Object}
 */
export function getHistoryFailure() {
    return {
        type: GET_HISTORY_FAILURE
    }
}
