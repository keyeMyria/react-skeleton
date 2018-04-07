import {del} from '../../../utils/http';
import {LOCATION_CHANGE} from 'react-router-redux';
import {REDUCERS_GROUP_PREFIX, URI_ACCOUNT} from './constants';

const REDUCER_NAME = `${REDUCERS_GROUP_PREFIX}/delete`;

const DELETE_ACCOUNT_REQUEST_SUCCESS = `${REDUCER_NAME}/DELETE_ACCOUNT_REQUEST_SUCCESS`;
const DELETE_ACCOUNT_REQUEST_ERROR = `${REDUCER_NAME}/DELETE_ACCOUNT_REQUEST_ERROR`;
const DELETE_ACCOUNT_SUCCESS = `${REDUCER_NAME}/DELETE_ACCOUNT_SUCCESS`;
const DELETE_ACCOUNT_ERROR = `${REDUCER_NAME}/DELETE_ACCOUNT_ERROR`;

const initState = {
    successMessage: null,
    errorMessage: null
};

export default (state = initState, action) => {
    switch (action.type) {
        case DELETE_ACCOUNT_REQUEST_SUCCESS:
        case DELETE_ACCOUNT_SUCCESS:
            return {...state, successMessage: action.message};
        case DELETE_ACCOUNT_REQUEST_ERROR:
        case DELETE_ACCOUNT_ERROR:
            return {...state, errorMessage: action.error};
        case LOCATION_CHANGE:
            return initState;
        default:
            return state;
    }
}

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