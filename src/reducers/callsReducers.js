import { GET_CALLS, GET_CALLS_FAILURE, GET_CALLS_SUCCESS } from '../actions/types';

const initialState = {
  calls: [],
  loading: false,
  error: ''
};

export const callsReducer = (state = initialState, action) => {
    console.log(state, action)
  switch(action.type) {
    case GET_CALLS:
      return {
        ...state,
        loading: true,
      };
    case GET_CALLS_FAILURE:
        return {
            ...state,
            error: 'Some error',
            laoding: false,
        }
    case GET_CALLS_SUCCESS: {

        return {
            ...state,
            calls: action.calls,
            loading: false,
        }
    }
    default:
      return state;
  }
}

export const getCallsLoading = state => state.loading;
export const getCalls = state => {console.log(22222, state);return state.calls};
export const getCallsError = state => state.error;