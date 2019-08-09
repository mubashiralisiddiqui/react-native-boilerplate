import {
    GET_CITIES,
    GET_CITIES_SUCCESS,
    GET_CITIES_FAILURE,
} from '../actions/types'

const initialState = {
    cities: [],
    error: ''
}

export const cityReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CITIES: {
            return {
                ...state
            }
        }
        case GET_CITIES_SUCCESS: {
            return {
                ...state,
                cities: action.cities
            }
        }
        case GET_CITIES_FAILURE: {
            return {
                ...state,
                error: action.error
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export const getCities = (state) => state.cities.cities;