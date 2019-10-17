import { GET_APP_VERSION, GET_APP_VERSION_SUCCESS, GET_APP_VERSION_FAILURE, UPDATE_USER_APP_VERSION, UPDATE_USER_APP_VERSION_SUCCESS, UPDATE_USER_APP_VERSION_FAILURE } from "../actions/types";


const initialState = {
    version: { version: '' },
    error: '',
    refreshing: false,
};

export const appReducer = (state = initialState, action) => {
    switch(action.type) {
      case GET_APP_VERSION:
        return {
          ...state,
        };
      case GET_APP_VERSION_SUCCESS: 
        return {
            ...state,
            version: action.version,
        }
      case GET_APP_VERSION_FAILURE: {
        return {
            ...state,
            error: action.error,
        }
      }
      case UPDATE_USER_APP_VERSION: {
        return {
          ...state,
          payload: action.payload,
        }
      }
      case UPDATE_USER_APP_VERSION_SUCCESS: {
        return {
          ...state,
        }
      }
      case UPDATE_USER_APP_VERSION_FAILURE: {
        return {
          ...state,
        }
      }
      default:
        return state;
    }
}

export const getVersion = state => state.app.version
export const getAppRefreshingStatus = state => state.app.refreshing