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
    console.log(response, 'interceptor')
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
    console.log('in error interceptor')
    return error
}

// export const initiateResponseInterceotors = () => {
    // console.log(Axios)
    // Axios.interceptors.response.use(responseInterceptor);
// }
export const services = () => {
    if(Axios.interceptors.response.handlers.length == 0) {
        console.log(23);
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