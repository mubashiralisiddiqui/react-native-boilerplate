import {LOGIN, LOGIN_CHECK, LOGIN_FAILURE, LOGIN_SUCCESS} from '../actions/types'

const initialState = {
    user: {},
    loading: false,
    error: ''
};

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
      case LOGIN:
        return {
          ...state,
          loading: true,
        };
      case LOGIN_FAILURE:
          return {
              ...state,
              error: 'Invalid Credentials',
              laoding: false,
          }
      case LOGIN_SUCCESS: {
  
          return {
              ...state,
              user: action.user,
              loading: false,
          }
      }
      case LOGIN_CHECK: {
          return {
              ...state
          }
      }
      default:
        return state;
    }
  }

  export const getLoginLoding = state => state.auth.loading
  export const getLoginError = state => state.auth
  export const getUser = state => {return state.auth.user}