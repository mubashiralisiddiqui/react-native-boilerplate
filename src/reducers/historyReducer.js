import {GET_HISTORY, GET_HISTORY_FAILURE, GET_HISTORY_SUCCESS} from '../actions/types'

const initialState = {
    history: [],
}

export const historyReducer = (state = initialState, action) => {
    switch(action.type) {
      case GET_HISTORY:
        return {
          ...state,
        };
      case GET_HISTORY_SUCCESS:
          return {
              ...state,
              history: action.history
          }
      case GET_HISTORY_FAILURE: {
  
          return {
              ...state,
          }
      }
      default:
        return state;
    }
  }

export const getHistorys = state => {return state.history};