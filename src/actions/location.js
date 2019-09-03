import {
    GET_CURRENT_LOCATION,
    GET_CURRENT_LOCATION_SUCCESS,
    GET_CURRENT_LOCATION_FAILURE,
} from './types'

export const getLocation = () => {
    return {
        type: GET_CURRENT_LOCATION,
    }
}

export const getLocationSuccess = (coords) => {
    return {
        type: GET_CURRENT_LOCATION_SUCCESS,
        coords,
    }
}

export const getLocationFailure = (error) => {
    return {
        type: GET_CURRENT_LOCATION_FAILURE,
        error,
    }
}