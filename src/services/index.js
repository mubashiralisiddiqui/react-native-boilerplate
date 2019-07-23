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
    post,
    authUser,
} from '../constants';

import { getCalls, getCallsFailure, getCallsSuccess } from '../actions/calls'
import { getProducts, getProductsSuccess } from '../actions/products'

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

export const getTodayCalls = (params) => {
    return dispatch => {
        dispatch(getCalls())
        get(`/getTodayCalls`, {params}).then(async (response) => {
            if(response !== null && response.length > 0) {
                const user = await authUser();
                setStorage(`${user.LoginId}-${todayDate()}`, stringify(response))
                dispatch(getCallsSuccess(response))
                return response
            }
            return [];
        }).catch(error => {
            dispatch(getCallsFailure(error))
        })
    }
}

export const getDocHistory = async (params) => {
    return get(`/getDoctorHistory`, {params: {
        DoctorCode: 24081,
        EmployeeId: 1,
    }}).then(response => {
        if(response !== null && typeof(response) !== 'undefined') {
            return response
        }
        return [];
    })
    .catch(log)
}

export const submitCall = (params) => {
    Object.keys(params).map(value => {
         if(params[value] != 'Fahad') {
            params[value] = JSON.stringify(params[value])
         }
    })
    return post('executeCall', params).then(console.log).catch(console.log)
}

export const login = (params, onSuccess, onFailure) => {
    return get('loginUser', {params}).then(response => {
        if(response.length > 0) {
            setStorage('user', JSON.stringify(response[0]))
            onSuccess();
            return;
        }
        onFailure();
    }).catch(console.log)
}

export const serviceWrapper = async ({
    cache_key,
    call,
    sync = false,
}) => {
    const data = sync === false ? await getStorage(cache_key) : null;
    return  data === null || typeof(data) === 'undefined'
        ? call()
        : parse(data)
}

export const getProductsWithSamples = (params) => {
    return dispatch => {
        get('getAllProducts', {
            params
        }).then(async (response) => {
            if(response.length > 0) {
                const user = await authUser()
                dispatch(getProductsSuccess(response))
                setStorage(`${user.LoginId}-products`, stringify(response))
            }
            return response;
        }).catch(console.error)
    }
}