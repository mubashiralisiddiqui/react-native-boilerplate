
import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from '../constant';



export const login = (payload) => (
    {
        type: LOGIN,
        payload
    }
)
export const loginSuccess = (payload) => (
    {
        type: LOGIN_SUCCESS,
        payload
    }
)
export const loginFail = (payload) => (
    {
        type: LOGIN_FAIL,
        payload
    }
)