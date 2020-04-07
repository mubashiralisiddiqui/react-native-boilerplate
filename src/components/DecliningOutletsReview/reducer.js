import {
    GET_DECLINING_CONSG_OUTLETS,
    GET_DECLINING_CONSG_OUTLETS_FAILURE,
    GET_DECLINING_CONSG_OUTLETS_SUCCESS,
    SUBMIT_OUTLET_REVIEW,
    SUBMIT_OUTLET_REVIEW_SUCCESS,
    SUBMIT_OUTLET_REVIEW_FAILURE,
} from './types'
import { createSelector } from 'reselect'

const initialState = {
    declining_outlets: [],
    customers: [],
    loading: false,
    payload: {},
    error: '',
};

export const decliningOutletsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_DECLINING_CONSG_OUTLETS: {
            return {
                ...state,
                loading: true,
            }
        }
        case GET_DECLINING_CONSG_OUTLETS_SUCCESS: {
            return {
                ...state,
                loading: false,
                declining_outlets: action.data,
            }
        }
        case GET_DECLINING_CONSG_OUTLETS_FAILURE: {
            return {
                ...state,
                loading: false, 
                error: action.error,
            }
        }
    }
}

export const getDecliningOutletsLoading = state = state.declining_outlets.loading
export const getDecliningOutlets = state = state.declining_outlets.declining_outlets

