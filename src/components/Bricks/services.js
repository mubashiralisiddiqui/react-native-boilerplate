import { getMappedBricks, getMappedBricksSuccess, getMappedBricksFailure, requestBrickMapping, requestBrickMappingSuccess, requestBrickMappingFailure, getRequestedMappings, getRequestedMappingsSuccess, getRequestedMappingsFailure } from './actions'
import { get, post } from '../../constants'
import DropDownHolder from '../../classes/Dropdown'
import { alertData } from '../../constants/messages'

export const getAllBricks = params => dispatch => {
    dispatch(getMappedBricks())
    get(`GetMappedBricksByEmployee`, {params})
    .then(response => {
        dispatch(getMappedBricksSuccess(response))
    })
    .catch(error => console.log(error ) || dispatch(getMappedBricksFailure(error)))
}

export const requestBrickMap = (params, callback) => dispatch => {
    dispatch(requestBrickMapping())
    post(`createTerritoryBrickRequest`, params)
    .then(response => {
        dispatch(requestBrickMappingSuccess(response))
        callback();
        DropDownHolder.show(alertData.bricks.requestSuccess)
    })
    .catch(error => console.log(error ) || dispatch(requestBrickMappingFailure(error)))
}



export const getAllRequestedMappings = (params) => dispatch => {
    dispatch(getRequestedMappings())
    get(`getPendingTerritoryBrickRequest`, {params})
    .then(response => {
        dispatch(getRequestedMappingsSuccess(response))
    })
    .catch(error => console.log(error ) || dispatch(getRequestedMappingsFailure(error)))
}