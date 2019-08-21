import { GET_PRODUCTS, GET_PRODUCTS_FAILURE, GET_PRODUCTS_SUCCESS } from '../actions/types';

const initialState = {
  products: [],
};

export const productsReducer = (state = initialState, action) => {
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
export const getProducts = state => state.products.products;
export const getSamples = state => {
    let samples = state.products.products.map(product => product.Products)
    return _.concat(...samples);
}