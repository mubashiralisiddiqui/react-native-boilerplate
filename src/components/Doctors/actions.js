import { SUBMIT_DOCTOR_REQUEST, SUBMIT_DOCTOR_REQUEST_SUCCESS, GET_PENDING_DOCTOR_REQUESTS, GET_PENDING_DOCTOR_REQUESTS_SUCCESS, GET_PENDING_DOCTOR_REQUESTS_FAILURE } from "./types"
import { SUBMIT_DOCTOR_REQUEST_FAILURE } from "../../actions/types"

/**
 * Action creator of new doctor request API initialization phase.
 * 
 * @function submitDoctorRequest
 * @memberof Actions/doctor
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @returns {Object}
 */
export function submitDoctorRequest () {
    return {
        type: SUBMIT_DOCTOR_REQUEST,
    }
}


/**
 * Action creator of new doctor request successful response.
 * 
 * @function submitDoctorRequestSuccess
 * @memberof Actions/doctor
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {Object} request
 * @returns {Object}
 */
export function submitDoctorRequestSuccess (request) {
    return {
        type: SUBMIT_DOCTOR_REQUEST_SUCCESS,
        request,
    }
}

/**
 * Action creator of new doctor request failed response.
 * 
 * @function submitDoctorRequestFailure
 * @memberof Actions/doctor
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {String|Object} error
 * @returns {Object}
 */
export function submitDoctorRequestFailure (error) {
    return {
        type: SUBMIT_DOCTOR_REQUEST_FAILURE,
        error,
    }
}

export function getPendingDoctorRequests() {
    return {
        type: GET_PENDING_DOCTOR_REQUESTS,
    }
}

export function getPendingDoctorRequestsSuccess(data) {
    return {
        type: GET_PENDING_DOCTOR_REQUESTS_SUCCESS,
        data,
    }
}

export function getPendingDoctorRequestsFailure(error) {
    return {
        type: GET_PENDING_DOCTOR_REQUESTS_FAILURE,
        error,
    }
}