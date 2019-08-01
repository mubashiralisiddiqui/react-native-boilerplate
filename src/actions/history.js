import { GET_HISTORY, GET_HISTORY_FAILURE, GET_HISTORY_SUCCESS } from './types';

export const getHistory = () => {
    return {
        type: GET_HISTORY
    }
}

export const getHistorySuccess = history => {
    return {
        type: GET_HISTORY_SUCCESS,
        history,
    }
}

export const getHistoryFailure = () => {
    return {
        type: GET_HISTORY_FAILURE
    }
}
