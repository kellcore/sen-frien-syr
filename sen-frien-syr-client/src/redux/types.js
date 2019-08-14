// user reducer types
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const SET_UNAUTHENTICATED = 'SET_UNAUTHENTICATED';
export const SET_USER = 'SET_USER';
export const LOADING_USER = 'LOADING_USER';
// ui reducer types
export const SET_ERRORS = 'SET_ERRORS';
export const LOADING_UI = 'LOADING_UI';
export const LOADING_DATA = 'LOADING_DATA';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const STOP_LOADING_UI = 'STOP_LOADING_UI';
// data reducer types
export const GATHER_THOUGHTS = 'GATHER_THOUGHTS';
export const GATHER_THOUGHT = 'GATHER_THOUGHT';
export const LIKE_THOUGHT = 'LIKE_THOUGHT';
export const UNLIKE_THOUGHT = 'UNLIKE_THOUGHT';
export const DELETE_THOUGHT = 'DELETE_THOUGHT';
export const SHARE_THOUGHT = 'SHARE_THOUGHT';


// we don't have to do this but it makes it easier to spot our mistakes since the app won't run if we use the wrong variables
// the all caps is a common naming convention