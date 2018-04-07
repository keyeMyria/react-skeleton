import {APP_NAME} from '../../../config';

export const REDUCERS_GROUP_PREFIX = `${APP_NAME}/auth`;

const URI_AUTH = '/auth';
export const URI_SIGN_IN = URI_AUTH + '/login';
export const URI_LOGOUT = URI_AUTH + '/logout';
export const URI_SIGN_UP = URI_AUTH + '/sign-up';
export const URI_RESET_PASSWORD = '/auth/reset-password';
