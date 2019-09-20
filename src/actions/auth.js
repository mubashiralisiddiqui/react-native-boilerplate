/**
 * @namespace Actions/auth
 * @file Action creators of auth section and auth user related actions of this application. 
 * This application uses JSDoc for documentation. Please see official website for reference.
 * Add author tag to the existing function if you edit any existing functionality.
 * 
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 */

import { 
    LOGIN,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    GET_REPORTING_EMPLOYEES,
    GET_REPORTING_EMPLOYEES_SUCCESS,
    GET_REPORTING_EMPLOYEES_FAILURE,
    GET_BACKGROUND_IMAGES,
    GET_BACKGROUND_IMAGES_SUCCESS,
} from './types'


/**
 * Action creator for login
 *
 * @function login
 * @memberof Actions/auth
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @returns {Object}
 */
export function login () {
    return {
        type: LOGIN,
    }
}

/**
 * Action creator for successful login
 *
 * @function loginSuccess
 * @memberof Actions/auth
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {Object} user
 * @returns {Object}
 */
export function loginSuccess(user) {
    return {
        type: LOGIN_SUCCESS,
        user,
    }
}

/**
 * Action creator for failed login response
 *
 * @function loginFailure
 * @memberof Actions/auth
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @returns {Object}
 */
export function loginFailure() {
    return {
        type: LOGIN_FAILURE,
    }
}

/**
 * Action creator for getting reporting employees of specific user
 *
 * @function getReportingEmployees
 * @memberof Actions/auth
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @returns {Object}
 */
export function getReportingEmployees() {
    return {
        type: GET_REPORTING_EMPLOYEES,
    }
}

/**
 * Action creator for successful response of reporting Employees API
 *
 * @function getReportingEmployeesSuccess
 * @memberof Actions/auth
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {Array} employees
 * @returns {Object}
 */
export function getReportingEmployeesSuccess(employees) {
    return {
        type: GET_REPORTING_EMPLOYEES_SUCCESS,
        employees,
    }
}

/**
 * Action creator of failed response of getReportingEmployees API.
 *
 * @function getReportingEmployeesFailure
 * @memberof Actions/auth
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {String|Object} error
 * @returns {Object}
 */
export function getReportingEmployeesFailure(error) {
    return {
        type: GET_REPORTING_EMPLOYEES_FAILURE,
        error,
    }
}

export function getBackgroundImages() {
    return {
        type: GET_BACKGROUND_IMAGES,
    }
}

export function getBackgroundImagesSuccess(images) {
    return {
        type: GET_BACKGROUND_IMAGES_SUCCESS,
        images,
    }
}

export function getBackgroundImagesFailure() {
    return {
        type: GET_REPORTING_EMPLOYEES_FAILURE,
    }
}