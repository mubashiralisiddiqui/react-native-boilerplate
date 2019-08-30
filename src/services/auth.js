import { post, setStorage, userFullName, getStorage, todayDate, get } from '../constants';
import { login, loginSuccess, loginFailure, getReportingEmployees, getReportingEmployeesSuccess, getReportingEmployeesFailure } from '../actions/auth'
import { getDoctorByEmployeeId } from './doctor';

export const loginUser = (params, onSuccess, onFailure) => {
    return dispatch => {
        // initiateResponseInterceotors();
        dispatch(login())
        return post('loginUser', params).then(response => {
            if(response.length > 0) {
                let user = response[0];
                user.FullName = userFullName(user).replace('.', '');
                dispatch(loginSuccess(user))
                setStorage('user', JSON.stringify(user))
                onSuccess();
                return;
            }
            dispatch(loginFailure())
            onFailure();
        }).catch(error => dispatch(loginFailure()))
    }
}

export const getEmployees = (params, refresh) => async (dispatch, getState) => {
    dispatch(getReportingEmployees())
    let dataFromStorage = await getStorage(`reportingEmployees${todayDate()}`)
    if(dataFromStorage == null || refresh == true) {
        return get('GetReportingEmployees', { params })
        .then(response => {
            const { auth: { user: { EmployeeId, FullName} } } = getState();
            dispatch(getReportingEmployeesSuccess(_.concat([{ Id: EmployeeId, Value: FullName }], response)))
            // return response
        })
        .catch(error => {
            dispatch(getReportingEmployeesFailure())
            // return error;
        })
    }
}