import {APP_NAME} from "../../config";
import {get} from "../../utils/http";

const URI_USERS = '/users';

const REDUCER_NAME = `${APP_NAME}/admin-user`;


const GET_USER_SUCCESS = `${REDUCER_NAME}/GET_USER_SUCCESS`;
const GET_USER_ERROR = `${REDUCER_NAME}/GET_USER_ERROR`;


const initState = {
    info: {},
    error: null,
    errorCode: null
};

export default (state = initState, action) => {
    switch (action.type) {
        case GET_USER_SUCCESS:
            return {...state, info: action.response};
        case GET_USER_ERROR:
            return {...state, errors: action.error, errorCode: action.errorCode};
        default :
            return state
    }
}

export const getUser = id => {
    return dispatch => {
        get(`${URI_USERS}/${id}`, null, null).then(response => {
            dispatch({type: GET_USER_SUCCESS, response: response});
        }).catch(response => {
            dispatch({type: GET_USER_ERROR, error: response.message, errorCode: response.status});
        });
    }
};
