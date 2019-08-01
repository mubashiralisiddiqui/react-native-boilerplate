import {
    GET_CALLS,
    GET_CALLS_FAILURE,
    GET_CALLS_SUCCESS,
    SUBMIT_CALL,
    SUBMIT_CALL_BULK,
    SUBMIT_CALL_BULK_FAILURE,
    SUBMIT_CALL_BULK_SUCCESS,
    SUBMIT_CALL_FAILURE,
    SUBMIT_CALL_SUCCESS,
    CALLS_SYNCED,
} from './types'

export const getCalls = () => {
    return {
        type: GET_CALLS,
    }
}

export function getCallsSuccess(calls) {
    return {
        type: GET_CALLS_SUCCESS,
        calls,
    }
}

export function getCallsFailure(error) {
    return {
        type: GET_CALLS_FAILURE,
        error: error
    }
}

export function submitCall(submit_data) {
    return {
        type: SUBMIT_CALL,
        submit_data
    }
}

export function submitCallSuccess(submit_data) {
    return {
        type: SUBMIT_CALL_SUCCESS,
        submit_data
    }
}

export function submitCallFailure(error) {
    return {
        type: SUBMIT_CALL_FAILURE,
        error
    }
}