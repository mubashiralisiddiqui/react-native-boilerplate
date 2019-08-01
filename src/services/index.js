import {
    parse,
    Axios,
} from '../constants';

export const responseInterceptor = response => {
    const data = parse(response.data && response.data.d)
    if(data.Error !== undefined) {
        alert(`${data.Error}, Please contact IT support.`)
        return null
    }
    return data
}

export const errorInterceptor = error => {
    console.log('in error interceptor')
    return error
}

export const initiateResponseInterceotors = () => {
    Axios.interceptors.response.use(responseInterceptor);
}