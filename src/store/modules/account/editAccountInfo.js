import {patch} from '../../../utils/http';
import {getAccountInfo} from './accountInfo';
import {REDUCERS_GROUP_PREFIX, URI_ACCOUNT} from './constants';

const REDUCER_NAME = `${REDUCERS_GROUP_PREFIX}/edit`;

const SET_INITIAL_ACCOUNT_INFO = `${REDUCER_NAME}/SET_INITIAL_ACCOUNT_INFO`;
const SET_ACCOUNT_FORM_FIELD = `${REDUCER_NAME}/SET_ACCOUNT_FORM_FIELD`;
const ACCOUNT_COMPLETED_FORM = `${REDUCER_NAME}/ACCOUNT_COMPLETED_FORM`;
const ACCOUNT_INCOMPLETE_FORM = `${REDUCER_NAME}/ACCOUNT_INCOMPLETE_FORM`;
const EDIT_ACCOUNT_SUCCESS = `${REDUCER_NAME}/EDIT_ACCOUNT_SUCCESS`;
const EDIT_ACCOUNT_ERROR = `${REDUCER_NAME}/EDIT_ACCOUNT_ERROR`;

const initState = {
    formData: {
        email: '',
        name: '',
        gender: '',
        language: ''
    },
    incompleteForm: false,
    errorMessage: null,
    errors: [],
    loading: true,
    refreshNeeded: false
};

export default (state = initState, action) => {
    switch (action.type) {
        case SET_INITIAL_ACCOUNT_INFO: {
            const {info} = action;
            return {
                ...state,
                formData: {email: info.email, name: info.name, gender: info.gender, language: info.language}
            };
        }
        case EDIT_ACCOUNT_ERROR:
            return {...state, errorMessage: action.error, errors: action.errors, loading: false};
        case SET_ACCOUNT_FORM_FIELD:
            return {
                ...state, formData: {...state.formData, [action.field]: action.value}, refreshNeeded: action.refreshNeeded
            };
        case ACCOUNT_COMPLETED_FORM:
            return {...state, incompleteForm: false};
        case ACCOUNT_INCOMPLETE_FORM:
            return {...state, incompleteForm: true};
        case EDIT_ACCOUNT_SUCCESS:
        default:
            return state;
    }
}

export const setInitialAccountInfo = info => {
    return {type: SET_INITIAL_ACCOUNT_INFO, info: info};
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

export const editAccountInfo = formData => {
    return (dispatch, getState) => {
        const {info} = getState().accountReducers.accountInfoReducer;
        const fieldsChanged = {};
        Object.keys(formData).filter(key => formData[key] !== info[key]).forEach(key => {
            fieldsChanged[key] = formData[key];
        });
        patch(URI_ACCOUNT, fieldsChanged, null).then(response => {
            dispatch({type: EDIT_ACCOUNT_SUCCESS});
            getState().accountReducers.editAccountInfoReducer.refreshNeeded ? window.location.reload() : dispatch(getAccountInfo());
        }).catch(response => {
            dispatch({type: EDIT_ACCOUNT_ERROR, error: response.message});
        });
    }
};
