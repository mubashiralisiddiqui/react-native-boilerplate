/**
 * @namespace Actions/products
 * @file Action creators of products and samples section of this application. 
 * This application uses JSDoc for documentation. Please see official website for reference.
 * Add author tag to the existing function if you edit any existing functionality.
 *
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 */

 import { GET_PRODUCTS, GET_PRODUCTS_FAILURE, GET_PRODUCTS_SUCCESS } from './types'

/**
 * Action creator, triggers when getting products API initiliazed.
 *
 * @function getProducts
 * @memberof Actions/products
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @returns {Object}
 */
export function getProducts () {
    return {
        type: GET_PRODUCTS,
    }
}

/**
 * Action creator, triggers when getting products returns a successful response
 *
 * @function getProductsSuccess
 * @memberof Actions/products
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {String|Object} products
 * @returns {Object}
 */
export function getProductsSuccess(products) {
    return {
        type: GET_PRODUCTS_SUCCESS,
        products,
    }
}

/**
 * Action creator, triggers when getting products API failed.
 *
 * @function getProductsFailure
 * @memberof Actions/products
 * @author [Muhammad Nauman] <muhammad.nauman@hudsonpharma.com>
 * @export
 * @param {String|Object} error
 * @returns {Object}
 */
export function getProductsFailure(error) {
    return {
        type: GET_PRODUCTS_FAILURE,
        error: error
    }
}