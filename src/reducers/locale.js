import {getLocale, getMessages} from '../i18n/utils';
import {LOGOUT, SIGN_IN_SUCCESS} from '../types/authentication';

let locale = getLocale();
const initState = {
    locale: locale,
    key: locale,
    messages: getMessages(locale)
};

export default (state = initState, action) => {
    switch (action.type) {
        case SIGN_IN_SUCCESS:
            locale = getLocale();
            return {
                locale: locale,
                key: locale,
                messages: getMessages(locale)
            };
        case LOGOUT:
            locale = getLocale();
            return {
                locale: locale,
                key: locale,
                messages: getMessages(locale)
            };
        default :
            return state
    }
}
