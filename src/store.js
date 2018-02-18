import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {reducer as form} from 'redux-form';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import {reducer as notifications} from 'react-notification-system-redux';

import authenticationReducer from './reducers/authentication';
import localeReducer from './reducers/locale';

let store = function (history) {
    const reducer = combineReducers({
        localeReducer,
        authenticationReducer,
        form,
        notifications,
        router: routerReducer
    });

    let middleware = [thunk, logger, routerMiddleware(history)];

    return createStore(
        reducer,
        applyMiddleware(...middleware)
    )

};
export default store;
