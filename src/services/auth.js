import { post, setStorage, userFullName } from '../constants';
import { login, loginSuccess, loginFailure } from '../actions/auth'
import { initiateResponseInterceotors } from './index'

export const loginUser = (params, onSuccess, onFailure) => {
    return dispatch => {
        initiateResponseInterceotors();
        dispatch(login())
        return post('loginUser', params).then(response => {
            console.log(response, 'from login')
            if(response.length > 0) {
                console.log(response, response.length)
                let user = response[0];
                user.FullName = userFullName(user);
                dispatch(loginSuccess(user))
                setStorage('user', JSON.stringify(user))
                onSuccess();
                return;
            }
            onFailure();
        }).catch(error => dispatch(loginFailure()))
    }
}