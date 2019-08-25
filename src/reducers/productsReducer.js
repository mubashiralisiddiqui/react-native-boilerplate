import { GET_PRODUCTS, GET_PRODUCTS_FAILURE, GET_PRODUCTS_SUCCESS } from '../actions/types';

const initialState = {
  products: [],
  samples: [],
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
            samples: _.concat(...(action.products.map(product => product.Products)))
        }
    }
    default:
        return state;
    }
}

// export const getCallsLoading = state => state.loading;
export const getProducts = state => state.products.products;
export const getSamples = state => state.products.samples;