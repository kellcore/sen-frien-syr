import { GATHER_THOUGHTS, LOADING_DATA, LIKE_THOUGHT, UNLIKE_THOUGHT, DELETE_THOUGHT, CLEAR_ERRORS, SHARE_THOUGHT, LOADING_UI, SET_ERRORS, GATHER_THOUGHT, STOP_LOADING_UI } from '../types';
import axios from 'axios';

// collect all thoughts
export const collectThoughts = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios.get('/thoughts')
        .then(res => {
            dispatch({
                type: GATHER_THOUGHTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GATHER_THOUGHTS,
                payload: []
                // returns an empty object if there's an error instead of the thought data
            })
        });
};

export const collectThought = (thoughtId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.get(`/thought/${thoughtId}`)
        .then(res => {
            dispatch({
                type: GATHER_THOUGHT,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI })
        })
        .catch(err => console.log(err));
};

// share a thought
export const shareThought = (newThought) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    // this is for our loading spinner
    axios.post('/thought', newThought)
        // we make a post to /thought and pass in newThought as the data
        .then(res => {
            dispatch({
                type: SHARE_THOUGHT,
                payload: res.data
            });
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
};

// like a thought
export const likeThought = (thoughtId) => (dispatch) => {
    axios.get(`/thought/${thoughtId}/like`)
        .then((res) => {
            dispatch({
                type: LIKE_THOUGHT,
                payload: res.data
                // this will return the like back
            });
        })
        .catch((err) => console.log(err));
};

// unlike a thought

export const unlikeThought = (thoughtId) => (dispatch) => {
    axios.get(`/thought/${thoughtId}/unlike`)
        .then((res) => {
            dispatch({
                type: UNLIKE_THOUGHT,
                payload: res.data
            });
        })
        .catch((err) => console.log(err));
};

// delete a thought

export const deleteThought = (thoughtId) => (dispatch) => {
    axios.delete(`/thought/${thoughtId}`)
        .then(() => {
            dispatch({
                type: DELETE_THOUGHT,
                payload: thoughtId
            });
        })
        .catch(err => console.log(err));
};

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};