import {get, setStorage, dateFormatRegexProducts, getAllStorageKeys, getStorage, todayDate, parse, stringify} from '../constants'
import { getProducts, getProductsSuccess } from '../actions/products'
import { removeOldStorageEnteries } from './callServices';

export const getProductsWithSamples = (params, refresh = false) => {
    // initiateResponseInterceotors()
    return async (dispatch) => {
        dispatch(getProducts())
        let productsFromStorage = await getStorage(`products${todayDate()}`)
        if(productsFromStorage === null || refresh == true) {
            get('getAllProducts', {
                params
            }).then(async (response) => {
                if(response.length > 0) {
                    await getAllStorageKeys(removeOldStorageEnteries, dateFormatRegexProducts);
                    setStorage(`products${todayDate()}`, stringify(response))
                    dispatch(getProductsSuccess(response))
                }
                else dispatch(getProductsSuccess([]))
            }).catch(console.error)
        } else {
            productsFromStorage = parse(productsFromStorage)
            dispatch(getProductsSuccess(productsFromStorage))
        }
        // return productsFromStorage;
    }
}