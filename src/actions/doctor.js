/**
 * @namespace Actions/doctor
 * @file Action creators of doctor section of this application. 
 * This application uses JSDoc for documentation. Please see official website for reference.
 * Add author tag to the existing function if you edit any existing functionality.
 *
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 */

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

/**
 * Action creator of get doctor's designations API initial phase.
 * 
 * @function getDesignations
 * @memberof Actions/doctor
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @returns {Object}
 */
export function getDesignations () {
    return {
        type: GET_DOCTOR_DESIGNATION
    }
}


/**
 * Action creator of get doctor's designations API successful response.
 * 
 * @function getDesignationsSuccess
 * @memberof Actions/doctor
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {Array} designations
 * @returns {Object}
 */
export function getDesignationsSuccess (designations) {
    return {
        type: GET_DOCTOR_DESIGNATION_SUCCESS,
        designations
    }
}

/**
 * Action creator of get doctor's designations API failed response.
 * 
 * @function getDesignationsFailure
 * @memberof Actions/doctor
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {String|Object} error
 * @returns {Object}
 */
export function getDesignationsFailure (error) {
    return {
        type: GET_DOCTOR_DESIGNATION_FAILURE,
        error,
    }
}

/**
 * Action creator of get doctor's specialities API initial phase.
 * 
 * @function getSpecialities
 * @memberof Actions/doctor
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @returns {Object}
 */
export function getSpecialities () {
    return {
        type: GET_DOCTOR_SPECIALITY
    }
}

/**
 * Action creator of get doctor's specialities API success response.
 * 
 * @function getSpecialitiesSuccess
 * @memberof Actions/doctor
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {Array} specialities
 * @returns {Object}
 */
export function getSpecialitiesSuccess (specialities) {
    return {
        type: GET_DOCTOR_SPECIALITY_SUCCESS,
        specialities
    }
}

/**
 * Action creator of get doctor's specialities API failed response.
 * 
 * @function getSpecialitiesFailure
 * @memberof Actions/doctor
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {String|Object} error
 * @returns {Object}
 */
export function getSpecialitiesFailure (error) {
    return {
        type: GET_DOCTOR_SPECIALITY_FAILURE,
        error,
    }
}

/**
 * Action creator of new doctor request API initialization phase.
 * 
 * @function submitDoctorRequest
 * @memberof Actions/doctor
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @returns {Object}
 */
export function submitDoctorRequest () {
    return {
        type: SUBMIT_DOCTOR_REQUEST,
    }
}


/**
 * Action creator of new doctor request successful response.
 * 
 * @function submitDoctorRequestSuccess
 * @memberof Actions/doctor
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {Object} request
 * @returns {Object}
 */
export function submitDoctorRequestSuccess (request) {
    return {
        type: SUBMIT_DOCTOR_REQUEST_SUCCESS,
        request,
    }
}

/**
 * Action creator of new doctor request failed response.
 * 
 * @function submitDoctorRequestFailure
 * @memberof Actions/doctor
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {String|Object} error
 * @returns {Object}
 */
export function submitDoctorRequestFailure (error) {
    return {
        type: SUBMIT_DOCTOR_REQUEST_FAILURE,
        error,
    }
}

/**
 * Action creator of get doctors of specific employee API initial phase.
 * 
 * @function getDoctorsByEmployee
 * @memberof Actions/doctor
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @returns {Object}
 */
export function getDoctorsByEmployee () {
    return {
        type: GET_DOCTORS_BY_EMPLOYEE,
    }
}

/**
 * Action creator of get doctors of specific employee API successful response.
 * 
 * @function getDoctorsByEmployeeSuccess
 * @memberof Actions/doctor
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {String|Object} doctors
 * @returns {Object}
 */
export function getDoctorsByEmployeeSuccess (doctors) {
    return {
        type: GET_DOCTORS_BY_EMPLOYEE_SUCCESS,
        doctors
    }
}

/**
 * Action creator of get doctor's for specific employee failed response.
 * 
 * @function getDoctorsByEmployeeFailure
 * @memberof Actions/doctor
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {String|Object} error
 * @returns {Object}
 */
export function getDoctorsByEmployeeFailure (error) {
    return {
        type: GET_DOCTORS_BY_EMPLOYEE_FAILURE,
        error,
    }
}

/**
 * Action creator of new location for a doctor request API initialization phase.
 * 
 * @function submitDoctorChangeLocationRequestSuccess
 * @memberof Actions/doctor
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @returns {Object}
 */
export function submitDoctorChangeLocationRequest () {
    return {
        type: SUBMIT_CHANGE_DOCTOR_LOCATION_REQUEST
    }
}


/**
 * Action creator of new location for a doctor request API successful response.
 * 
 * @function submitDoctorChangeLocationRequestSuccess
 * @memberof Actions/doctor
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @returns {Object}
 */
export function submitDoctorChangeLocationRequestSuccess () {
    return {
        type: SUBMIT_CHANGE_DOCTOR_LOCATION_REQUEST_SUCCESS
    }
}

/**
 * Action creator of new location for a doctor request API failed response.
 * 
 * @function submitDoctorChangeLocationRequestFailure
 * @memberof Actions/doctor
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @returns {Object}
 */
export function submitDoctorChangeLocationRequestFailure () {
    return {
        type: SUBMIT_CHANGE_DOCTOR_LOCATION_REQUEST_FAILURE
    }
}

/**
 * Action creator of get doctor codes from daily planned calls.
 * 
 * @function getCallsDoctors
 * @memberof Actions/doctor
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {Array} calls
 * @returns {Object}
 */
export function getCallsDoctors (calls) {
    console.log(calls)
    const doctors = _.concat(..._.map(calls, call => call.Doctor && call.Doctor.DoctorCode))
    return {
        type: GET_CALLS_DOCTORS,
        doctors,
    }
}


/**
 * Action creator of get Doctor codes from daily unplanned calls doctors.
 * 
 * @function getUnplannedCallsDoctors
 * @memberof Actions/doctor
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {Array} calls
 * @returns {Object}
 */
export function getUnplannedCallsDoctors (calls) {
    const doctors = _.concat(..._.map(calls, call => call.Doctor && call.Doctor.DoctorCode))
    return {
        type: GET_UNPLANNED_CALLS_DOCTORS,
        doctors,
    }
}