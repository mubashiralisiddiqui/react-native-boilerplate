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
import { getCalls, getCallsFailure, getCallsSuccess, submitCallSuccess, submitCall, submitCallFailure, getUnplannedCalls, getUnplannedCallsFailure, getUnplannedCallsSuccess } from '../actions/calls'
import moment from 'moment'
import DropDownHolder from '../classes/Dropdown';
import { getCallsDoctors, getUnplannedCallsDoctors } from '../actions/doctor';
// FIXME: refactor this file
export const getTodayCalls = (params, refresh = false) => {
    return async (dispatch) => {
        
        dispatch(getCalls())
        
        let callsFromStorage = await getStorage(`calls${todayDate()}`)

        if(callsFromStorage === null || refresh == true) {
            get(`/getTodayCalls`, {params}).then(async (response) => {
                if(response !== null && response.length > 0) {
                    await getAllStorageKeys(removeOldStorageEnteries, dateFormatRegexCalls);
                    
                    setStorage(`calls${todayDate()}`, stringify(response))
                    dispatch(getCallsDoctors(response))
                    dispatch(getCallsSuccess(response))
                } else {
                    DropDownHolder.show('info', 'No Planned Calls Found', 'You do not have any planned calls for today.')
                    dispatch(getCallsSuccess([]))
                }
            }).catch(error => {
                dispatch(getCallsFailure(error))
            })
        } else {
            callsFromStorage = parse(callsFromStorage)
            dispatch(getCallsDoctors(callsFromStorage))            
            dispatch(getCallsSuccess(callsFromStorage))
        }
    }
}

export const serializeData = (json) => {
    Object.keys(json).map(value => {
        json[value] = typeof json[value] == 'object'
            ? JSON.stringify(json[value])
            : json[value]
    })
    return json
}

export const syncCall = (params) => async (dispatch) => {
    await Object.keys(params).map(param => {
        params[param] = params[param]
    })
    return post('executeCall', params).then(async (response) => {
        if(response == 1) {
            dispatch(submitCallSuccess(params))
            // const allCalls = await updateCallStatus(params.DailyCallId);
            // dispatch(getCallsSuccess(allCalls))
        }
        return response;
    })

}

export const submitCallSingle = (params) => dispatch => {
    const jsonParams = parse(stringify(params));
    
    params = serializeData(params)
    
    dispatch(submitCall(params))
    
    
    return post('executeCall', params)
        .then(async (response) => {
            if(response == 1) {
                dispatch(submitCallSuccess(params))
                const allCalls = await updateCallStatus(jsonParams.DailyCallId, false);
                dispatch(getCallsSuccess(allCalls))
            }
            dispatch(submitCallFailure('Server Error'))
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
        if(call.IsExecutedOffline && call.IsExecutedOffline == true && call.IsExecuted == true) {
            call.IsExecuted = true,
            call.IsExecutedOffline = isOffline
        }
        else if(call.PlanDetailId == planId) {
            call.IsExecuted = true,
            call.IsExecutedOffline = isOffline
        }
        return call;
    })
    await setStorage(`calls${todayDate()}`, stringify(allCalls));
    return allCalls;
}

export const submitOfflineCall = (params) => {
    return async (dispatch) => {
        dispatch(submitCall(params))
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
        unSyncedData[jsonParams.Epoch] = params
        
        dispatch(submitCallFailure('No Internet Connectivity'))
        setStorage('offlineCalls', stringify(unSyncedData));
        dispatch(getCallsSuccess(allCalls))
        return Promise.resolve(1)
    } 
}



export const removeOldStorageEnteries = (error, keys, regex) => {
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

export const updatedCalls = (calls) => dispatch => {
    dispatch(getCallsSuccess(calls))
    return 1;
}

export const getTodayUnplannedCalls = (params, refresh = false) => async (dispatch) => {
    dispatch(getUnplannedCalls())
    let dataFromStorage = await getStorage(`unplannedCalls${todayDate()}`)
    
    if(dataFromStorage == null || refresh == true) {
        get(`getTodayUnplannedExecutedCall`, {params})
        .then(response => {
            setStorage(`unplannedCalls${todayDate()}`, stringify(response));
            dispatch(getUnplannedCallsDoctors(response))
            dispatch(getUnplannedCallsSuccess(response))
            // return response
        })
        .catch(error => {
            dispatch(getUnplannedCallsFailure(error))
        })
    } else {
        dataFromStorage = parse(dataFromStorage)
        dispatch(getUnplannedCallsDoctors(dataFromStorage))
        dispatch(getUnplannedCallsSuccess(dataFromStorage))
    }
    // return dataFromStorage
}