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
    GET_DOCTORS_BY_EMPLOYEE,
    GET_DOCTORS_BY_EMPLOYEE_SUCCESS,
    GET_DOCTORS_BY_EMPLOYEE_FAILURE,
    SUBMIT_CHANGE_DOCTOR_LOCATION_REQUEST,
    SUBMIT_CHANGE_DOCTOR_LOCATION_REQUEST_FAILURE,
    SUBMIT_CHANGE_DOCTOR_LOCATION_REQUEST_SUCCESS,
    GET_CALLS_DOCTORS,
    GET_UNPLANNED_CALLS_DOCTORS,
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

export const getDoctorsByEmployee = () => {
    return {
        type: GET_DOCTORS_BY_EMPLOYEE,
    }
}

export const getDoctorsByEmployeeSuccess = (doctors) => {
    return {
        type: GET_DOCTORS_BY_EMPLOYEE_SUCCESS,
        doctors
    }
}

export const getDoctorsByEmployeeFailure = (error) => {
    return {
        type: GET_DOCTORS_BY_EMPLOYEE_FAILURE,
        error,
    }
}

export const submitDoctorChangeLocationRequest = () => {
    return {
        type: SUBMIT_CHANGE_DOCTOR_LOCATION_REQUEST
    }
}


export const submitDoctorChangeLocationRequestSuccess = () => {
    return {
        type: SUBMIT_CHANGE_DOCTOR_LOCATION_REQUEST_SUCCESS
    }
}

export const submitDoctorChangeLocationRequestFailure = () => {
    return {
        type: SUBMIT_CHANGE_DOCTOR_LOCATION_REQUEST_FAILURE
    }
}

export const getCallsDoctors = (calls) => {
    const doctors = _.concat(..._.map(calls, call => call.Doctor.DoctorCode))
    return {
        type: GET_CALLS_DOCTORS,
        doctors,
    }
}


export const getUnplannedCallsDoctors = (calls) => {
    const doctors = _.concat(..._.map(calls, call => call.Doctor.DoctorCode))
    return {
        type: GET_UNPLANNED_CALLS_DOCTORS,
        doctors,
    }
}