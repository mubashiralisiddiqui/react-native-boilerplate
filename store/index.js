import { createStore, combineReducers, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../src/reducers/authReducer'
import { callsReducer } from '../src/reducers/callsReducers';
import { productsReducer } from '../src/reducers/productsReducer';
import { giftsReducer } from '../src/reducers/giftsReducer';
import { historyReducer } from '../src/reducers/historyReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    calls: callsReducer,
    products: productsReducer,
    gifts: giftsReducer,
    history: historyReducer,
});

const configureStore = () => {
    return createStore(rootReducer, {}, (applyMiddleware(thunk)));
}

export default configureStore;