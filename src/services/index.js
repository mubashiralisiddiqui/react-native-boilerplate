import {
    baseURL,
    getToken,
    todayDate,
    parse,
    log,
    get,
    getStorage,
    setStorage,
    stringify,
} from '../constants';
import axios from 'axios';

export const responseInterceptor = response => {
    log('api response with everything => ', response)
    const data = parse(response.data.d)
    if(data.Error !== undefined) {
        alert(`${data.Error}, Please contact IT support.`)
        return null
    }
    return data
}

export const errorInterceptor = error => {
    return error
}

axios.interceptors.response.use(responseInterceptor, errorInterceptor);

export const getCalls = async () => {
    return get(`/getTodayCalls`, {
        params: {
            Token: getToken,
            EmployeeId: 1,
        }
    }).then(response => {
        if(response !== null) {
            setStorage(todayDate(), stringify(response))
            return response
        }
    }).catch(log)
}

export const getDocHistory = async (params) => {
    return get(`/getDoctorHistory`, {params: {
        DoctorCode: 24081,
        EmployeeId: 1,
    }}).then(response => {
        if(response !== null && typeof(response) !== 'undefined') {
            log("mai hun doctor history api ka response", response)
            return response
        }
        return [];
    })
    .catch(log)
}

export const serviceWrapper = async ({
    cache_key,
    call,
}) => {
    const data = await getStorage(cache_key);
    // log(parse(data))
    return  data === null || typeof(data) === 'undefined'
        ? call()
        : parse(data)
}