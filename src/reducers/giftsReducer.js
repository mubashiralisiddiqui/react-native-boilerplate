import {GET_GIFTS, GET_GIFTS_FAILURE, GET_GIFTS_SUCCESS} from '../actions/types'

const initialState = {
    gifts: [],
}

export const giftsReducer = (state = initialState, action) => {
    switch(action.type) {
      case GET_GIFTS:
        return {
          ...state,
        };
      case GET_GIFTS_SUCCESS:
          return {
              ...state,
              gifts: action.gifts
          }
      case GET_GIFTS_FAILURE: {
  
          return {
              ...state,
          }
      }
      default:
        return state;
    }
  }

export const getGifts = state => {return state.gifts};