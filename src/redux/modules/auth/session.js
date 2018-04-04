import {LOCATION_CHANGE, push} from 'react-router-redux';
import {isUserLogged} from "../../../utils/user-info";
import {APP_NAME} from "../../../config";
import {post} from "../../../utils/http";

const URI_AUTH = '/auth';
const URI_SIGN_IN = URI_AUTH + '/login';
const URI_LOGOUT = URI_AUTH + '/logout';

const SIGN_IN_SUCCESS = `${APP_NAME}/authentication/SIGN_IN_SUCCESS`;
const SIGN_IN_ERROR = `${APP_NAME}/authentication/SIGN_IN_ERROR`;
const LOGOUT = `${APP_NAME}/authentication/LOGOUT`;
const SET_SIGN_IN_FORM_FIELD = `${APP_NAME}/authentication/SET_SIGN_IN_FORM_FIELD`;
const COMPLETED_SIGN_IN_FORM = `${APP_NAME}/authentication/COMPLETED_SIGN_IN_FORM`;
const INCOMPLETE_SIGN_IN_FORM = `${APP_NAME}/authentication/INCOMPLETE_SIGN_IN_FORM`;
const initState = {
    message: '',
    error: null,
    logged: isUserLogged(),
    incompleteForm: true,
    errors: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case SIGN_IN_SUCCESS:
            return {...state, error: null, logged: true, errors: []};
        case SIGN_IN_ERROR:
            return {...state, error: action.error, logged: false, errors: action.errors};
        case LOGOUT:
            return {...state, error: null, logged: false};
        case SET_SIGN_IN_FORM_FIELD:
            return {...state, [action.field]: action.value};
        case COMPLETED_SIGN_IN_FORM:
            return {...state, incompleteForm: false};
        case INCOMPLETE_SIGN_IN_FORM:
            return {...state, incompleteForm: true};
        case LOCATION_CHANGE:
            return initState;
        default :
            return {...initState, logged: isUserLogged()};
    }
}


export const signIn = credentials => {
    return dispatch => {
        post(URI_SIGN_IN, credentials, null).then(response => {
            dispatch({type: SIGN_IN_SUCCESS});
        }).catch(response => {
            dispatch({type: SIGN_IN_ERROR, error: response.message});
        });
    }
};

export const setSignInFormFieldValue = (field, value) => {
    return (dispatch, getState) => {
        dispatch({type: SET_SIGN_IN_FORM_FIELD, field: field, value: value});
        const reducer = getState().authReducers.sessionReducer;
        const completed = reducer['email'] && reducer['password'];
        completed ? dispatch({type: COMPLETED_SIGN_IN_FORM}) : dispatch({type: INCOMPLETE_SIGN_IN_FORM});
    }
};

export const logout = () => {
    return dispatch => {
        post(URI_LOGOUT).then(response => {
            dispatch({type: LOGOUT});
            dispatch(push('/welcome'));
        }).catch(response => {
            if (response.status === 400) {
                dispatch(push('/welcome'));
            } else {
            }
        });
    }
};
