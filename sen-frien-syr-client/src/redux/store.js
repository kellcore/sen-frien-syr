import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    // this is our actual state where we name our objects inside the state
    user: userReducer,
    // everything that comes from userReducer will be stored inside this user object inside state
    data: dataReducer,
    ui: uiReducer
});

const store = createStore(reducers, initialState, compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
// window... taken from https://github.com/zalmoxisus/redux-devtools-extension

export default store;
// this is basically what contains our application's state
