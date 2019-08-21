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
 } from '../actions/types'

const initialState = {
    specialities: [],
    designations: [],
    error: '',
    loading: false,
    request: '',
    doctors: [], // Doctors by employee
}

export const doctorReducer = (state = initialState, action) => {
    switch(action.type) {
      case GET_DOCTOR_DESIGNATION:
        return {
          ...state,
        };
      case GET_DOCTOR_DESIGNATION_SUCCESS:
          return {
              ...state,
              designations: action.designations
          }
      case GET_DOCTOR_DESIGNATION_FAILURE: {
  
          return {
              ...state,
              error: action.error
          }
      }
      case GET_DOCTOR_SPECIALITY:
        return {
          ...state,
        };
      case GET_DOCTOR_SPECIALITY_SUCCESS:
          return {
              ...state,
              specialities: action.specialities
          }
      case GET_DOCTOR_SPECIALITY_FAILURE: {
  
          return {
              ...state,
              error: action.error
          }
      }
      case SUBMIT_DOCTOR_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case SUBMIT_DOCTOR_REQUEST_SUCCESS:
        return {
            ...state,
            specialities: action.specialities,
            loading: false,
        }
      case SUBMIT_DOCTOR_REQUEST_FAILURE: {
        return {
            ...state,
            error: action.error,
            loading: false,
        }
      }
      case GET_DOCTORS_BY_EMPLOYEE: {
        return {
          ...state
        }
      }
      case GET_DOCTORS_BY_EMPLOYEE_SUCCESS: {
        return {
          ...state,
          doctors: action.doctors
        }
      }
      case GET_DOCTORS_BY_EMPLOYEE_FAILURE: {
        return {
          ...state,
          error: action.error
        }
      }
      default:
        return state;
    }
  }

export const getDesignations = state => state.doctor.designations;
export const getSpecialities = state => state.doctor.specialities;
export const getDoctorRequestLoader = state => state.doctor.loading;
export const getDoctors = state => state.doctor.doctors