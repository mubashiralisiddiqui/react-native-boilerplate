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
  UPDATE_DOCTOR_REQUEST,
  UPDATE_DOCTOR_REQUEST_SUCCESS,
  UPDATE_DOCTOR_REQUEST_FAILURE,
} from '../actions/types'
import { GET_PENDING_DOCTOR_REQUESTS, GET_PENDING_DOCTOR_REQUESTS_SUCCESS, GET_PENDING_DOCTOR_REQUESTS_FAILURE } from '../components/Doctors/types';
import { getCalls, getUnplannedCalls } from './callsReducers';
import { createSelector } from 'reselect';

const initialState = {
  specialities: [],
  designations: [],
  error: '',
  loading: false,
  request: '',
  doctors: [], // Doctors by employee
  update_doctor_payload: {},
  update_doctor_loader: false,
  pending_requests: [],
}

export const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
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
        ...state,
        loading: true,
      }
    }
    case GET_DOCTORS_BY_EMPLOYEE_SUCCESS: {
      return {
        ...state,
        doctors: action.doctors,
        loading: false,
      }
    }
    case GET_DOCTORS_BY_EMPLOYEE_FAILURE: {
      return {
        ...state,
        error: action.error,
        loading: false
      }
    }
    case SUBMIT_CHANGE_DOCTOR_LOCATION_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }
    case SUBMIT_CHANGE_DOCTOR_LOCATION_REQUEST_SUCCESS: {
      return {
        ...state,
        loading: false
      }
    }
    case SUBMIT_CHANGE_DOCTOR_LOCATION_REQUEST_FAILURE: {
      return {
        ...state,
        loading: false
      }
    }
    case GET_CALLS_DOCTORS: {
      return {
        ...state,
        calls_doctors: action.doctors
      }
    }
    case GET_UNPLANNED_CALLS_DOCTORS: {
      return {
        ...state,
        unplanned_calls_doctors: action.doctors
      }
    }

    case UPDATE_DOCTOR_REQUEST: {
      return {
        ...state,
        update_doctor_loader: true,
        update_doctor_payload: action.payload
      }
    }
    case UPDATE_DOCTOR_REQUEST_SUCCESS: {
      return {
        ...state,
        update_doctor_loader: false,
      }
    }
    case UPDATE_DOCTOR_REQUEST_FAILURE: {
      return {
        ...state,
        update_doctor_loader: false,
      }
    }
    case GET_PENDING_DOCTOR_REQUESTS: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_PENDING_DOCTOR_REQUESTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        pending_requests: action.data,
      }
    }
    case GET_PENDING_DOCTOR_REQUESTS_FAILURE: {
      return {
        ...state,
        loading: false,
      }
    }

    default:
      return state;
  }
}
const extractDoctorCodes = calls =>  _.concat(..._.map(calls, call => call.Doctor && call.Doctor.DoctorCode))
export const getDesignations = state => state.doctor.designations;
export const getSpecialities = state => state.doctor.specialities;
export const getDoctorRequestLoader = state => state.doctor.loading;
export const getDoctors = state => state.doctor.doctors
export const getError = state => state.doctor.error
export const getCallDoctors = createSelector(getCalls, extractDoctorCodes);
export const getUnplannedCallDoctors = createSelector(getUnplannedCalls, extractDoctorCodes)
export const getUpdateDoctorLoader = state => state.doctor.update_doctor_loader;
export const getPendingRequests = state => state.doctor.pending_requests;