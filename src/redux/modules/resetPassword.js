import {APP_NAME} from "../../config";
import {post} from "../../utils/http";

const URI_RESET_PASSWORD = '/auth/reset-password';

const RESET_PASSWORD_REQUEST_SUCCESS = `${APP_NAME}/resetPassword/RESET_PASSWORD_REQUEST_SUCCESS`;
const RESET_PASSWORD_REQUEST_ERROR = `${APP_NAME}/resetPassword/RESET_PASSWORD_REQUEST_ERROR`;

const SET_EMAIL_FIELD = `${APP_NAME}/resetPassword/SET_EMAIL_FIELD`;
const SET_PASSWORD_FIELD = `${APP_NAME}/resetPassword/SET_PASSWORD_FIELD`;

const RESET_PASSWORD_SUCCESS = `${APP_NAME}/resetPassword/RESET_PASSWORD_SUCCESS`;
const RESET_PASSWORD_ERROR = `${APP_NAME}/resetPassword/RESET_PASSWORD_ERROR`;

const initState = {
    email: null,
    successMessage: null,
    errors: [],
    isIncomplete: true
};

export default (state = initState, action) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST_SUCCESS:
            return {...state, successMessage: action.message};
        case RESET_PASSWORD_REQUEST_ERROR:
            return {...state, errors: action.errors};
        case SET_EMAIL_FIELD:
            return {...state, email: action.value, isIncomplete: action.isIncomplete};
        case SET_PASSWORD_FIELD:
            return {...state, [action.field]: action.value, isIncomplete: action.isIncomplete};
        case RESET_PASSWORD_SUCCESS:
            return {...state, successMessage: action.message};
        case RESET_PASSWORD_ERROR:
            return {...state, errorMessage: action.error};
        default :
            return state
    }
}

export const onChangeResetPasswordEmailField = value => {
    return {
        type: SET_EMAIL_FIELD,
        value: value,
        isIncomplete: (value !== null && value !== '')
    };
};

export const requestResetPassword = email => {
    const body = {
        email: email
    };
    return dispatch => {
        post(`${URI_RESET_PASSWORD}`, body, null).then(response => {
            dispatch({type: RESET_PASSWORD_REQUEST_SUCCESS, message: response.data.message});
        }).catch(response => {
            dispatch({type: RESET_PASSWORD_REQUEST_ERROR, errors: response.errors});
        });
    }
};

export const onChangeResetPasswordPasswordField = (field, value) => {
    return (dispatch, getState) => {
        const reducer = getState().resetPasswordReducer;
        const completed = reducer['password'] && reducer['passwordConfirmation'];
        dispatch({
            type: SET_PASSWORD_FIELD,
            field: field,
            value: value,
            isIncomplete: !completed
        });
    }
};

export const resetPassword = (token, password, passwordConfirmation) => {
    if (password !== passwordConfirmation) {
        return {
            type: RESET_PASSWORD_ERROR, error: 'The passwords need to match'
        };
    }
    const body = {
        password: password,
        passwordConfirmation: passwordConfirmation
    };
    return dispatch => {
        post(`${URI_RESET_PASSWORD}/${token}`, body, null).then(response => {
            dispatch({type: RESET_PASSWORD_REQUEST_SUCCESS, message: response.data.message});
        }).catch(response => {
            dispatch({type: RESET_PASSWORD_REQUEST_ERROR, error: response.message});
        });
    }
};
