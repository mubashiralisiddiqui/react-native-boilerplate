import {get, setStorage, getAllStorageKeys, getStorage, todayDate, parse, stringify, dateFormatRegexGifts} from '../constants'
import { getGifts, getGiftsSuccess } from '../actions/gifts'
import { removeOldStorageEnteries } from './callServices';
import { initiateResponseInterceotors } from '.';

export const getAllGifts = (params) => {
    // initiateResponseInterceotors()
    return async (dispatch) => {
        dispatch(getGifts())
        let giftsFromStorage = await getStorage(`gifts${todayDate()}`)
        if(giftsFromStorage === null) {
            return get('getAllGiftItems', {
                params
            }).then(async (response) => {
                if(response.length > 0) {
                    await getAllStorageKeys(removeOldStorageEnteries, dateFormatRegexGifts);
                    dispatch(getGiftsSuccess(response))
                    setStorage(`gifts${todayDate()}`, stringify(response))
                }
                return response;
            }).catch(console.error)
        }
        giftsFromStorage = parse(giftsFromStorage)
        dispatch(getGiftsSuccess(giftsFromStorage))
        return giftsFromStorage;
    }
}