import {APP_NAME} from "../../config";
import {error, info} from "react-notification-system-redux";
import {get, patch, post, put} from "../../utils/http";
import {getLocale} from "../../i18n/utils";

const URI_ACCOUNT = '/account';
const URI_PASSWORD = '/password';

const GET_ACCOUNT_INFO_SUCCESS = `${APP_NAME}/authentication/GET_ACCOUNT_INFO_SUCCESS`;
const GET_ACCOUNT_INFO_ERROR = `${APP_NAME}/authentication/GET_ACCOUNT_INFO_ERROR`;
const SET_ACCOUNT_FORM_FIELD = `${APP_NAME}/authentication/SET_ACCOUNT_FORM_FIELD`;
const ACCOUNT_COMPLETED_FORM = `${APP_NAME}/authentication/ACCOUNT_COMPLETED_FORM`;
const ACCOUNT_INCOMPLETE_FORM = `${APP_NAME}/authentication/ACCOUNT_INCOMPLETE_FORM`;
const EDIT_ACCOUNT_SUCCESS = `${APP_NAME}/authentication/EDIT_ACCOUNT_SUCCESS`;
const EDIT_ACCOUNT_ERROR = `${APP_NAME}/authentication/EDIT_ACCOUNT_ERROR`;
const PASSWORD_FORM_COMPLETED = `${APP_NAME}/authentication/PASSWORD_FORM_COMPLETED`;
const PASSWORD_FORM_INCOMPLETE = `${APP_NAME}/authentication/PASSWORD_FORM_INCOMPLETE`;
const SET_PASSWORD_FORM_FIELD = `${APP_NAME}/authentication/SET_PASSWORD_FORM_FIELD`;
const CHANGE_PASSWORD_SUCCESS = `${APP_NAME}/authentication/CHANGE_PASSWORD_SUCCESS`;
const CHANGE_PASSWORD_ERROR = `${APP_NAME}/authentication/CHANGE_PASSWORD_ERROR`;
const SET_NEW_AVATAR = `${APP_NAME}/authentication/SET_NEW_AVATAR`;
const EDIT_AVATAR_SUCCESS = `${APP_NAME}/authentication/EDIT_AVATAR_SUCCESS`;
const EDIT_AVATAR_ERROR = `${APP_NAME}/authentication/EDIT_AVATAR_ERROR`;


const initState = {
    info: {
        email: '',
        name: '',
        gender: '',
        avatar: '',
    },
    language: getLocale(),
    newPasswordInfo: {},
    editing: false,
    changingPassword: false,
    incompleteForm: false,
    incompletePasswordForm: true
};

export default (state = initState, action) => {
    switch (action.type) {
        case GET_ACCOUNT_INFO_SUCCESS:
            return {...state, info: action.info, language: getLocale()};
        case EDIT_ACCOUNT_ERROR:
        case GET_ACCOUNT_INFO_ERROR:
            return {...state, error: action.error, errors: action.errors};
        case SET_ACCOUNT_FORM_FIELD:
            return {...state, info: {...state.info, [action.field]: action.value}};
        case SET_PASSWORD_FORM_FIELD:
            return {...state, newPasswordInfo: {...state.newPasswordInfo, [action.field]: action.value}};
        case ACCOUNT_COMPLETED_FORM:
            return {...state, incompleteForm: false};
        case ACCOUNT_INCOMPLETE_FORM:
            return {...state, incompleteForm: true};
        case PASSWORD_FORM_COMPLETED:
            return {...state, incompletePasswordForm: false};
        case PASSWORD_FORM_INCOMPLETE:
            return {...state, incompletePasswordForm: true};
        case EDIT_ACCOUNT_SUCCESS:
            return {...state, editing: false};
        case CHANGE_PASSWORD_SUCCESS:
            return {...state, changingPassword: false};
        case SET_NEW_AVATAR:
            return {...state, newAvatar: action.value};
        default:
            return state;
    }
}


export const getAccountInfo = () => {
    return dispatch => {
        get(URI_ACCOUNT).then(response => {
            dispatch({type: GET_ACCOUNT_INFO_SUCCESS, info: response});
        }).catch(response => {
            dispatch({type: GET_ACCOUNT_INFO_ERROR, error: response.data.message});
            dispatch(error({
                message: response.data.message,
                position: 'br'
            }));
        });
    }
};

export const setEditAccountFormFieldValue = (field, value) => {
    return (dispatch, getState) => {
        dispatch({type: SET_ACCOUNT_FORM_FIELD, field: field, value: value});
        let reducer = getState().accountReducer;
        let completed = reducer.info['email'] && reducer.info['name'] && reducer.info['gender'];
        completed ? dispatch({type: ACCOUNT_COMPLETED_FORM}) : dispatch({type: ACCOUNT_INCOMPLETE_FORM});
    }
};

export const editAccountInfo = credentials => {
    return dispatch => {
        patch(URI_ACCOUNT, credentials, null).then(response => {
            dispatch({type: EDIT_ACCOUNT_SUCCESS});
            dispatch(info({
                message: "YEAH",
                position: 'br'
            }));
        }).catch(response => {
            dispatch({type: EDIT_ACCOUNT_ERROR, error: response.data.message});
            dispatch(error({
                message: response.data.message,
                position: 'br'
            }));
        });
    }
};

export const setChangePasswordFormFieldValue = (field, value) => {
    return (dispatch, getState) => {
        dispatch({type: SET_PASSWORD_FORM_FIELD, field: field, value: value});
        let reducer = getState().accountReducer;
        let completed = reducer.newPasswordInfo['oldPassword'] && reducer.newPasswordInfo['password'] && reducer.newPasswordInfo['passwordConfirmation'];
        completed ? dispatch({type: PASSWORD_FORM_COMPLETED}) : dispatch({type: PASSWORD_FORM_INCOMPLETE});
    }
};

export const changePassword = credentials => {
    return dispatch => {
        put(URI_ACCOUNT + URI_PASSWORD, {
            oldPassword: credentials.oldPassword,
            password: credentials.password
        }, null).then(response => {
            dispatch({type: CHANGE_PASSWORD_SUCCESS});
            dispatch(info({
                message: "YEAH",
                position: 'br'
            }));
        }).catch(response => {
            dispatch({type: CHANGE_PASSWORD_ERROR, error: response.message});
            dispatch(error({
                message: response.message,
                position: 'br'
            }));
        });
    }
};

export const onChangeAvatar = value => {
    return {type: SET_NEW_AVATAR, value: value};
};


export const editAvatar = credentials => {
    const formData = new FormData();
    formData.append('file', credentials);

    return dispatch => {
        post(URI_ACCOUNT + "/avatar", formData, {
            headers: {'content-type': 'multipart/form-data'}
        }).then(response => {
            dispatch({type: EDIT_AVATAR_SUCCESS});
            dispatch(info({
                message: "YEAH",
                position: 'br'
            }));
        }).catch(response => {
            dispatch({type: EDIT_AVATAR_ERROR, error: response.data.message});
            dispatch(error({
                message: response.data.message,
                position: 'br'
            }));
        });
    }
};