import {combineReducers} from "redux";
import accountInfoReducer from './accountInfo';
import editAccountInfoReducer from './editAccountInfo';
import editAvatarReducer from './editAvatar';
import confirmAccountReducer from './confirmAccount';
import resetPasswordReducer from './resetPassword';
import changePasswordReducer from './changePassword';
import changeEmailReducer from './changeEmail';
import deleteAccountReducer from './deleteAccount';

export default combineReducers({
    accountInfoReducer,
    editAccountInfoReducer,
    editAvatarReducer,
    confirmAccountReducer,
    resetPasswordReducer,
    changePasswordReducer,
    changeEmailReducer,
    deleteAccountReducer
});