import { client } from '../http';
import { urlConstants } from '../urls';

const AUTHENTICATION_URL = urlConstants.AUTHENTICATION_URL;

const login = ({ username, password }) => (
    client.post(AUTHENTICATION_URL.API_LOGIN_URL, { username, password })
);

const register = ({ username, password }) => (
    client.post(AUTHENTICATION_URL.API_REGISTER_URL, { username, password }) 
);

export {
    login,
    register,
};
