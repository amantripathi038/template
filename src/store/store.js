import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
// Add other reducers as necessary

const rootReducer = combineReducers({
    user: userReducer,
    // Add other reducers as necessary
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
