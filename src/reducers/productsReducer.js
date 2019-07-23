import { GET_PRODUCTS, GET_PRODUCTS_FAILURE, GET_PRODUCTS_SUCCESS } from '../actions/types';

const initialState = {
  products: [],
};

export const productsReducer = (state = initialState, action) => {
    console.log(state, action)
    switch(action.type) {
    case GET_PRODUCTS:
        return {
            ...state,
        };
    case GET_PRODUCTS_FAILURE:
        return {
            ...state,
            error: 'Some error',
        }
    case GET_PRODUCTS_SUCCESS: {

        return {
            ...state,
            products: action.products,
        }
    }
    default:
        return state;
    }
}

// export const getCallsLoading = state => state.loading;
export const getProducts = state => {console.log(434343); return state.products};
// export const getProductsError = state => state.error;