import {APP_NAME} from "../../config";
import {del, get, patch, post, put} from "../../utils/http";
import {getLocale} from "../../i18n/utils";

const URI_ACCOUNT = '/account';
const URI_PASSWORD = '/password';

const REDUCER_NAME = `${APP_NAME}/account`;

const GET_ACCOUNT_INFO_SUCCESS = `${REDUCER_NAME}/GET_ACCOUNT_INFO_SUCCESS`;
const GET_ACCOUNT_INFO_ERROR = `${REDUCER_NAME}/GET_ACCOUNT_INFO_ERROR`;
const SET_ACCOUNT_FORM_FIELD = `${REDUCER_NAME}/SET_ACCOUNT_FORM_FIELD`;
const ACCOUNT_COMPLETED_FORM = `${REDUCER_NAME}/ACCOUNT_COMPLETED_FORM`;
const ACCOUNT_INCOMPLETE_FORM = `${REDUCER_NAME}/ACCOUNT_INCOMPLETE_FORM`;
const EDIT_ACCOUNT_SUCCESS = `${REDUCER_NAME}/EDIT_ACCOUNT_SUCCESS`;
const EDIT_ACCOUNT_ERROR = `${REDUCER_NAME}/EDIT_ACCOUNT_ERROR`;
const PASSWORD_FORM_COMPLETED = `${REDUCER_NAME}/PASSWORD_FORM_COMPLETED`;
const PASSWORD_FORM_INCOMPLETE = `${REDUCER_NAME}/PASSWORD_FORM_INCOMPLETE`;
const SET_PASSWORD_FORM_FIELD = `${REDUCER_NAME}/SET_PASSWORD_FORM_FIELD`;
const CHANGE_PASSWORD_SUCCESS = `${REDUCER_NAME}/CHANGE_PASSWORD_SUCCESS`;
const CHANGE_PASSWORD_ERROR = `${REDUCER_NAME}/CHANGE_PASSWORD_ERROR`;
const SET_NEW_AVATAR = `${REDUCER_NAME}/SET_NEW_AVATAR`;
const EDIT_AVATAR_SUCCESS = `${REDUCER_NAME}/EDIT_AVATAR_SUCCESS`;
const EDIT_AVATAR_ERROR = `${REDUCER_NAME}/EDIT_AVATAR_ERROR`;
const DELETE_ACCOUNT_REQUEST_SUCCESS = `${REDUCER_NAME}/DELETE_ACCOUNT_REQUEST_SUCCESS`;
const DELETE_ACCOUNT_REQUEST_ERROR = `${REDUCER_NAME}/DELETE_ACCOUNT_REQUEST_ERROR`;
const DELETE_ACCOUNT_SUCCESS = `${REDUCER_NAME}/DELETE_ACCOUNT_SUCCESS`;
const DELETE_ACCOUNT_ERROR = `${REDUCER_NAME}/DELETE_ACCOUNT_ERROR`;

const initState = {
    info: {
        email: '',
        name: '',
        gender: '',
        avatar: '',
        createdAt: '',
        updatedAt: ''
    },
    language: getLocale().toUpperCase(),
    newPasswordInfo: {},
    editing: false,
    changingPassword: false,
    incompleteForm: false,
    incompletePasswordForm: true,
    successMessage: null,
    errorMessage: null,
    refreshNeeded: false,
    loading: true
};

export default (state = initState, action) => {
    switch (action.type) {
        case GET_ACCOUNT_INFO_SUCCESS:
            return {...state, info: action.info, language: getLocale().toUpperCase(), loading: false};
        case EDIT_ACCOUNT_ERROR:
        case GET_ACCOUNT_INFO_ERROR:
            return {...state, error: action.error, errors: action.errors, loading: false};
        case SET_ACCOUNT_FORM_FIELD: {
            const refreshNeeded = action.refreshNeeded ? action.refreshNeeded : state.refreshNeeded;
            return {...state, info: {...state.info, [action.field]: action.value}, refreshNeeded: refreshNeeded};
        }
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
        case DELETE_ACCOUNT_REQUEST_SUCCESS:
        case DELETE_ACCOUNT_SUCCESS:
            return {...state, successMessage: action.message};
        case DELETE_ACCOUNT_REQUEST_ERROR:
        case DELETE_ACCOUNT_ERROR:
            return {...state, errorMessage: action.error};
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
        });
    }
};

export const setEditAccountFormFieldValue = (field, value) => {
    return (dispatch, getState) => {
        field === 'language' ?
            dispatch({type: SET_ACCOUNT_FORM_FIELD, field: field, value: value, refreshNeeded: true})
            : dispatch({type: SET_ACCOUNT_FORM_FIELD, field: field, value: value});
        let reducer = getState().accountReducer;
        let completed = reducer.info['email'] && reducer.info['name'] && reducer.info['gender'];
        completed ? dispatch({type: ACCOUNT_COMPLETED_FORM}) : dispatch({type: ACCOUNT_INCOMPLETE_FORM});
    }
};

export const editAccountInfo = credentials => {
    return (dispatch, getState) => {
        patch(URI_ACCOUNT, credentials, null).then(response => {
            dispatch({type: EDIT_ACCOUNT_SUCCESS});
            if (getState().accountReducer['refreshNeeded']) {
                window.location.reload();
            }
        }).catch(response => {
            dispatch({type: EDIT_ACCOUNT_ERROR, error: response.data.message});
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
        }).catch(response => {
            dispatch({type: CHANGE_PASSWORD_ERROR, error: response.message});
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
        }).catch(response => {
            dispatch({type: EDIT_AVATAR_ERROR, error: response.data.message});
        });
    }
};

export const deleteAccountRequest = () => {
    return dispatch => {
        del(URI_ACCOUNT, null).then(response => {
            dispatch({type: DELETE_ACCOUNT_REQUEST_SUCCESS, message: response.message});
        }).catch(response => {
            dispatch({type: DELETE_ACCOUNT_REQUEST_ERROR, error: response.data.message});
        });
    }
};

export const deleteAccount = token => {
    return dispatch => {
        del(`${URI_ACCOUNT}/${token}`, null).then(response => {
            dispatch({type: DELETE_ACCOUNT_SUCCESS, message: response.message});
        }).catch(response => {
            dispatch({type: DELETE_ACCOUNT_ERROR, error: response.data.message});
        });
    }
};