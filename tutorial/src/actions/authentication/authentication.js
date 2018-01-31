import * as AuthenticationTypes from './AuthenticationTypes';
import { authenticationService } from '../../services/apis';
import { createActionHelper, createActionsHelper, createRequestHelper } from '../actionHelper';

const loginActions = createActionsHelper(AuthenticationTypes.API_POST_LOGIN);

const loginRequest = (userId, password) => (dispatch) => {
    dispatch(loginActions.REQUEST());
    return authenticationService.login({ userId, password })
        .then((response) => {
            dispatch(loginActions.SUCCESS());
        }).catch((error) => {
            dispatch(loginActions.FAILURE(error.message));
        });
};

const logoutAction = createActionHelper(AuthenticationTypes.LOGOUT.SUCCESS);

const logout = () => (dispatch) => {
    dispatch(logoutAction());
};

const registerActions = createActionsHelper(AuthenticationTypes.API_POST_REGISTER);

const registerRequest = (username, password) =>
    createRequestHelper(AuthenticationTypes.API_POST_REGISTER, authenticationService.register, { username, passowrd });

export {
    loginRequest,
    logout,
    registerRequest,
};
