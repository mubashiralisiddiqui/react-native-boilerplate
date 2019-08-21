import {get, setStorage, getAllStorageKeys, getStorage, todayDate, parse, stringify, dateFormatRegexGifts} from '../constants'
import { getGifts, getGiftsSuccess } from '../actions/gifts'
import { removeOldStorageEnteries } from './callServices';

export const getAllGifts = (params = {}, refresh = false) => async (dispatch) => {
    dispatch(getGifts())
    let giftsFromStorage = await getStorage(`gifts${todayDate()}`)
    if(giftsFromStorage == null || refresh == true) {
        return get('getAllGiftItems', {
            params
        }).then(async (response) => {
            if(response.length > 0) {
                await getAllStorageKeys(removeOldStorageEnteries, dateFormatRegexGifts);
                setStorage(`gifts${todayDate()}`, stringify(response))
                dispatch(getGiftsSuccess(response))
            }
            return response;
        }).catch(console.error)
    }
    giftsFromStorage = parse(giftsFromStorage)
    dispatch(getGiftsSuccess(giftsFromStorage))
    return giftsFromStorage;
}