/**
 * @namespace Actions/calls
 * @file Action creators of calls section of this application. 
 * This application uses JSDoc for documentation. Please see official website for reference.
 * Add author tag to the existing function if you edit any existing functionality.
 * 
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 */

import {
    GET_CALLS,
    GET_CALLS_FAILURE,
    GET_CALLS_SUCCESS,
    SUBMIT_CALL,
    SUBMIT_CALL_FAILURE,
    SUBMIT_CALL_SUCCESS,
    GET_UNPLANNED_CALLS,
    GET_UNPLANNED_CALLS_SUCCESS,
    GET_UNPLANNED_CALLS_FAILURE,
} from './types'

/**
 * Action creator of getCalls API initial phase.
 * 
 * @function getCalls
 * @memberof Actions/calls
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @returns {Object}
 */
export function getCalls () {
    return {
        type: GET_CALLS,
    }
}

/**
 * Action creator of getCalls API successful response.
 * 
 * @function getCallsSuccess
 * @memberof Actions/calls
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {Array} calls
 * @returns {Object}
 */
export function getCallsSuccess(calls) {
    return {
        type: GET_CALLS_SUCCESS,
        calls,
    }
}

/**
 * Action creator of getCalls API failure response.
 * 
 * @function getCallsFailure
 * @memberof Actions/calls
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {String|Object} error
 * @returns {Object}
 */
export function getCallsFailure(error) {
    return {
        type: GET_CALLS_FAILURE,
        error: error
    }
}

/**
 * Action creator of submit call API initial phase.
 * 
 * @function submitCall
 * @memberof Actions/calls
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {Object} submit_data request payload
 * @returns {Object}
 */
export function submitCall(submit_data) {
    return {
        type: SUBMIT_CALL,
        submit_data
    }
}

/**
 * Action creator of submit call success API response.
 * 
 * @function submitCallSuccess
 * @memberof Actions/calls
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {Object} submit_data request payload
 * @returns {Object}
 */
export function submitCallSuccess(submit_data) {
    return {
        type: SUBMIT_CALL_SUCCESS,
        submit_data
    }
}

/**
 * Action creator of submit call API failure response.
 * 
 * @function submitCallFailure
 * @memberof Actions/calls
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {String|Object} error
 * @returns {Object}
 */
export function submitCallFailure(error) {
    return {
        type: SUBMIT_CALL_FAILURE,
        error
    }
}

/**
 * Action creator of get unplanned Calls API initial phase.
 * 
 * @function getUnplannedCalls
 * @memberof Actions/calls
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @returns {Object}
 */
export function getUnplannedCalls() {
    return {
        type: GET_UNPLANNED_CALLS
    }
}

/**
 * Action creator of unplanned calls API successful response.
 * 
 * @function getUnplannedCallsSuccess
 * @memberof Actions/calls
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {Array} unplanned_calls
 * @returns {Object}
 */
export function getUnplannedCallsSuccess(unplanned_calls) {
    return {
        type: GET_UNPLANNED_CALLS_SUCCESS,
        unplanned_calls: unplanned_calls || [],
    }
}

/**
 * Action creator of unplanned calls API failed response.
 * 
 * @function getUnplannedCallsFailure
 * @memberof Actions/calls
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {String|Object} error
 * @returns {Object}
 */
export function getUnplannedCallsFailure(error) {
    return {
        type: GET_UNPLANNED_CALLS_FAILURE,
        error,
    }
}