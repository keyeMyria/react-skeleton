import {APP_NAME} from "../../../config";
import {put} from "../../../utils/http";

const URI_CHANGE_EMAIL =  '/account/email';

const CHANGE_EMAIL_SUCCESS = `${APP_NAME}/confirmAccount/CHANGE_EMAIL_SUCCESS`;
const CHANGE_EMAIL_ERROR = `${APP_NAME}/confirmAccount/CHANGE_EMAIL_ERROR`;

const initState = {
    confirmed: false
};

export default (state = initState, action) => {
    switch (action.type) {
        case CHANGE_EMAIL_SUCCESS:
            return {...state, confirmed: true, successMessage: action.message};
        case CHANGE_EMAIL_ERROR:
            return {...state, errorMessage: action.error};
        default:
            return state
    }
}

export const confirmChangeEmail = token => {
    return dispatch => {
        put(`${URI_CHANGE_EMAIL}/${token}`, null, null).then(response => {
            dispatch({type: CHANGE_EMAIL_SUCCESS, message: response.data.message});
        }).catch(response => {
            dispatch({type: CHANGE_EMAIL_ERROR, error: response.message});
        });
    }
};
