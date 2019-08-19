import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER, MARK_NOTIFICATIONS_AS_READ } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    // we need dispatch because we have asynchronous code
    dispatch({ type: LOADING_UI });
    // WE DISPATCH A TYPE AND THEN CATCH THE TYPE FROM THE REDUCER
    axios.post('/login', userData)
        .then((res) => {
            setAuthHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            // clear any errors in our form if they exist and then redirect home
            history.push('/');
            // can use .push() method in react to push state -> this is how we're telling it to redirect us to the home page after we log in!
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
};

export const signupUser = (newUserData, history) => (dispatch) => {
    // we need dispatch because we have asynchronous code
    dispatch({ type: LOADING_UI });
    // WE DISPATCH A TYPE AND THEN CATCH THE TYPE FROM THE REDUCER
    axios.post('/signup', newUserData)
        .then((res) => {
            setAuthHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            // clear any errors in our form if they exist and then redirect home
            history.push('/');
            // can use .push() method in react to push state -> this is how we're telling it to redirect us to the home page after we log in!
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('fBAuthToken');
    // we need to remove the token from the storage to log the user out
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
    // this will clear out our user's state
};

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    // before we try to get the data, we dispatch an action
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
                // a payload is essentially some data that we send to our reducer and then the reducer does something with it
            })
        })
        .catch(err => console.log(err));
};

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/user/image', formData)
        .then(() => {
            dispatch(getUserData());
        })
        .catch(err => console.log(err));
};

export const editUserProfile = (userData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/user', userData)
        .then(() => {
            dispatch(getUserData());
        })
        .catch(err => console.log(err));
};

export const markNotificationsAsRead = (notificationIds) => (dispatch) => {
    axios.post(`/notifications`, notificationIds)
        .then(res => {
            dispatch({
                type: MARK_NOTIFICATIONS_AS_READ
            });
        })
        .catch(err => console.log(err));
};

const setAuthHeader = (token) => {
    const fBAuthToken = `Bearer ${token}`;
    localStorage.setItem('fBAuthToken', fBAuthToken);
    axios.defaults.headers.common['Authorization'] = fBAuthToken;
    // each time we send a request through axios, it's going to have an Authorization header with the value of fbAuthToken
};