import {
    parse,
    Axios,
} from '../constants';

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

export const initiateResponseInterceotors = () => {
    Axios.interceptors.response.use(responseInterceptor);
}