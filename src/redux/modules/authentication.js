import {push} from 'react-router-redux';
import {isUserLogged} from "../../utils/user-info";
import {APP_NAME} from "../../config";
import {post} from "../../utils/http";

const URI_AUTH = '/auth';
const URI_LOGIN = URI_AUTH + '/login';
const URI_SIGN_UP = URI_AUTH + '/sign-up';
const URI_LOGOUT = URI_AUTH + '/logout';

const SIGN_IN_SUCCESS = `${APP_NAME}/authentication/SIGN_IN_SUCCESS`;
const SIGN_IN_ERROR = `${APP_NAME}/authentication/SIGN_IN_ERROR`;
const SIGN_UP_SUCCESS = `${APP_NAME}/authentication/SIGN_UP_SUCCESS`;
const SIGN_UP_ERROR = `${APP_NAME}/authentication/SIGN_UP_ERROR`;
const LOGOUT = `${APP_NAME}/authentication/LOGOUT`;
const SET_AUTH_FORM_FIELD = `${APP_NAME}/authentication/SET_AUTH_FORM_FIELD`;
const COMPLETED_SIGN_IN_FORM = `${APP_NAME}/authentication/COMPLETED_SIGN_IN_FORM`;
const INCOMPLETE_SIGN_IN_FORM = `${APP_NAME}/authentication/INCOMPLETE_SIGN_IN_FORM`;
const COMPLETED_SIGN_UP_FORM = `${APP_NAME}/authentication/COMPLETED_SIGN_UP_FORM`;
const INCOMPLETE_SIGN_UP_FORM = `${APP_NAME}/authentication/INCOMPLETE_SIGN_UP_FORM`;
const initState = {
    message: '',
    error: null,
    logged: isUserLogged(),
    incompleteSignInForm: true,
    incompleteSignUpForm: true,
    errors: [],
    signUpError: null,
    signUpErrors: []
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
            return {...state, signUpError: action.error, logged: false, signUpErrors: action.errors};
        case LOGOUT:
            return {...state, error: null, logged: false};
        case SET_AUTH_FORM_FIELD:
            return {...state, [action.field]: action.value};
        case COMPLETED_SIGN_IN_FORM:
            return {...state, incompleteSignInForm: false};
        case COMPLETED_SIGN_UP_FORM:
            return {...state, incompleteSignUpForm: false};
        case INCOMPLETE_SIGN_IN_FORM:
            return {...state, incompleteSignInForm: true};
        case INCOMPLETE_SIGN_UP_FORM:
            return {...state, incompleteSignUpForm: true};
        default :
            return {...initState, logged: isUserLogged()};
    }
}


export const signIn = credentials => {
    return dispatch => {
        post(URI_LOGIN, credentials, null).then(response => {
            dispatch({type: SIGN_IN_SUCCESS});
        }).catch(response => {
            dispatch({type: SIGN_IN_ERROR, error: response.message});
        });
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
        }).catch(response => {
            dispatch({type: SIGN_UP_ERROR, error: response.message, errors: response.errors});
        });

    }
};

export const setSignInFormFieldValue = (field, value) => {
    return (dispatch, getState) => {
        dispatch({type: SET_AUTH_FORM_FIELD, field: field, value: value});
        let reducer = getState().authenticationReducer;
        let completed = reducer['email'] && reducer['password'];
        completed ? dispatch({type: COMPLETED_SIGN_IN_FORM}) : dispatch({type: INCOMPLETE_SIGN_IN_FORM});
    }
};

export const setSignUpFormFieldValue = (field, value) => {
    return (dispatch, getState) => {
        dispatch({type: SET_AUTH_FORM_FIELD, field: field, value: value});
        let reducer = getState().authenticationReducer;
        let completed = reducer['email'] && reducer['password'] && reducer['passwordConfirmation'] && reducer['name'] && reducer['gender'];
        completed ? dispatch({type: COMPLETED_SIGN_UP_FORM}) : dispatch({type: INCOMPLETE_SIGN_UP_FORM});
    }
};

