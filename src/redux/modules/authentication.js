import {LOCATION_CHANGE, push} from 'react-router-redux';
import {isUserLogged} from "../../utils/user_info";
import {APP_NAME, URI_LOGIN, URI_LOGOUT, URI_SIGN_UP} from "../../config";
import {error, info} from "react-notification-system-redux";
import {post} from "../../utils/http";

const SIGN_IN_SUCCESS = `${APP_NAME}/authentication/SIGN_IN_SUCCESS`;
const SIGN_IN_ERROR = `${APP_NAME}/authentication/SIGN_IN_ERROR`;
const SIGN_UP_SUCCESS = `${APP_NAME}/authentication/SIGN_UP_SUCCESS`;
const SIGN_UP_ERROR = `${APP_NAME}/authentication/SIGN_UP_ERROR`;
const LOGOUT = `${APP_NAME}/authentication/LOGOUT`;
const SET_AUTH_FORM_FIELD = `${APP_NAME}/authentication/SET_AUTH_FORM_FIELD`;
const COMPLETED_FORM = `${APP_NAME}/authentication/COMPLETED_FORM`;
const INCOMPLETE_FORM = `${APP_NAME}/authentication/INCOMPLETE_FORM`;


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


export const signIn = credentials => {
    return dispatch => {
        post(URI_LOGIN, credentials, null).then(response => {
            dispatch({type: SIGN_IN_SUCCESS});
            dispatch(info({
                message: response.data.message,
                position: 'br'
            }));
        }).catch(response => {
            dispatch({type: SIGN_IN_ERROR, error: response.data.message});
            dispatch(error({
                message: response.data.message,
                position: 'br'
            }));
        });
    }
};

export const logout = () => {
    return dispatch => {
        post(URI_LOGOUT).then(response => {
            dispatch({type: LOGOUT});
            dispatch(push('/login'));
            dispatch(info({
                message: response.data.message,
                position: 'br'
            }));
        }).catch(response => {
            if (response.status === 400) {
                dispatch(push('/login'));
            } else {
                dispatch(error({
                    message: response.data.message,
                    position: 'br'
                }));
            }
        });
    }
};

export const signUp = fields => {
    return dispatch => {
        post(URI_SIGN_UP, {
            email: fields.email,
            password: fields.password,
            name: fields.name,
            gender: fields.gender
        }, null).then(response => {
            dispatch({type: SIGN_UP_SUCCESS});
            dispatch(push('/'));
            dispatch(info({
                message: response.data.message,
                position: 'br'
            }));
        }).catch(response => {
            dispatch({type: SIGN_UP_ERROR, error: response.data.message, errors: response.data.errors});
            dispatch(error({
                message: response.data.message,
                position: 'br'
            }));
        });

    }
};

export const setSignInFormFieldValue = (field, value) => {
    return (dispatch, getState) => {
        dispatch({type: SET_AUTH_FORM_FIELD, field: field, value: value});
        let reducer = getState().authenticationReducer;
        let completed = reducer['email'] && reducer['password'];
        completed ? dispatch({type: COMPLETED_FORM}) : dispatch({type: INCOMPLETE_FORM});
    }
};

export const setSignUpFormFieldValue = (field, value) => {
    return (dispatch, getState) => {
        dispatch({type: SET_AUTH_FORM_FIELD, field: field, value: value});
        let reducer = getState().authenticationReducer;
        let completed = reducer['email'] && reducer['password'] && reducer['passwordConfirmation'] && reducer['name'] && reducer['gender'];
        completed ? dispatch({type: COMPLETED_FORM}) : dispatch({type: INCOMPLETE_FORM});
    }
};

