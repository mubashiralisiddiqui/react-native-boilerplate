import { post, get } from "../../constants";
import DropDownHolder from "../../classes/Dropdown";
import { submitDoctorRequest, submitDoctorRequestSuccess, submitDoctorRequestFailure, getPendingDoctorRequests, getPendingDoctorRequestsSuccess, getPendingDoctorRequestsFailure } from "./actions";
import { alertData } from "../../constants/messages";

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

export const getPendingRequests = (params) => (dispatch) => {
    dispatch(getPendingDoctorRequests())
    get(`GetPendingDoctorRequests`, { params })
    .then(response => {
        dispatch(getPendingDoctorRequestsSuccess(response))
    })
    .catch(error => dispatch(getPendingDoctorRequestsFailure(error)))
}