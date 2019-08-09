import {
    setStorage,
    getStorage,
    parse,
    stringify,
    AxiosSalesForce,
    post,
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
 } from '../actions/doctor'

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