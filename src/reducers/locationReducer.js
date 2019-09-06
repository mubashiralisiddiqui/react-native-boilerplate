import {
    GET_CURRENT_LOCATION,
    GET_CURRENT_LOCATION_SUCCESS,
    GET_CURRENT_LOCATION_FAILURE,
} from '../actions/types'

const initialState = {
  lat: '',
  long: '',
  isFetching: true,
  error: ''
};

export const locationReducer = (state = initialState, action) => {
    switch(action.type) {
    case GET_CURRENT_LOCATION:
        return {
            ...state,
            isFetching: true,
        };
    case GET_CURRENT_LOCATION_SUCCESS:
        return {
            ...state,
            lat: action.coords.lat,
            long: action.coords.long,
            isFetching: false,
        }
    case GET_CURRENT_LOCATION_FAILURE: {
        return {
            ...state,
            error: action.error,
            isFetching: true,
        }
    }
    default:
        return state;
    }
}

export const getLat = state => state.location.lat;
export const getLong = state => state.location.long;
export const getLocationError = state => state.location.error;
export const isFetching = state => state.location.isFetching;