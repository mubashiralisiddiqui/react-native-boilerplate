import { 
    GET_DOCTOR_DESIGNATION,
    GET_DOCTOR_DESIGNATION_FAILURE,
    GET_DOCTOR_DESIGNATION_SUCCESS,
    GET_DOCTOR_SPECIALITY,
    GET_DOCTOR_SPECIALITY_FAILURE,
    GET_DOCTOR_SPECIALITY_SUCCESS,
    SUBMIT_DOCTOR_REQUEST,
    SUBMIT_DOCTOR_REQUEST_FAILURE,
    SUBMIT_DOCTOR_REQUEST_SUCCESS,
 } from './types'

export const getDesignations = () => {
    return {
        type: GET_DOCTOR_DESIGNATION
    }
}


export const getDesignationsSuccess = (designations) => {
    return {
        type: GET_DOCTOR_DESIGNATION_SUCCESS,
        designations
    }
}

export const getDesignationsFailure = (error) => {
    return {
        type: GET_DOCTOR_DESIGNATION_FAILURE,
        error,
    }
}

export const getSpecialities = () => {
    return {
        type: GET_DOCTOR_SPECIALITY
    }
}

export const getSpecialitiesSuccess = (specialities) => {
    return {
        type: GET_DOCTOR_SPECIALITY_SUCCESS,
        specialities
    }
}

export const getSpecialitiesFailure = (error) => {
    return {
        type: GET_DOCTOR_SPECIALITY_FAILURE,
        error,
    }
}

export const submitDoctorRequest = () => {
    return {
        type: SUBMIT_DOCTOR_REQUEST,
    }
}


export const submitDoctorRequestSuccess = (request) => {
    return {
        type: SUBMIT_DOCTOR_REQUEST_SUCCESS,
        request,
    }
}

export const submitDoctorRequestFailure = (error) => {
    return {
        type: SUBMIT_DOCTOR_REQUEST_FAILURE,
        error,
    }
}