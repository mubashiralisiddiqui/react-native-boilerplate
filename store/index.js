import { createStore, combineReducers, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import { callsReducer } from '../src/reducers/callsReducers';
import { productsReducer } from '../src/reducers/productsReducer';

const rootReducer = combineReducers({
    calls: callsReducer,
    products: productsReducer,
});

const configureStore = () => {
    return createStore(rootReducer, {}, (applyMiddleware(thunk)));
}

export default configureStore;