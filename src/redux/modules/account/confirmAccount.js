import {APP_NAME} from "../../../config";
import {post} from "../../../utils/http";
import {LOCATION_CHANGE} from "react-router-redux";

const URI_CONFIRM_ACCOUNT =  '/auth/confirmation';

const CONFIRM_SUCCESS = `${APP_NAME}/confirmAccount/CONFIRM_ACCOUNT_SUCCESS`;
const CONFIRM_ACCOUNT_ERROR = `${APP_NAME}/confirmAccount/CONFIRM_ACCOUNT_ERROR`;

const initState = {
    confirmed: false
};

export default (state = initState, action) => {
    switch (action.type) {
        case CONFIRM_SUCCESS:
            return {...state, confirmed: true, successMessage: action.message};
        case CONFIRM_ACCOUNT_ERROR:
            return {...state, errorMessage: action.error};
        case LOCATION_CHANGE:
            return initState;
        default :
            return state
    }
}


export const confirmAccount = token => {
    return dispatch => {
        post(`${URI_CONFIRM_ACCOUNT}/${token}`, null, null).then(response => {
            dispatch({type: CONFIRM_SUCCESS, message: response.data.message});
        }).catch(response => {
            dispatch({type: CONFIRM_ACCOUNT_ERROR, error: response.message});
        });
    }
};
