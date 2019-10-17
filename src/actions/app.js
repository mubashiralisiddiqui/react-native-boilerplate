import { GET_APP_VERSION, GET_APP_VERSION_SUCCESS, GET_APP_VERSION_FAILURE, UPDATE_USER_APP_VERSION, UPDATE_USER_APP_VERSION_SUCCESS, UPDATE_USER_APP_VERSION_FAILURE } from "./types"

export function checkAppVersion() {
    return {
        type: GET_APP_VERSION
    }
}

export function checkAppVersionSuccess(version) {
    return {
        type: GET_APP_VERSION_SUCCESS,
        version,
    }
}

export function checkAppVersionFailure() {
    return {
        type: GET_APP_VERSION_FAILURE,
        error,
    }
}



export function updateUserAppVersionToServer(payload) {
    return {
        type: UPDATE_USER_APP_VERSION,
        payload,
    }
}
export function updateUserAppVersionToServerSuccess() {
    return {
        type: UPDATE_USER_APP_VERSION_SUCCESS,
    }
}
export function updateUserAppVersionToServerFailure() {
    return {
        type: UPDATE_USER_APP_VERSION_FAILURE
    }
}