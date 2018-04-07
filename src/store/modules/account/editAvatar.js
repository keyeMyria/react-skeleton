import {post} from '../../../utils/http';
import {LOCATION_CHANGE} from 'react-router-redux';
import {REDUCERS_GROUP_PREFIX, URI_ACCOUNT} from './constants';

const REDUCER_NAME = `${REDUCERS_GROUP_PREFIX}/edit-avatar`;

const SET_NEW_AVATAR = `${REDUCER_NAME}/SET_NEW_AVATAR`;
const EDIT_AVATAR_SUCCESS = `${REDUCER_NAME}/EDIT_AVATAR_SUCCESS`;
const EDIT_AVATAR_ERROR = `${REDUCER_NAME}/EDIT_AVATAR_ERROR`;
const OPEN_EDIT_AVATAR_MODAL = `${REDUCER_NAME}/OPEN_EDIT_AVATAR_MODAL`;
const CLOSE_EDIT_AVATAR_MODAL = `${REDUCER_NAME}/CLOSE_EDIT_AVATAR_MODAL`;

const initState = {
    refreshNeeded: false,
    newAvatar: null,
    isEditAvatarModalOpened: false
};

export default (state = initState, action) => {
    switch (action.type) {
        case SET_NEW_AVATAR:
            return {...state, newAvatar: action.value};
        case OPEN_EDIT_AVATAR_MODAL:
            return {...state, isEditAvatarModalOpened: true};
        case LOCATION_CHANGE:
        case CLOSE_EDIT_AVATAR_MODAL:
            return initState;

        case EDIT_AVATAR_SUCCESS:
        default:
            return state;
    }
}

export const onChangeAvatar = value => {
    return {type: SET_NEW_AVATAR, value: value};
};

export const editAvatar = credentials => {
    const formData = new FormData();
    formData.append('file', credentials);
    return dispatch => {
        post(URI_ACCOUNT + '/avatar', formData, {
            headers: {'content-type': 'multipart/form-data'}
        }).then(response => {
            window.location.reload();
        }).catch(response => {
            dispatch({type: EDIT_AVATAR_ERROR, error: response.data.message});
        });
    }
};

export const openEditAvatarModal = () => {
    return {type: OPEN_EDIT_AVATAR_MODAL};
};

export const closeEditAvatarModal = () => {
    return {type: CLOSE_EDIT_AVATAR_MODAL};
};
