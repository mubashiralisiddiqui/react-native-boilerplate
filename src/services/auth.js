import { post, setStorage, userFullName, getStorage, todayDate, get, getToken } from '../constants';
import { login, loginSuccess, loginFailure, getReportingEmployees, getReportingEmployeesSuccess, getReportingEmployeesFailure, getBackgroundImagesSuccess, getBackgroundImagesFailure } from '../actions/auth'
import { getDoctorByEmployeeId } from './doctor';
import { updateUserAppVersionToServerSuccess, updateUserAppVersionToServer, updateUserAppVersionToServerFailure } from '../actions/app';

export const loginUser = (params, onSuccess, onFailure) => {
    return dispatch => {
        dispatch(login())
        post('loginUser', params).then(response => {

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
        }).catch(error => alert(error + '') || dispatch(loginFailure()))
    }
}

export const getEmployees = (params, refresh) => async (dispatch, getState) => {
    dispatch(getReportingEmployees())
    let dataFromStorage = await getStorage(`reportingEmployees${todayDate()}`)
    if(dataFromStorage == null || refresh == true) {
        get('GetReportingEmployees', { params })
        .then(response => {
            const { auth: { user: { EmployeeId, FullName} } } = getState();
            dispatch(getReportingEmployeesSuccess(_.concat([{ Id: EmployeeId, Value: FullName }], response)))
        })
        .catch(error => {
            dispatch(getReportingEmployeesFailure())
        })
    }
}

export const getBackgroundImages = () => async (dispatch) => {
    console.log('called');
    // dispatch(getBackgroundImages())
    post('GetImagesForSMApp',{
            Token: getToken,
        })
    .then(response => {
        console.log(response)
        dispatch(getBackgroundImagesSuccess(response))
    })
    // .catch(error => console.log(error) || dispatch(getBackgroundImagesFailure()))
}

export const updateUserAppVersion = (params) => (dispatch) => {
    dispatch(updateUserAppVersionToServer(params))
    post('UpdateAppVersion', params)
    .then(response => {
        dispatch(updateUserAppVersionToServerSuccess())
    })
    .catch(error => {
        dispatch(updateUserAppVersionToServerFailure())
    })
}