import { GET_GIFTS, GET_GIFTS_FAILURE, GET_GIFTS_SUCCESS } from './types'

export const getGifts = () => {
    return {
        type: GET_GIFTS,
    }
}

export function getGiftsSuccess(gifts) {
    return {
        type: GET_GIFTS_SUCCESS,
        gifts,
    }
}

export function getGiftsFailure(error) {
    return {
        type: GET_GIFTS_FAILURE,
        error: error
    }
}