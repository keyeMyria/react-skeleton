import {APP_NAME} from "../../config";
import {error, info} from "react-notification-system-redux";
import {get, patch} from "../../utils/http";

const URI_ACCOUNT = '/account';

const GET_ACCOUNT_INFO_SUCCESS = `${APP_NAME}/authentication/GET_ACCOUNT_INFO_SUCCESS`;
const GET_ACCOUNT_INFO_ERROR = `${APP_NAME}/authentication/GET_ACCOUNT_INFO_ERROR`;
const OPEN_EDIT_ACCOUNT_INFO = `${APP_NAME}/authentication/OPEN_EDIT_ACCOUNT_INFO`;
const EXIT_EDIT_ACCOUNT_INFO = `${APP_NAME}/authentication/EXIT_EDIT_ACCOUNT_INFO`;
const SET_ACCOUNT_FORM_FIELD = `${APP_NAME}/authentication/SET_ACCOUNT_FORM_FIELD`;
const ACCOUNT_COMPLETED_FORM = `${APP_NAME}/authentication/ACCOUNT_COMPLETED_FORM`;
const ACCOUNT_INCOMPLETE_FORM = `${APP_NAME}/authentication/ACCOUNT_INCOMPLETE_FORM`;
const EDIT_ACCOUNT_SUCCESS = `${APP_NAME}/authentication/EDIT_ACCOUNT_SUCCESS`;
const EDIT_ACCOUNT_ERROR = `${APP_NAME}/authentication/EDIT_ACCOUNT_ERROR`;

const initState = {
    info: {},
    editing: false,
    incompleteForm: false
};

export default (state = initState, action) => {
    switch (action.type) {
        case GET_ACCOUNT_INFO_SUCCESS:
            return {...state, info: action.info};
        case EDIT_ACCOUNT_ERROR:
        case GET_ACCOUNT_INFO_ERROR:
            return {...state, error: action.error, errors: action.errors};
        case OPEN_EDIT_ACCOUNT_INFO:
            return {...state, editing: true};
        case EXIT_EDIT_ACCOUNT_INFO:
            return {...state, editing: false};
        case SET_ACCOUNT_FORM_FIELD:
            return {...state, info: {...state.info, [action.field]: action.value}};
        case ACCOUNT_COMPLETED_FORM:
            return {...state, incompleteForm: false};
        case ACCOUNT_INCOMPLETE_FORM:
            return {...state, incompleteForm: true};
        case EDIT_ACCOUNT_SUCCESS:
            return {...state, editing: false};
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

export const openEditAccountInfo = () => {
    return {type: OPEN_EDIT_ACCOUNT_INFO};
};

export const exitEditAccountInfo = () => {
    return {type: EXIT_EDIT_ACCOUNT_INFO};
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
                message: response.data.message,
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