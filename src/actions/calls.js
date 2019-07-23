import { GET_CALLS, GET_CALLS_FAILURE, GET_CALLS_SUCCESS } from './types'

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