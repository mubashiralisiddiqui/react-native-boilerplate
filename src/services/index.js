import {
    parse,
    Axios,
} from '../constants';
import * as authService from "./auth";
import * as callService from "./callServices";
import * as productService from "./productService";
import * as giftService from "./giftService";
import * as historyService from "./historyService";

export const responseInterceptor = response => {
    // if(typeof response === 'string') {
         response = parse(response.data && response.data.d)
         if(response.Error !== undefined) {
             alert(`${response.Error}, Please contact IT support.`)
             return null
         }
    // }
    return response
}

export const errorInterceptor = error => {
    return error
}

export const services = () => {
    if(Axios.interceptors.response.handlers.length == 0) {
        Axios.interceptors.response.use(responseInterceptor);
    }
    return {
        callService,
        productService,
        authService,
        giftService,
        historyService
    }
}