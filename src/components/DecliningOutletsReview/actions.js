import {
    GET_DECLINING_CONSG_OUTLETS,
    GET_DECLINING_CONSG_OUTLETS_FAILURE,
    GET_DECLINING_CONSG_OUTLETS_SUCCESS,
    SUBMIT_OUTLET_REVIEW,
    SUBMIT_OUTLET_REVIEW_SUCCESS,
    SUBMIT_OUTLET_REVIEW_FAILURE,
} from './types'

export function getDecliningOutlets() {
    return {
        type: GET_DECLINING_CONSG_OUTLETS,
    }
}

export function getDecliningOutletsSuccess(data) {
    return {
        type: GET_DECLINING_CONSG_OUTLETS_SUCCESS,
        data,
    }
}

export function getDecliningOutletsFailure(error) {
    return {
        type: GET_DECLINING_CONSG_OUTLETS_FAILURE,
        error,
    }
}

export function submitOutletReview(payload) {
    return {
        type: SUBMIT_OUTLET_REVIEW,
        payload,
    }
}

export function submitOutletReviewSuccess(data) {
    return {
        type: SUBMIT_OUTLET_REVIEW_SUCCESS,
        data,
    }
}

export function submitOutletReviewFailure(error) {
    return {
        type: SUBMIT_OUTLET_REVIEW_FAILURE,
        error,
    }
}

