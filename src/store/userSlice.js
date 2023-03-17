import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    error: null,
    isLoading: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        loginFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        registerStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        registerSuccess: (state) => {
            state.user = null;
            state.isLoading = false;
            state.error = null;
        },
        registerFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.error = null;
            state.isLoading = null;
        },
        addExpenseStart: (state) => {
            state.isLoading = true
            state.error = null
        },
        addExpenseSuccess: (state, action) => {
            state.user = action.payload
            state.isLoading = false
            state.error = null
        },
        addExpenseFail: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        removeExpenseStart: (state) => {
            state.isLoading = true
            state.error = null
        },
        removeExpenseSuccess: (state, action) => {
            state.user = action.payload
            state.isLoading = false
            state.error = null
        },
        removeExpenseFail: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
});

export const { loginStart, loginSuccess, loginFail, registerStart, registerSuccess, registerFail, logout,
    addExpenseStart, addExpenseFail, addExpenseSuccess, removeExpenseStart, removeExpenseFail, removeExpenseSuccess } = userSlice.actions;

export default userSlice.reducer