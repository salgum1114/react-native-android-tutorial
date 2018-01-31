import * as AuthenticationTypes from '../actions/authentication/AuthenticationTypes';
import { TYPES, COMMAND, updateReducer } from '../actions/actionHelper';

const initialState = {
    statusMessage: 'INIT',
    errorMessage: 'NONE',
    isLoggedIn: false,
}

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case AuthenticationTypes.LOGOUT.SUCCESS:
            return updateReducer(state, TYPES.SUCCESS, { isLoggedIn: false }, COMMAND.SET);
        case AuthenticationTypes.API_POST_LOGIN.REQUEST:
            return updateReducer(state, TYPES.REQUEST, { isLoggedIn: false }, COMMAND.SET);
        case AuthenticationTypes.API_POST_LOGIN.SUCCESS:
            return updateReducer(state, TYPES.SUCCESS, { isLoggedIn: true }, COMMAND.SET);
        case AuthenticationTypes.API_POST_LOGIN.FAILURE:
            return updateReducer(state, TYPES.FAILURE, { isLoggedIn: false, errorMessage: action.payload }, COMMAND.SET);
        case AuthenticationTypes.API_POST_REGISTER.REQUEST:
            return updateReducer(state, TYPES.REQUEST, null, COMMAND.SET);
        case AuthenticationTypes.API_POST_REGISTER.SUCCESS:
            return updateReducer(state, TYPES.SUCCESS, null, COMMAND.SET);
        case AuthenticationTypes.API_POST_REGISTER.FAILURE:
            return updateReducer(state, TYPES.FAILURE, { errorMessage: action.payload }, COMMAND.SET);
        default:
            return state;
    }
};
