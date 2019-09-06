import { GET_PRODUCTS, GET_PRODUCTS_FAILURE, GET_PRODUCTS_SUCCESS } from '../actions/types';
import { downloadFile } from '../constants';

const initialState = {
  products: [],
  samples: [],
  files: [],
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
        const files = _.concat(...(_.map(action.products, 'Files')))
        _.map(files, file => downloadFile(file.FilePath, file.FileName))
        return {
            ...state,
            products: action.products,
            samples: _.concat(...(_.map(action.products, 'Products'))),
            files: files,
        }
    }
    default:
        return state;
    }
}

// export const getCallsLoading = state => state.loading;
export const getProducts = state => state.products.products;
export const getSamples = state => state.products.samples;
export const getFiles = state => state.products.files;