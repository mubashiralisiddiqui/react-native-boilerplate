import {LOGIN, LOGIN_CHECK, LOGIN_FAILURE, LOGIN_SUCCESS, GET_REPORTING_EMPLOYEES, GET_REPORTING_EMPLOYEES_SUCCESS, GET_REPORTING_EMPLOYEES_FAILURE} from './types'

export const login = () => {
    return {
        type: LOGIN,
    }
}

export const getUser = () => {
    return {
        type: LOGIN,
    }
}

export function loginSuccess(user) {
    return {
        type: LOGIN_SUCCESS,
        user,
    }
}

export function loginCheck() {
    return {
        type: LOGIN_CHECK,
    }
}

export function loginFailure() {
    return {
        type: LOGIN_FAILURE,
    }
}

export function getReportingEmployees() {
    return {
        type: GET_REPORTING_EMPLOYEES,
    }
}

export function getReportingEmployeesSuccess(employees) {
    return {
        type: GET_REPORTING_EMPLOYEES_SUCCESS,
        employees,
    }
}

export function getReportingEmployeesFailure(error) {
    return {
        type: GET_REPORTING_EMPLOYEES_FAILURE,
        error,
    }
}