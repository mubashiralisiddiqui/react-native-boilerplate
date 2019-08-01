import {LOGIN, LOGIN_CHECK, LOGIN_FAILURE, LOGIN_SUCCESS} from './types'

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
    console.log('success jani')
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