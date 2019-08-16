import { GATHER_THOUGHTS, GATHER_THOUGHT, LIKE_THOUGHT, UNLIKE_THOUGHT, LOADING_DATA, DELETE_THOUGHT, SHARE_THOUGHT, ENTER_COMMENT } from '../types';

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
            };
        case GATHER_THOUGHTS:
            return {
                ...state,
                thoughts: action.payload,
                loading: false
            };
        case GATHER_THOUGHT:
            return {
                ...state,
                thought: action.payload
            };
        case LIKE_THOUGHT:
        case UNLIKE_THOUGHT:
            let index = state.thoughts.findIndex(
                (thought) => thought.thoughtId === action.payload.thoughtId);
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
                ...state
            };
        case DELETE_THOUGHT:
            index = state.thoughts.findIndex(
                (thought) => thought.thoughtId === action.payload);
            state.thoughts.splice(index, 1);
            return {
                ...state
            };
        case SHARE_THOUGHT:
            return {
                ...state,
                // return state as it was
                thoughts: [
                    action.payload,
                    ...state.thoughts
                ]
                // moving newest thought to the top of the array
            };
        case ENTER_COMMENT:
            return {
                ...state,
                thought: {
                    ...state.thought,
                    comments: [action.payload, ...state.thought.comments]
                }
            }
        default:
            return state;
    };
};