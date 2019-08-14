import { GATHER_THOUGHTS, LIKE_THOUGHT, UNLIKE_THOUGHT, LOADING_DATA, DELETE_THOUGHT } from '../types';

const initialState = {
    thoughts: [],
    // the array that holds all thoughts
    thought: {},
    // singular thought object
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case GATHER_THOUGHTS:
            return {
                ...state,
                thoughts: action.payload,
                loading: false
            }
        case LIKE_THOUGHT:
        case UNLIKE_THOUGHT:
            let index = state.thoughts.findIndex((thought) => thought.thoughtId === action.payload.thoughtId);
            // this is a higher order function
            // first we need to find the specific thought
            // we want to make sure the thoughtId matches the one passed in via payload
            // we determine we've liked a thought by looking at the likes array, and if we've liked a thought, then we add the like to the likes array for the user and we also add the like count
            state.thoughts[index] = action.payload;
            // this is how we increment the likes
            if (state.thought.thoughtId === action.payload.thoughtId) {
                state.thought = action.payload;
            }
            return {
                ...state,
            }
        case DELETE_THOUGHT:
            index = state.thoughts.findIndex((thought) => thought.thoughtId === action.payload);
            state.thoughts.splice(index, 1);
            return {
                ...state
            };
        default:
            return state;
    };
};