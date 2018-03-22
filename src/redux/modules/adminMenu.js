import {APP_NAME} from "../../config";

const REDUCER_NAME = `${APP_NAME}/admin-menu`;

const CHANGE_ACTIVE_PAGE = `${REDUCER_NAME}/CHANGE_ACTIVE_PAGE`;

const initState = {
    active: 'home'
};

export default (state = initState, action) => {
    switch (action.type) {
        case CHANGE_ACTIVE_PAGE:
            return {...state, active: action.page};
        default :
            return state
    }
}

export const changeActivePage = page => {
    return {type: CHANGE_ACTIVE_PAGE, page: page}
};
