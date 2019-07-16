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
    Axios,
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

Axios.interceptors.response.use(responseInterceptor, errorInterceptor);

export const getCalls = async () => {
    return get(`/getTodayCalls`, {
        params: {
            Token: getToken,
            EmployeeId: 1,
        }
    }).then(response => {
        if(response !== null) {
            log('Mai hun new data daily calls ka => ', response)
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
    sync = false,
}) => {
    const data = sync === false ? await getStorage(cache_key) : null;
    // log("han jani", parse(data))
    return  data === null || typeof(data) === 'undefined'
        ? call()
        : parse(data)
}