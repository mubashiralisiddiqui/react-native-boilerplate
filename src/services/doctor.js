import {
    setStorage,
    getStorage,
    parse,
    stringify,
    AxiosSalesForce,
    post,
    todayDate,
    getAllStorageKeys,
    dateFormatRegexGifts,
    RSM_ROLE_ID,
    SPO_ROLE_ID,
    dateFormatRegexDoctorsByEmployee,
    NEW_DOCTOR_REQUEST_FAILURE, 
} from '../constants'
import { 
    getDesignations,
    getDesignationsSuccess,
    getDesignationsFailure,
    getSpecialities,
    getSpecialitiesFailure,
    getSpecialitiesSuccess,
    submitDoctorRequest,
    submitDoctorRequestSuccess,
    submitDoctorRequestFailure,
    getDoctorsByEmployee,
    getDoctorsByEmployeeSuccess,
    getDoctorsByEmployeeFailure,
    submitDoctorChangeLocationRequest,
 } from '../actions/doctor'
import { removeOldStorageEnteries } from './callServices';
import DropDownHolder from '../classes/Dropdown';
import { alertData } from '../constants/messages';

 export const getAllDesignations = (refresh = false) => async (dispatch) => {
    dispatch(getDesignations())
    let dataFromStorage = await getStorage('designations');
    if(dataFromStorage == null || refresh == true) {
        let response = await AxiosSalesForce.post('GetDoctorDesignation');
        response = parse(response.data.d)
        setStorage('designations', stringify(response))
        dispatch(getDesignationsSuccess(response))
        // return response;
    } else {
        dataFromStorage = parse(dataFromStorage)
        dispatch(getDesignationsSuccess(dataFromStorage));
    }
    // return dataFromStorage;
 }
 
 export const getAllSpecialities = (refresh) => async (dispatch) => {
    dispatch(getSpecialities())
    let dataFromStorage = await getStorage('specialities');
    if(dataFromStorage == null || refresh == true) {
        let response = await AxiosSalesForce.post('GetDoctorSpeciality');
        response = parse(response.data.d)
        setStorage('specialities', stringify(response))
        dispatch(getSpecialitiesSuccess(response))
    } else {
        dataFromStorage = parse(dataFromStorage)
        dispatch(getSpecialitiesSuccess(dataFromStorage));
    }
}

export const createDoctorRequest = (params) => async (dispatch) => {
    dispatch(submitDoctorRequest())
    const response = await post('InsertDoctorRequest', params);
    if(response == 1) {
        DropDownHolder.show(alertData.doctor.doctorRequestSuccess)
        dispatch(submitDoctorRequestSuccess(params))
    } else {
        DropDownHolder.show(alertData.doctor.doctorRequestFailure)
        dispatch(submitDoctorRequestFailure(NEW_DOCTOR_REQUEST_FAILURE))
    }
    return response;
}

export const getDoctorByEmployeeId = (params, refresh = false) => async (dispatch, getState) => {
    dispatch(getDoctorsByEmployee())
    let dataFromStorage = await getStorage(`doctorsByEmployee${todayDate()}`)
    if(dataFromStorage == null || refresh == true) {
        AxiosSalesForce
        .post('GetDoctorsByEmployeeId', params)
        .then(async (response) => {
            const { auth: { user: {RoleId} } } = getState();
            
            if(RoleId == SPO_ROLE_ID) {
                await getAllStorageKeys(removeOldStorageEnteries, dateFormatRegexDoctorsByEmployee);
                setStorage(`doctorsByEmployee${todayDate()}`, response.data.d)
            }
            const doctors = parse(response.data.d)
            dispatch(getDoctorsByEmployeeSuccess(doctors))
            // return response;
        })
        .catch(error => {
            dispatch(getDoctorsByEmployeeFailure(error))
            // return error
        })
    } else {
        dataFromStorage = parse(dataFromStorage)
        dispatch(getDoctorsByEmployeeSuccess(dataFromStorage))
    }
}

export const changeDoctorLocation = (payload) => dispatch => {
    dispatch(submitDoctorChangeLocationRequest())
    return post(`insertChangeDoctorLocation`, payload)
    .then(response => {
        if(response == 1) {
            DropDownHolder.show(alertData.doctor.locationSuccess)
            dispatch(submitDoctorRequestSuccess())
            return response;
        } else {
            dispatch(submitDoctorRequestFailure())
            return response;
        }
    })
    .catch(console.log)
}