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
 } from '../actions/doctor'
import { removeOldStorageEnteries } from './callServices';

 export const getAllDesignations = (refresh = false) => async (dispatch) => {
    dispatch(getDesignations())
    let dataFromStorage = await getStorage('designations');
    if(dataFromStorage == null || refresh == true) {
        let response = await AxiosSalesForce.post('GetDoctorDesignation');
        response = parse(response.data.d)
        setStorage('designations', stringify(response))
        dispatch(getDesignationsSuccess(response))
        return response;
    }
    dataFromStorage = parse(dataFromStorage)
    dispatch(getDesignationsSuccess(dataFromStorage));
    return dataFromStorage;
 }
 
 export const getAllSpecialities = (refresh) => async (dispatch) => {
    dispatch(getSpecialities())
    let dataFromStorage = await getStorage('specialities');
    if(dataFromStorage == null || refresh == true) {
        let response = await AxiosSalesForce.post('GetDoctorSpeciality');
        response = parse(response.data.d)
        setStorage('specialities', stringify(response))
        dispatch(getSpecialitiesSuccess(response))
        return response;
    }
    dataFromStorage = parse(dataFromStorage)
    dispatch(getSpecialitiesSuccess(dataFromStorage));
    return dataFromStorage;
}

export const createDoctorRequest = (params) => async (dispatch) => {
    dispatch(submitDoctorRequest())
    const response = await post('InsertDoctorRequest', params);
    if(response == 1) {
        dispatch(submitDoctorRequestSuccess(params))
        return response;
    }
    dispatch(submitDoctorRequestFailure('Phone Number already exists'))
    return response
}

export const getDoctorByEmployeeId = (params, refresh = false) => async (dispatch) => {
    dispatch(getDoctorsByEmployee())
    // let dataFromStorage = await getStorage(`doctorsByEmployee${todayDate()}`)
    // if(dataFromStorage == null || refresh == true) {
        return AxiosSalesForce
        .post('GetDoctorsByEmployeeId', params)
        .then(async (response) => {
            const doctors = parse(response.data.d)
            if(doctors.length > 0) {
                await getAllStorageKeys(removeOldStorageEnteries, dateFormatRegexGifts);
            }
            dispatch(getDoctorsByEmployeeSuccess(doctors))
            return response;
        })
        .catch(error => {
            dispatch(getDoctorsByEmployeeFailure(error))
            return error
        })
    // }
}