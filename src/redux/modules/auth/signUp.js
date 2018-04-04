import {LOCATION_CHANGE, push} from 'react-router-redux';
import {APP_NAME} from "../../../config";
import {post} from "../../../utils/http";

const URI_AUTH = '/auth';
const URI_SIGN_UP = URI_AUTH + '/sign-up';

const SIGN_UP_SUCCESS = `${APP_NAME}/authentication/SIGN_UP_SUCCESS`;
const SIGN_UP_ERROR = `${APP_NAME}/authentication/SIGN_UP_ERROR`;
const COMPLETED_SIGN_UP_FORM = `${APP_NAME}/authentication/COMPLETED_SIGN_UP_FORM`;
const INCOMPLETE_SIGN_UP_FORM = `${APP_NAME}/authentication/INCOMPLETE_SIGN_UP_FORM`;
const SET_SIGN_UP_FORM_FIELD = `${APP_NAME}/authentication/SET_SIGN_UP_FORM_FIELD`;
const SIGN_UP_PASSWORDS_NOT_MATCHING_ERROR = `${APP_NAME}/authentication/SIGN_UP_PASSWORDS_NOT_MATCHING_ERROR`;

const initState = {
    formData: {
        email: null,
        password: null,
        passwordConfirmation: null,
        passwordsNotMatching: false,
        name: null,
        gender: null
    },
    error: null,
    incompleteForm: true,
    errors: [],
    errorMessage: null
};

export default (state = initState, action) => {
    switch (action.type) {
        case SIGN_UP_SUCCESS:
            return {...state, errorMessage: null, errors: [], passwordsNotMatching: false};
        case SIGN_UP_ERROR:
            return {...state, errorMessage: action.error, errors: action.errors, passwordsNotMatching: false};
        case SET_SIGN_UP_FORM_FIELD:
            return {...state, formData: {...state.formData, [action.field]: action.value}};
        case COMPLETED_SIGN_UP_FORM:
            return {...state, incompleteForm: false};
        case INCOMPLETE_SIGN_UP_FORM:
            return {...state, incompleteForm: true};
        case SIGN_UP_PASSWORDS_NOT_MATCHING_ERROR:
            return {...state, passwordsNotMatching: true};
        case LOCATION_CHANGE:
            return initState;
        default :
            return {...state};
    }
}

export const signUp = fields => {
    if (fields.password !== fields.passwordConfirmation) {
        return {type: SIGN_UP_PASSWORDS_NOT_MATCHING_ERROR};
    }
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

export const setSignUpFormFieldValue = (field, value) => {
    return (dispatch, getState) => {
        dispatch({type: SET_SIGN_UP_FORM_FIELD, field: field, value: value});
        let reducer = getState().authReducers.signUpReducer;
        const {email, password, passwordConfirmation, name, gender} = reducer.formData;
        let completed = email && password && passwordConfirmation && name && gender;
        completed ? dispatch({type: COMPLETED_SIGN_UP_FORM}) : dispatch({type: INCOMPLETE_SIGN_UP_FORM});
    }
};

