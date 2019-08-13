import { GATHER_THOUGHTS, LOADING_DATA, LIKE_THOUGHT, UNLIKE_THOUGHT } from '../types';
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