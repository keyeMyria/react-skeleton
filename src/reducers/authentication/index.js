import {LOCATION_CHANGE} from 'react-router-redux';
import {
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR,
    SIGN_UP_SUCCESS,
    SIGN_UP_ERROR,
    LOGOUT,
    SET_AUTH_FORM_FIELD,
    COMPLETED_FORM,
    INCOMPLETE_FORM
} from '../../types/authentication';
import {isUserLogged} from "../../utils/user_info";

const initState = {
    message: '',
    error: null,
    logged: isUserLogged(),
    isIncomplete: true,
    errors: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case SIGN_IN_SUCCESS:
            return {...state, error: null, logged: true, errors: []};
        case SIGN_IN_ERROR:
            return {...state, error: action.error, logged: false, errors: action.errors};
        case SIGN_UP_SUCCESS:
            return {...state, error: null, logged: true, errors: []};
        case SIGN_UP_ERROR:
            return {...state, error: action.error, logged: false, errors: action.errors};
        case LOGOUT:
            return {...state, error: null, logged: false};
        case SET_AUTH_FORM_FIELD: {
            return Object.assign({}, state, {[action.field]: action.value});
        }
        case COMPLETED_FORM:
            return {...state, isIncomplete: false};
        case INCOMPLETE_FORM:
            return {...state, isIncomplete: true};
        case LOCATION_CHANGE: {
            return initState;
        }
        default :
            return state
    }
}
