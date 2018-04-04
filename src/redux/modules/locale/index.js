import {getLocaleData} from '../../../i18n/utils';
import {APP_NAME} from "../../../config";

const SIGN_IN_SUCCESS = `${APP_NAME}/authentication/SIGN_IN_SUCCESS`;
const LOGOUT = `${APP_NAME}/authentication/LOGOUT`;

const initState = getLocaleData();

export default (state = initState, action) => {
    switch (action.type) {
        case SIGN_IN_SUCCESS:
        case LOGOUT: {
            let newLocale = getLocaleData();
            return {...state, locale: newLocale.locale, key: newLocale.key, messages: newLocale.messages};
        }
        default :
            return state;
    }
}
