import {
    GET_CITIES,
    GET_CITIES_SUCCESS,
    GET_CITIES_FAILURE,
} from './types'

export const getCities = () => {
    return {
        type: GET_CITIES
    }
}

export const getCitiesSuccess = (cities) => {
    return {
        type: GET_CITIES_SUCCESS,
        cities,
    }
}

export const getCitiesFailure = (error) => {
    return {
        type: GET_CITIES_FAILURE,
        error,
    }
}