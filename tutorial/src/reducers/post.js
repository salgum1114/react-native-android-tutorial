import * as PostTypes from '../actions/posts/PostTypes';
import { TYPES, COMMAND, updateReducer } from '../actions/actionHelper';

const initialState = {
    statusMessage: 'INIT',
    errorMessage: 'NONE',
    posts: [],
}

export default function post(state = initialState, action) {
    switch (action.type) {
        case PostTypes.API_GET_POSTS.REQUEST:
            return updateReducer(state, TYPES.REQUEST, { posts: [] }, COMMAND.SET);
        case PostTypes.API_GET_POSTS.SUCCESS:
            return updateReducer(state, TYPES.SUCCESS, { posts: action.payload }, COMMAND.SET);
        case PostTypes.API_GET_POSTS.FAILURE:
            return updateReducer(state, TYPES.FAILURE, { posts: [], errorMessage: action.payload }, COMMAND.SET);
        default:
            return state;
    }
};
