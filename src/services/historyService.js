import { get } from '../constants';
import { getHistory, getHistorySuccess, getHistoryFailure } from '../actions/history'
import { initiateResponseInterceotors } from './index'

export const getDocHistory = (params) => {
    return async (dispatch) => {
        dispatch(getHistory())
        return get(`/getDoctorHistory`, {params}).then(response => {
            if(response !== null && typeof(response) !== 'undefined') {
                dispatch(getHistorySuccess(response))
                return response
            }
            return [];
        })
        .catch(error => {
            dispatch(getHistoryFailure())
        })
    }
}