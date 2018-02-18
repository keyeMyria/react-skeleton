const AUTH_STORAGE_KEY = "AUTH_DATA";
const ROLES_HEADER = "roles";
const LANGUAGE_HEADER = "language";


export const clearAuthStorage = () => {
    getAuthStorage().removeItem(AUTH_STORAGE_KEY);
};

export const getUserRoles = () => {
    let userAuthData = getAuthStorage().getItem(AUTH_STORAGE_KEY);
    if (userAuthData != null) {
        let decodedCredentials = JSON.parse(window.atob(userAuthData));
        return decodedCredentials.roles;
    }
    return null;
};

export const getUserLanguage = () => {
    let userAuthData = getAuthStorage().getItem(AUTH_STORAGE_KEY);
    if (userAuthData != null) {
        let decodedCredentials = JSON.parse(window.atob(userAuthData));
        return decodedCredentials.language;
    }
    return null;
};

export const setAuthStorage = (response, remember) => {
    let authCredentials = {
        remember: remember,
        roles: response.headers[ROLES_HEADER],
        language: response.headers[LANGUAGE_HEADER]
    };
    if (remember) {
        localStorage.setItem(AUTH_STORAGE_KEY, window.btoa(JSON.stringify(authCredentials)));
    } else {
        sessionStorage.setItem(AUTH_STORAGE_KEY, window.btoa(JSON.stringify(authCredentials)));
    }
};

export const isUserLogged = () => {
    return getAuthStorage().getItem(AUTH_STORAGE_KEY) !== null;
};

export const getAuthStorage = () => {
    let userAuthData = localStorage.getItem(AUTH_STORAGE_KEY);
    if (userAuthData == null) {
        return sessionStorage;
    }
    let decodedCredentials = JSON.parse(window.atob(userAuthData));
    return decodedCredentials.remember ? localStorage : sessionStorage;
};
