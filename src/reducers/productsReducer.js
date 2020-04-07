import { GET_PRODUCTS, GET_PRODUCTS_FAILURE, GET_PRODUCTS_SUCCESS } from '../actions/types';
import { downloadFile } from '../constants';
import Permissions from '../classes/Permission';
import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect'

const initialState = {
  products: []
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
        const files = _.intersectionBy(_.concat(...(_.map(action.products, 'Files'))), 'DetailingFileId');
        
        setTimeout(() => {
            Permissions.checkStorageAccess().then(permitted => {
                if(permitted === true) {
                    _.map(files, file => downloadFile(file.FilePath, file.FileName))
                }
            })
        }, 10000)
        return {
            ...state,
            products: action.products,
        }
    }
    default:
        return state;
    }
}

export const getCallsLoading = state => state.loading;
// create a "selector creator" that uses lodash.isEqual instead of ===
// const createDeepEqualSelector = createSelectorCreator(
//     defaultMemoize,
//     _.isEqual
// )
export const getProducts = state => state.products.products;
export const getSamples = createSelector(getProducts, products => _.concat(...(_.map(products, 'Products'))))
export const getSamplesFor = createSelector(getProducts, (samples, prop) => samples.filter(sample => sample.ProductTemplateId == prop))
export const getFiles = createSelector(getProducts, products => _.concat(...(_.map(products, 'Files'))));