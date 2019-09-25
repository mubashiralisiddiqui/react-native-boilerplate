import { GET_APP_VERSION, GET_APP_VERSION_SUCCESS, GET_APP_VERSION_FAILURE } from "../actions/types";


const initialState = {
    version: { version: '' },
    error: '',
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
      default:
        return state;
    }
}

export const getVersion = state => state.app.version