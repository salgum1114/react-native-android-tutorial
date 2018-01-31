import * as PostTypes from './PostTypes';
import { postService } from '../../services/apis';
import { createActionHelper, createActionsHelper, createRequestHelper } from '../actionHelper';

const getPostsRequest = (username, password) =>
    createRequestHelper(PostTypes.API_GET_POSTS, postService.getPosts);

export {
    getPostsRequest,
};
