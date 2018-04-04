import {APP_NAME} from "../../../config";
import {get, patch} from "../../../utils/http";
import {getLocale} from "../../../i18n/utils";

const URI_ACCOUNT = '/account';

const REDUCER_NAME = `${APP_NAME}/account`;

const GET_ACCOUNT_INFO_SUCCESS = `${REDUCER_NAME}/GET_ACCOUNT_INFO_SUCCESS`;
const GET_ACCOUNT_INFO_ERROR = `${REDUCER_NAME}/GET_ACCOUNT_INFO_ERROR`;
const SET_ACCOUNT_FORM_FIELD = `${REDUCER_NAME}/SET_ACCOUNT_FORM_FIELD`;
const ACCOUNT_COMPLETED_FORM = `${REDUCER_NAME}/ACCOUNT_COMPLETED_FORM`;
const ACCOUNT_INCOMPLETE_FORM = `${REDUCER_NAME}/ACCOUNT_INCOMPLETE_FORM`;
const EDIT_ACCOUNT_SUCCESS = `${REDUCER_NAME}/EDIT_ACCOUNT_SUCCESS`;
const EDIT_ACCOUNT_ERROR = `${REDUCER_NAME}/EDIT_ACCOUNT_ERROR`;

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
    incompleteForm: false,
    errorMessage: null,
    errors: [],
    loading: true
};

export default (state = initState, action) => {
    switch (action.type) {
        case GET_ACCOUNT_INFO_SUCCESS:
            return {...state, info: action.info, language: getLocale().toUpperCase(), loading: false};
        case EDIT_ACCOUNT_ERROR:
        case GET_ACCOUNT_INFO_ERROR:
            return {...state, errorMessage: action.error, errors: action.errors, loading: false};
        case SET_ACCOUNT_FORM_FIELD: {
            const refreshNeeded = action.refreshNeeded ? action.refreshNeeded : state.refreshNeeded;
            return {...state, info: {...state.info, [action.field]: action.value}, refreshNeeded: refreshNeeded};
        }
        case ACCOUNT_COMPLETED_FORM:
            return {...state, incompleteForm: false};
        case ACCOUNT_INCOMPLETE_FORM:
            return {...state, incompleteForm: true};
        case EDIT_ACCOUNT_SUCCESS:
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
        let reducer = getState().accountReducers.accountInfoReducer;
        let completed = reducer.info['email'] && reducer.info['name'] && reducer.info['gender'];
        completed ? dispatch({type: ACCOUNT_COMPLETED_FORM}) : dispatch({type: ACCOUNT_INCOMPLETE_FORM});
    }
};

export const editAccountInfo = credentials => {
    return (dispatch, getState) => {
        patch(URI_ACCOUNT, credentials, null).then(response => {
            dispatch({type: EDIT_ACCOUNT_SUCCESS});
            if (getState().accountReducers.accountInfoReducer['refreshNeeded']) {
                window.location.reload();
            }
        }).catch(response => {
            dispatch({type: EDIT_ACCOUNT_ERROR, error: response.data.message});
        });
    }
};
