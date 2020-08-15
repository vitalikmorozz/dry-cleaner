import {combineReducers} from 'redux';

import authReducer from './auth';
import modalReducer from './modal';
import orderReducer from './order';
import clientReducer from './client';
import pointReducer from './cleaningPoint';
import profileReducer from './profie';

const rootReducer = combineReducers({
    auth: authReducer,
    modal: modalReducer,
    order: orderReducer,
    client: clientReducer,
    point: pointReducer,
    profile: profileReducer,
});

export default rootReducer;
