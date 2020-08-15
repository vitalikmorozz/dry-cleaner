import 'react-native-gesture-handler';

import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './redux/reducers/rootReducer';

import thunk from 'redux-thunk';

import MainScreen from './screens/MainScreen';

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => (
    <Provider store={store}>
        <MainScreen />
    </Provider>
);

export default App;
