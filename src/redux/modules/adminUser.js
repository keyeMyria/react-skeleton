import {APP_NAME} from "../../config";
import {del, get} from "../../utils/http";

const URI_USERS = '/users';

const REDUCER_NAME = `${APP_NAME}/admin-user`;


const GET_USER_SUCCESS = `${REDUCER_NAME}/GET_USER_SUCCESS`;
const GET_USER_ERROR = `${REDUCER_NAME}/GET_USER_ERROR`;
const CHANGE_DELETE_USER_MODAL_VISIBILITY = `${REDUCER_NAME}/CHANGE_DELETE_USER_MODAL_VISIBILITY`;
const DELETE_USER_SUCCESS = `${REDUCER_NAME}/DELETE_USER_SUCCESS`;
const DELETE_USER_ERROR = `${REDUCER_NAME}/DELETE_USER_ERROR`;

const initState = {
    info: {},
    error: null,
    errorCode: null,
    deleteUserModalOpened: false,
    deleted: false,
    errorDeleteUser: null,
    loading: true
};

export default (state = initState, action) => {
    switch (action.type) {
        case GET_USER_SUCCESS:
            return {...state, info: action.response, loading: false};
        case GET_USER_ERROR:
            return {...state, errors: action.error, errorCode: action.errorCode, loading: false};
        case CHANGE_DELETE_USER_MODAL_VISIBILITY:
            return {...state, deleteUserModalOpened: action.visible};
        case DELETE_USER_SUCCESS:
            return {...state, deleted: true};
        case DELETE_USER_ERROR:
            return {...state, errorDeleteUser: action.error};
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

export const openDeleteUserModal = () => {
    return {type: CHANGE_DELETE_USER_MODAL_VISIBILITY, visible: true};
};

export const closeDeleteUserModal = () => {
    return {type: CHANGE_DELETE_USER_MODAL_VISIBILITY, visible: false};
};

export const deleteUser = id => {
    return dispatch => {
        dispatch(closeDeleteUserModal());
        del(`${URI_USERS}/${id}`, null, null).then(response => {
            dispatch({type: DELETE_USER_SUCCESS, response: response});
        }).catch(response => {
            dispatch({type: DELETE_USER_ERROR, error: response.message});
        });
    }
};