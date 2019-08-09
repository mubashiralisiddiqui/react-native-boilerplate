import {
    setStorage,
    getStorage,
    parse,
    stringify,
    get,
} from '../constants';
import { getCities, getCitiesSuccess } from '../actions/city';

export const getAllCities = (refresh = false) => async (dispatch) =>{
    dispatch(getCities())
    let dataFromStorage = await getStorage('cities');
    if(dataFromStorage == null || refresh == true) {
        let response = await get('getAllCity');
        setStorage('cities', stringify(response))
        dispatch(getCitiesSuccess(response))
        return response;
    }
    dataFromStorage = parse(dataFromStorage)
    dispatch(getCitiesSuccess(dataFromStorage));
    return dataFromStorage;
}