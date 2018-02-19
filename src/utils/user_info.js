import {getCookie} from './cookies';

const USER_INFO_KEY = "USER_INFO";
const ROLES_ATTRIBUTE = "ROLES";
const LANGUAGE_ATTRIBUTE = "LANGUAGE";

export const getUserRoles = () => {
    let userAuthData = getCookie(USER_INFO_KEY);
    if (userAuthData != null) {
        let decodedCredentials = JSON.parse(window.atob(userAuthData));
        return decodedCredentials[ROLES_ATTRIBUTE];
    }
    return null;
};

export const getUserLanguage = () => {
    let userAuthData = getCookie(USER_INFO_KEY);
    if (userAuthData != null) {
        let decodedCredentials = JSON.parse(window.atob(userAuthData));
        return decodedCredentials[LANGUAGE_ATTRIBUTE];
    }
    return null;
};

export const isUserLogged = () => {
    return getCookie(USER_INFO_KEY) !== null;
};
