import {LOGIN, LOGIN_CHECK, LOGIN_FAILURE, LOGIN_SUCCESS, GET_REPORTING_EMPLOYEES, GET_REPORTING_EMPLOYEES_SUCCESS, GET_REPORTING_EMPLOYEES_FAILURE, GET_BACKGROUND_IMAGES, GET_BACKGROUND_IMAGES_SUCCESS, GET_BACKGROUND_IMAGES_FAILURE} from '../actions/types'
import { RSM_ROLE_ID, SPO_ROLE_ID } from '../constants';

const initialState = {
    user: {},
    loading: false,
    error: '',
    employees: [],
    background_images: [],
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
              loading: false,
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
      case GET_REPORTING_EMPLOYEES: {
          return {
              ...state
          }
      }
      case GET_REPORTING_EMPLOYEES_SUCCESS: {
          return {
              ...state,
              employees: action.employees,
          }
      }
      case GET_REPORTING_EMPLOYEES_FAILURE: {
          return {
              ...state
          }
      }
      case GET_BACKGROUND_IMAGES_SUCCESS: {
          return {
              ...state,
              background_images: action.images
          }
      }
      default:
        return state;
    }
  }

  export const getLoginLoding = state => state.auth.loading
  export const getLoginError = state => state.auth.error
  export const getUser = state => state.auth.user
  export const getEmployees = state => state.auth.employees
  export const isRSM = state => state.auth.user.RoleId == RSM_ROLE_ID;
  export const isSPO = state => state.auth.user.RoleId == SPO_ROLE_ID;
  export const backgroundImages = state => state.auth.background_images;