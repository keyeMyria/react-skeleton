import {push} from 'react-router-redux';
import {info, error} from 'react-notification-system-redux';
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
import {URI_LOGIN, URI_LOGOUT, URI_SIGN_UP} from '../../config';
import {post} from '../../services/http';
import {clearAuthStorage, setAuthStorage} from "../../utils/storage";

export const signIn = credentials => {
    return dispatch => {
        post(URI_LOGIN, credentials, null).then(response => {
            setAuthStorage(response, credentials.remember);
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
            clearAuthStorage();
            dispatch({type: LOGOUT});
            dispatch(push('/login'));
            dispatch(info({
                message: response.data.message,
                position: 'br'
            }));
        }).catch(response => {
            if (response.status === 400) {
                clearAuthStorage();
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
