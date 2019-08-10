import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../types';

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        // depending on the action, we're going to do something different
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true,
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        // when user logs out, sets state back to authenticated false and no data
        case SET_USER:
            return {
                authenticated: true,
                ...action.payload
                // from the api, when we send our token to /users and get data, if we spread it like this it will bind the credentials to credentials, likes to likes, etc.
            };
        default:
            // have to have a default case since it's a switch
            return state;
    };

};