import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {reducer as form} from 'redux-form';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import {reducer as notifications} from 'react-notification-system-redux';

import authenticationReducer from './modules/authentication';
import localeReducer from './modules/locale';
import accountReducer from './modules/account';
import confirmAccountReducer from './modules/confirmAccount';
import menuReducer from './modules/menu';
import resetPasswordReducer from './modules/resetPassword';

export default history => {
    const reducer = combineReducers({
        localeReducer,
        authenticationReducer,
        accountReducer,
        confirmAccountReducer,
        resetPasswordReducer,
        menuReducer,
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