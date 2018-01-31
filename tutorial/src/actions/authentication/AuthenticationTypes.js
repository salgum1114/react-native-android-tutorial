import { createActionTypes } from '../actionHelper';

const API_POST_LOGIN = createActionTypes('API_POST_LOGIN');
const API_POST_REGISTER = createActionTypes('API_POST_REGISTER');
const LOGOUT = createActionTypes('LOGOUT');

export {
    API_POST_LOGIN,
    LOGOUT,
    API_POST_REGISTER,
};
