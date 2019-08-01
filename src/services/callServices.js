import {
    get,
    post,
    setStorage,
    getStorage,
    todayDate,
    parse,
    stringify,
    getAllStorageKeys,
    dateFormatRegexCalls,
    removeStorageMultiple
} from '../constants'
import { getCalls, getCallsFailure, getCallsSuccess, submitCallSuccess, submitCall, submitCallFailure } from '../actions/calls'
import moment from 'moment'

export const getTodayCalls = (params) => {
    // initiateResponseInterceotors()   
    // checkConnectivity();
    return async (dispatch) => {
        
        dispatch(getCalls())
        
        let callsFromStorage = await getStorage(`calls${todayDate()}`)

        if(callsFromStorage === null) {
            return get(`/getTodayCalls`, {params}).then(async (response) => {
                console.log(response, 'das')
                if(response !== null && response.length > 0) {
                    await getAllStorageKeys(removeOldStorageEnteries, dateFormatRegexCalls);
                    
                    setStorage(`calls${todayDate()}`, stringify(response))
                    
                    dispatch(getCallsSuccess(response))
                   
                    return response
                }
                return [];
            }).catch(error => {
                dispatch(getCallsFailure(error))
            })
        }
        callsFromStorage = parse(callsFromStorage)
        
        dispatch(getCallsSuccess(callsFromStorage))
        
        return callsFromStorage;
    }
}

export const serializeData = (json) => {
    Object.keys(json).map(value => {
        json[value] = json[value] != 'Fahad'
            ? JSON.stringify(json[value])
            : json[value]
    })
    return json
}

export const syncCall = (params) => dispatch => {
    Object.keys(params).map(param => {
        console.log(params[param])
        params[param] = params[param]
    })
    dispatch(submitCall(params))
    return post('executeCall', params).then(async (response) => {
        dispatch(submitCallSuccess(params))
        let offlineCalls = await getStorage('offlineCalls')
        offlineCalls = parse(offlineCalls)
        delete offlineCalls[params.DailyCallId]
        setStorage('offlineCalls', stringify(offlineCalls))
        const allCalls = await updateCallStatus(params.DailyCallId);
        dispatch(getCallsSuccess(allCalls))
        return response;
    })

}

export const submitCallSingle = (params) => dispatch => {
    const jsonParams = parse(stringify(params));
    
    params = serializeData(params)
    
    dispatch(submitCall(params))
    
    
    return post('executeCall', params)
        .then(async (response) => {
            dispatch(submitCallSuccess(params))
            const allCalls = await updateCallStatus(jsonParams.DailyCallId, false);
            dispatch(getCallsSuccess(allCalls))
            return response;
        }).catch(async (error) => {
            // dispatch to failure event
            dispatch(submitCallFailure(error))
            
            // get the already stored calls
            let unSyncedData = await getStorage('offlineCalls')
            updateCallStatus(jsonParams.DailyCallId, true);
            // if they exist parse them, else assign an empty array to process further
            unSyncedData = unSyncedData === null
            ? {}
            : parse(unSyncedData)
            
            // set the execution date just to have a record to show to user when he executed the call
            params.call_execution_date = moment().format('YYYY-MM-DD hh:mm:ss')
            // set the params to store in offline calls
            unSyncedData[jsonParams.DailyCallId] = params
        
            setStorage('offlineCalls', stringify(unSyncedData)) ;
            return error;
        })
}
export const updateCallStatus = async (planId, isOffline = false) => {
    let allCalls = await getStorage(`calls${todayDate()}`)
    allCalls = parse(allCalls).map(call => {
        if(call.PlanDetailId == planId) {
            call.IsExecuted = true,
            call.IsExecutedOffline = isOffline
        }
        return call;
    })
    console.log(allCalls, 'after map')
    await setStorage(`calls${todayDate()}`, stringify(allCalls));
    return allCalls;
}

export const submitOfflineCall = (params) => {
    return async (dispatch) => {
        dispatch(submitCall(params))
        console.log(params, 'submitting offline')
        dispatch(submitCallFailure('No Internet Connectivity'))
        const jsonParams = parse(stringify(params));
        
        params = serializeData(params)
        // get the already stored calls
        let unSyncedData = await getStorage('offlineCalls')
        const allCalls = await updateCallStatus(jsonParams.DailyCallId, true);
        // if they exist parse them, else assign an empty array to process further
        unSyncedData = unSyncedData === null
        ? {}
        : parse(unSyncedData)
        
        // set the execution date just to have a record to show to user when he executed the call
        params.call_execution_date = moment().format('YYYY-MM-DD hh:mm:ss')
        // set the params to store in offline calls
        unSyncedData[jsonParams.DailyCallId] = params
    
        setStorage('offlineCalls', stringify(unSyncedData));
        dispatch(getCallsSuccess(allCalls))
        return Promise.resolve(1)
    } 
}



export const removeOldStorageEnteries = (error, keys, regex) => {
    console.log(error, keys, 'keys')
    let keysToRemove = []
    keys.map(key => {
        if(regex.test(key) && key !== todayDate()) {
            keysToRemove.push(key)
        }
    })
    if(keysToRemove.length > 0) {
        removeStorageMultiple(keysToRemove)
    }
}