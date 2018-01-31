import { constants } from '../../../constants';

const AUTHENTICATION_URL = {
    API_LOGIN_URL: `${constants.API_AUTH_PREFIX}/login`,
    API_REGISTER_URL: `${constants.API_NOAUTH_PREFIX}/register`,
};

const POST_URL = {
    API_POST_URL: `${constants.API_PREFIX}/posts`,
}

export {
    AUTHENTICATION_URL,
    POST_URL,
};
