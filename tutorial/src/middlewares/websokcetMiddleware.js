import storage from 'store/storages/localStorage';
import {
    WEBSOCKET_CONNECT,
    WEBSOCKET_DISCONNECT,
    WEBSOCKET_SEND,
} from '../actions/websocket/WebsocketTypes';
import {
    closed,
    open,
    message,
} from '../actions/websocket/websocket';

/**
 * Formats args for creating the WebSocket instance
 */
const extractArgs = (config) => {
    if (config.args) {
        return config.args;
    }
    if (config.url) {
        const accessToken = storage.read('access_token');
        return [`${config.url}?access_token=Bearer ${accessToken}`];
    }

    return [];
};

/**
 * Create a websocket object from the incoming config
 */
const createWebsocket = (payload) => {
    const args = extractArgs(payload);
    const websocket = (payload.websocket) ? payload.websocket : WebSocket;
    return new websocket(...args);
};

const websocketMiddleware = () => {
    const websockets = {};
    /**
     * A function to create the WebSocket object and attach the standard callbacks
     */
    const initialize = ({ dispatch }, action) => new Promise((resolve) => {
        // Instantiate the websocket.
        const websocket = createWebsocket(action.payload);
        const splitUrl = action.payload.url.split('/');
        const type = splitUrl[splitUrl.length - 1];
        Object.assign(websockets, { [type]: websocket });
        // Setup handlers to be called like this:
        websocket.onopen = (event) => {
            dispatch(open(event));
            resolve(true);
        };
        websocket.onclose = (event) => {
            dispatch(closed(event));
            resolve(true);
        };
        websocket.onmessage = event => dispatch(message(event));
    });

    /**
     * Close the WebSocket connection and cleanup
     */
    const close = ({ type }) => {
        if (websockets[type]) {
            console.warn(`Closing WebSocket connection to ${websockets[type].currentTarget.url} ...`);
            websockets[type].close();
            websockets[type] = null;
        }
    };

    /**
     * Wait for the connection to be established.
     * @param {*} callback 
     */
    const waitForSocketConnection = (websocket, callback) => {
        setTimeout(() => {
            if (websocket.readyState === 1) {
                if (callback !== undefined) {
                    callback();
                }
                return;
            }
            waitForSocketConnection(websocket, callback);
        }, 5);
    };

    /**
     * A function to send payload the WebSocket
     * @param {*} payload
     * @param {*} callback
     */
    const send = ({ type, subscriber }) => {
        if (websockets[type]) {
            waitForSocketConnection(websockets[type], () => {
                websockets[type].send(JSON.stringify(subscriber));
            });
        } else {
            console.warn('WebSocket is closed, ignoring. Trigger a WEBSOCKET_CONNECT first');
        }
    };

    /**
     * The primary Redux middleware function.
     * Each of the actions handled are user-dispatched.
     */
    return store => next => (action) => {
        switch (action.type) {
            // User request to connect
            case WEBSOCKET_CONNECT:
                if (websockets[action.payload.type]) {
                    next(action);
                    if (websockets[action.payload.type].readyState === 2 || websockets[action.payload.type].readyState === 3) {
                        console.warn('WebSocket is closed, ignoring. Trigger a WEBSOCKET_CONNECT first');
                        break;
                    }
                    return new Promise((resolve) => {
                        resolve(true);
                    });
                }
                if (!websockets[action.payload.type]) {
                    const promise = initialize(store, action);
                    next(action);
                    return promise;
                }
                break;
            // User request to disconnect
            case WEBSOCKET_DISCONNECT:
                close(action.payload);
                next(action);
                break;
            // User request to send a message
            case WEBSOCKET_SEND:
                send(action.payload);
                next(action);
                break;
            default:
                next(action);
                break;
        }
    };
};

export default websocketMiddleware();
