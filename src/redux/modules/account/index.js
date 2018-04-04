import {combineReducers} from "redux";
import accountInfoReducer from './accountInfo';
import editAvatarReducer from './editAvatar';
import confirmAccountReducer from './confirmAccount';
import resetPasswordReducer from './resetPassword';
import changePasswordReducer from './changePassword';
import deleteAccountReducer from './deleteAccount';

export default combineReducers({
    accountInfoReducer,
    editAvatarReducer,
    confirmAccountReducer,
    resetPasswordReducer,
    changePasswordReducer,
    deleteAccountReducer
});