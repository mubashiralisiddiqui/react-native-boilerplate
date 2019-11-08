import {
    GET_MAPPED_BRICKS,
    GET_MAPPED_BRICKS_SUCCESS,
    GET_MAPPED_BRICKS_FAILURE,
    REQUEST_BRICK_MAPPING,
    REQUEST_BRICK_MAPPING_SUCCESS,
    REQUEST_BRICK_MAPPING_FAILURE,
    GET_REQUESTED_MAPPINGS,
    GET_REQUESTED_MAPPINGS_SUCCESS,
} from '../Bricks/types'

const initialState = {
    bricks: [],
    rawBricks: [],
    loading: false,
    payload: {},
    error: '',
    request_error: '',
    requested_mappings: [],
    can_request_new: true,
};

export const bricksReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MAPPED_BRICKS:
            return {
                ...state,
                loading: true,
            };
        case GET_MAPPED_BRICKS_SUCCESS:
            const rawBricks = action.data;
            const groupedBricks = _.groupBy(action.data, brick => {
                return brick.TerritoryId
            })
            return {
                ...state,
                rawBricks,
                loading: false,
                bricks: groupedBricks,
            }
        case GET_MAPPED_BRICKS_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }
        case REQUEST_BRICK_MAPPING: {
            return {
                ...state,
                loading: true,
                payload: action.payload,
            }
        }
        case REQUEST_BRICK_MAPPING_SUCCESS: {
            return {
                ...state,
                loading: false,
            }
        }
        case REQUEST_BRICK_MAPPING_FAILURE: {
            return {
                ...state,
                loading: false,
                request_error: action.request_error
            }
        }
        case GET_REQUESTED_MAPPINGS_SUCCESS: {
            return {
                ...state,
                requested_mappings: action.data,
                can_request_new: action.data.length === 0,
            }
        }
        case REQUEST_BRICK_MAPPING_FAILURE: {
            return {
                ...state,
                can_request_new: true,
            }
        }
        default:
            return state;
    }
}

export const getBricksLoading = state => state.bricks.loading
export const getBricks = state => state.bricks.bricks
export const getRawBricks = state => state.bricks.rawBricks
export const getBricksError = state => state.bricks.error
export const canRequestNew = state => state.bricks.can_request_new
export const getRequestedMappings = state => state.bricks.requested_mappings