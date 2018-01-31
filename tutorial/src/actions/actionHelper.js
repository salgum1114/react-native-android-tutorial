/*
    Creates $NAME_REQUEST, $NAME_SUCESS, $NAME_FAILURE actions
    accessed by $NAME.$STATE, e.g. FETCH_MESSAGE.REQUEST
*/
import { createAction } from 'redux-actions';
import update from 'immutability-helper';

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export const TYPES = {
    REQUEST, SUCCESS, FAILURE,
};

export const PUSH = 'PUSH';
export const UNSHIFT = 'UNSHIFT';
export const SPLICE = 'SPLICE';
export const SET = 'SET';
export const UNSET = 'UNSET';
export const MERGE = 'MERGE';
export const APPLY = 'APPLY';

export const COMMAND = {
    MERGE, SET, PUSH,
};

export const createActionTypes = (base) => {
    return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
        acc[type] = `${base}_${type}`;
        return acc;
    }, {});
};

export const createActionHelper = (base) => {
    return createAction(base);
};

export const createActionsHelper = (base) => {
    return Object.keys(base).reduce((acc, type) => {
        acc[type] = createAction(base[type]);
        return acc;
    }, {});
};

export const createRequestHelper = (base, api, payload, headers) => (dispatch) => {
    const actionCreators = createActionsHelper(base);
    dispatch(actionCreators.REQUEST(payload));
    return api(payload, headers).then((response) => {
        dispatch(actionCreators.SUCCESS(response.data));
        return response;
    }).catch((error) => {
        dispatch(actionCreators.FAILURE(error.message));
        return error;
    });
};

export const createRequestHelperV1 = (base, api, payload, headers) => () => (dispatch) => {
    const actionCreators = createActionsHelper(base);
    dispatch(actionCreators.REQUEST(payload));
    return api(payload, headers).then((response) => {
        dispatch(actionCreators.SUCCESS(response.data));
    }).catch((error) => {
        dispatch(actionCreators.FAILURE(error.message));
    });
};

export const createAsyncRequestHelper = (base, api, payload, headers) => async (dispatch) => {
    const actionCreators = createActionsHelper(base);
    dispatch(actionCreators.REQUEST(payload));
    try {
        const response = await api(payload, headers);
        dispatch(actionCreators.SUCCESS(response.data));
    } catch (error) {
        dispatch(actionCreators.FAILURE(error.message));
    }
};

export const createAsyncRequestHelperV1 = (base, api, payload, headers) => () => async (dispatch) => {
    const actionCreators = createActionsHelper(base);
    dispatch(actionCreators.REQUEST(payload));
    try {
        const response = await api(payload, headers);
        dispatch(actionCreators.SUCCESS(response.data));
    } catch (error) {
        dispatch(actionCreators.FAILURE(error.message));
    }
};

export const updateReducer = (state, actionType, payload, command) => {
    if (!payload) {
        return update(state, {
            statusMessage: {
                $set: actionType,
            },
        });
    }
    return Object.keys(payload).reduce((prev, curr) => {
        if (command === SET) {
            return update(prev, {
                statusMessage: {
                    $set: actionType,
                },
                [curr]: {
                    $set: payload[curr],
                },
            });
        } else if (command === MERGE) {
            return update(prev, {
                statusMessage: {
                    $set: actionType,
                },
                [curr]: {
                    $merge: payload[curr],
                },
            });
        } else if (command === PUSH) {
            return update(prev, {
                statusMessage: {
                    $set: actionType,
                },
                [curr]: {
                    $push: payload[curr],
                },
            });
        }
    }, state);
};
