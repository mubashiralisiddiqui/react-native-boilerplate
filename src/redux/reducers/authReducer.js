
import { fromJS } from 'immutable';

import * as c from '../constant'

const initialState = fromJS({
    isloggedin: false,
    loading: false
})


export default authReducer = (state = initialState, action) => {
    switch (action.type) {
        case c.LOGIN:
            return state
                .set('loading', true)
        case c.LOGIN_SUCCESS:
            return state
                .set('loading', false)
                .set('isloggedin', true)
        case c.LOGIN_FAIL:
            return state
                .set('loading', false)



    }

}