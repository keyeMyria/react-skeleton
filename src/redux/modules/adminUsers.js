import {APP_NAME} from "../../config";
import {get} from "../../utils/http";

const URI_USERS = '/users';

const REDUCER_NAME = `${APP_NAME}/admin-users`;


const GET_USERS_SUCCESS = `${REDUCER_NAME}/GET_USERS_SUCCESS`;
const GET_USERS_ERROR = `${REDUCER_NAME}/GET_USERS_ERROR`;


const initState = {
    users: [],
    page: 0,
    size: 20,
    isFirst: true,
    isLast: false,
    numberOfPages: 1
};

export default (state = initState, action) => {
    switch (action.type) {
        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: state.page > 0 ? state.users.concat(action.response.content) : action.response.content,
                isFirst: action.response.first,
                isLast: action.response.last,
                numberOfPages: action.response.totalPages
            };
        case GET_USERS_ERROR:
            return {...state, error: action.error};
        default :
            return state
    }
}

export const getUsers = (page, size) => {
    const params = {
        page: page,
        size: size
    };
    return dispatch => {
        get(`${URI_USERS}`, null, params).then(response => {
            dispatch({type: GET_USERS_SUCCESS, response: response});
        }).catch(response => {
            dispatch({type: GET_USERS_ERROR, error: response.error});
        });
    }
};
