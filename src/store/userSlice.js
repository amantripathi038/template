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
        },
        changePasswordStart: (state) => {
            state.isLoading = true
        },
        changePasswordSuccess: (state) => {
            state.isLoading = false
        },
        changePasswordFail: (state) => {
            state.isLoading = false
        },
        updateProfileStart: (state) => {
            state.isLoading = true
        },
        updateProfileSuccess: (state, action) => {
            state.user = action.payload
            state.isLoading = false
        },
        updateProfileFail: (state) => {
            state.isLoading = false
        },
        addCreditStart: (state) => {
            state.isLoading = true
        },
        addCreditSuccess: (state, action) => {
            state.isLoading = false
            state.user = action.payload
        },
        addCreditFail: (state, error) => {
            state.isLoading = false
            state.error = error
        },
        addAccountStart: (state) => {
            state.isLoading = true
        },
        addAccountSuccess: (state, action) => {
            state.isLoading = false
            state.user = action.payload
        },
        addAccountFail: (state, error) => {
            state.isLoading = false
            state.error = error
        }
    }
});

export const { loginStart, loginSuccess, loginFail, registerStart, registerSuccess, registerFail, logout,
    addExpenseStart, addExpenseFail, addExpenseSuccess, removeExpenseStart, removeExpenseFail, removeExpenseSuccess,
    changePasswordStart, changePasswordSuccess, changePasswordFail,
    updateProfileStart, updateProfileSuccess, updateProfileFail, addCreditStart, addCreditSuccess, addCreditFail,
    addAccountStart, addAccountFail, addAccountSuccess } = userSlice.actions;

export default userSlice.reducer