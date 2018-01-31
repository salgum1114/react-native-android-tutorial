import Login from '../containers/Login';
import Register from '../containers/Register';
import Posts from '../containers/Posts';

const AUTHENTICATION_ROUTES = [
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/find-password',
        component: Register,
    },
];

const MAIN_ROUTES = [
    {
        path: '/posts',
        component: Posts,
    }
];

export {
    AUTHENTICATION_ROUTES,
    MAIN_ROUTES,
};
