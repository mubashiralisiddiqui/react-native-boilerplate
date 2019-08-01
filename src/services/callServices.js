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
import { initiateResponseInterceotors, checkConnectivity } from '.';

export const getTodayCalls = (params) => {
    // initiateResponseInterceotors()
    // checkConnectivity();
    return async (dispatch) => {
        
        dispatch(getCalls())
        
        let callsFromStorage = await getStorage(`calls${todayDate()}`)

        if(callsFromStorage === null) {
            return get(`/getTodayCalls`, {params}).then(async (response) => {
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
    console.log(json, 'json', Object.keys(json))
    Object.keys(json).map(value => {
        console.log(json, json[value])
        if(json[value] != 'Fahad') {
            json[value] = JSON.stringify(json[value])
        } else {
            json[value] = json[value]
        }
    })
    return json
}

export const submitCallSingle = (params) => dispatch => {
    const jsonParams = parse(stringify(params));
    
    params = serializeData(params)
    console.log(params, 'submitting');
    
    dispatch(submitCall(params))
    
    return post('executeCall', params)
        .then(response => {
            dispatch(submitCallSuccess(params))
            console.log(response)
            return response;
        }).catch(async (error) => {
            // dispatch to failure event
            dispatch(submitCallFailure(error))
            
            // get the already stored calls
            let unSyncedData = await getStorage('offlineCalls')
            let allCalls = await getStorage(`calls${todayDate()}`)
            allCalls = parse(allCalls).map(call => {
                if(call.PlanDetailId == jsonParams.DailyCallId) {
                    call.IsExecuted = true
                }
                return call;
            })
            dispatch(getCallsSuccess(allCalls))
            setStorage(`calls${todayDate()}`, stringify(allCalls));
            // if they exist parse them, else assign an empty array to process further
            unSyncedData = unSyncedData === null
            ? {}
            : parse(unSyncedData)
            
            // set the execution date just to have a record to show to user when he executed the call
            params.call_execution_date = moment().format('YYYY-MM-DD hh:mm:ss')
            console.log(jsonParams, 'json checking')
            // set the params to store in offline calls
            unSyncedData[(new Date).getTime()] = params
        
            setStorage('offlineCalls', stringify(unSyncedData)) ;
            return error;
        })
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