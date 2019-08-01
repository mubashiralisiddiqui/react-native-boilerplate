import {get, setStorage, dateFormatRegexProducts, getAllStorageKeys, getStorage, todayDate, parse, stringify} from '../constants'
import { getProducts, getProductsSuccess } from '../actions/products'
import { removeOldStorageEnteries } from './callServices';
import { initiateResponseInterceotors } from '.';

export const getProductsWithSamples = (params) => {
    initiateResponseInterceotors()
    return async (dispatch) => {
        dispatch(getProducts())
        let productsFromStorage = await getStorage(`products${todayDate()}`)
        if(productsFromStorage === null) {
            return get('getAllProducts', {
                params
            }).then(async (response) => {
                if(response.length > 0) {
                    await getAllStorageKeys(removeOldStorageEnteries, dateFormatRegexProducts);
                    dispatch(getProductsSuccess(response))
                    setStorage(`products${todayDate()}`, stringify(response))
                }
                return response;
            }).catch(console.error)
        }
        productsFromStorage = parse(productsFromStorage)
        dispatch(getProductsSuccess(productsFromStorage))
        return productsFromStorage;
    }
}