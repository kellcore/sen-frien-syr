import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, LIKE_THOUGHT, UNLIKE_THOUGHT } from '../types';

const initialState = {
    authenticatedUser: false,
    loading: false,
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
                authenticatedUser: true,
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        // when user logs out, sets state back to authenticated false and no data
        case SET_USER:
            return {
                authenticatedUser: true,
                loading: false,
                ...action.payload
                // from the api, when we send our token to /users and get data, if we spread it like this it will bind the credentials to credentials, likes to likes, etc.
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            };
        case LIKE_THOUGHT:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.selectHandle,
                        thoughtId: action.payload.thoughtId
                    }
                ],
                ...state
            };
        // this is where we actually add the like to the array!
        case UNLIKE_THOUGHT:
            return {
                ...state,
                likes: state.likes.filter((like) => like.thoughtId !== action.payload.thoughtId),
                // we're using filter to remove a like
                ...state
            };
        default:
            // have to have a default case since it's a switch
            return state;
    };

};