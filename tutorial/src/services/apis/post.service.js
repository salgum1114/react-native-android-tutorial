import { client } from '../http';
import { urlConstants } from '../urls';

const POST_URL = urlConstants.POST_URL;

const getPosts = () => (
    client.get(POST_URL.API_POST_URL)
);

export {
    getPosts,
};
