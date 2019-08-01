import {
  GET_CALLS,
  GET_CALLS_FAILURE,
  GET_CALLS_SUCCESS,
  SUBMIT_CALL,
  SUBMIT_CALL_BULK,
  SUBMIT_CALL_BULK_FAILURE,
  SUBMIT_CALL_BULK_SUCCESS,
  SUBMIT_CALL_FAILURE,
  SUBMIT_CALL_SUCCESS,
  CALLS_SYNCED,
} from '../actions/types';

const initialState = {
  calls: [],
  loading: false,
  error: '',
  submit_data: {},
  submit_call_loader: false
};

export const callsReducer = (state = initialState, action) => {
  console.log(action)
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
    case SUBMIT_CALL: {
      return {
        ...state,
        submit_data: action.submit_data,
        submit_call_loader: true
      }
    }
    case SUBMIT_CALL_SUCCESS: {
      return {
        ...state,
        submit_data: action.submit_data,
        submit_call_loader: false
      }
    }
    case SUBMIT_CALL_FAILURE: {
      return {
        ...state,
        error: action.error,
        submit_call_loader: false
      }
    }
    default:
      return state;
  }
}

export const getCallsLoading = state => state.calls.loading;
export const getCalls = state => {return state.calls.calls};
export const getCallsError = state => state.calls.error;
export const getSubmitData = state => state.calls.submit_data;
export const getSubmitLoader = state => state.calls.submit_call_loader;