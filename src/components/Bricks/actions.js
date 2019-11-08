import { GET_MAPPED_BRICKS, GET_MAPPED_BRICKS_SUCCESS, GET_MAPPED_BRICKS_FAILURE, REQUEST_BRICK_MAPPING, REQUEST_BRICK_MAPPING_SUCCESS, REQUEST_BRICK_MAPPING_FAILURE, GET_REQUESTED_MAPPINGS, GET_REQUESTED_MAPPINGS_SUCCESS, GET_REQUESTED_MAPPINGS_FAILURE } from './types'

export function getMappedBricks() {
    return {
        type: GET_MAPPED_BRICKS,
    }
}

export function getMappedBricksSuccess(data) {
    return {
        type: GET_MAPPED_BRICKS_SUCCESS,
        data: data,
    }
}

export function getMappedBricksFailure(error) {
    return {
        type: GET_MAPPED_BRICKS_FAILURE,
        error: error,
    }
}

export function requestBrickMapping(payload) {
    return {
        type: REQUEST_BRICK_MAPPING,
        payload,
    }
}

export function requestBrickMappingSuccess(data) {
    return {
        type: REQUEST_BRICK_MAPPING_SUCCESS,
        data,
    }
}

export function requestBrickMappingFailure(error) {
    return {
        type: REQUEST_BRICK_MAPPING_FAILURE,
        request_error: error,
    }
}

export function getRequestedMappings() {
    return {
        type: GET_REQUESTED_MAPPINGS,
    }
}

export function getRequestedMappingsSuccess(data) {
    return {
        type: GET_REQUESTED_MAPPINGS_SUCCESS,
        data,
    }
}

export function getRequestedMappingsFailure(error) {
    return {
        type: GET_REQUESTED_MAPPINGS_FAILURE,
        error: error,
    }
}
