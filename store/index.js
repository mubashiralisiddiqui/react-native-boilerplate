import { createStore, combineReducers, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../src/reducers/authReducer'
import { callsReducer } from '../src/reducers/callsReducers';
import { productsReducer } from '../src/reducers/productsReducer';
import { giftsReducer } from '../src/reducers/giftsReducer';
import { historyReducer } from '../src/reducers/historyReducer';
import { doctorReducer } from '../src/reducers/doctorReducer';
import { cityReducer } from '../src/reducers/cityReducer';
import { createLogger } from 'redux-logger';
import { locationReducer } from '../src/reducers/locationReducer';
import { appReducer } from '../src/reducers/appReducer';
import { bricksReducer } from '../src/components/Bricks/reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    calls: callsReducer,
    products: productsReducer,
    gifts: giftsReducer,
    history: historyReducer,
    doctor: doctorReducer,
    cities: cityReducer,
    location: locationReducer,
    app: appReducer,
    bricks: bricksReducer,
});

const reduxLogger = createLogger();

const configureStore = () => {
    return createStore(rootReducer, {}, applyMiddleware(thunk, reduxLogger));
}

export default configureStore;