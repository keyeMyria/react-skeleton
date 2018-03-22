import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {reducer as form} from 'redux-form';
import {routerReducer, routerMiddleware} from 'react-router-redux';

import authenticationReducer from './modules/authentication';
import localeReducer from './modules/locale';
import adminUsersReducer from './modules/adminUsers';
import adminUserReducer from './modules/adminUser';
import adminMenuReducer from './modules/adminMenu';
import accountReducer from './modules/account';
import confirmAccountReducer from './modules/confirmAccount';
import menuReducer from './modules/menu';
import resetPasswordReducer from './modules/resetPassword';

export default history => {
    const reducer = combineReducers({
        localeReducer,
        authenticationReducer,
        adminUsersReducer,
        adminUserReducer,
        adminMenuReducer,
        accountReducer,
        confirmAccountReducer,
        resetPasswordReducer,
        menuReducer,
        form,
        router: routerReducer
    });

    let middleware = [thunk, logger, routerMiddleware(history)];

    return createStore(
        reducer,
        applyMiddleware(...middleware)
    )

};