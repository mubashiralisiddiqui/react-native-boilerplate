import { post, setStorage, userFullName, getStorage, todayDate, get } from '../constants';
import { login, loginSuccess, loginFailure, getReportingEmployees, getReportingEmployeesSuccess, getReportingEmployeesFailure } from '../actions/auth'
import { initiateResponseInterceotors } from './index'

export const loginUser = (params, onSuccess, onFailure) => {
    return dispatch => {
        // initiateResponseInterceotors();
        dispatch(login())
        return post('loginUser', params).then(response => {
            if(response.length > 0) {
                let user = response[0];
                user.FullName = userFullName(user);
                dispatch(loginSuccess(user))
                setStorage('user', JSON.stringify(user))
                onSuccess();
                return;
            }
            onFailure();
        }).catch(error => dispatch(loginFailure()))
    }
}

export const getEmployees = (params, refresh) => async (dispatch) => {
    dispatch(getReportingEmployees())
    let dataFromStorage = await getStorage(`reportingEmployees${todayDate()}`)
    if(dataFromStorage == null || refresh == true) {
        return get('GetReportingEmployees', { params })
        .then(response => {
            dispatch(getReportingEmployeesSuccess(response))
            return response
        })
        .catch(error => {
            dispatch(getReportingEmployeesFailure())
            return error;
        })
    }
}