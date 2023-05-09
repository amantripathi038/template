import axios from 'axios';
import {
    addExpenseStart, addExpenseSuccess, loginStart, loginSuccess, registerStart,
    registerSuccess, removeExpenseStart, removeExpenseSuccess, logout as Logout,
    changePasswordStart, changePasswordFail, changePasswordSuccess,
    updateProfileStart,
    updateProfileFail,
    updateProfileSuccess,
    addCreditStart,
    addCreditSuccess,
    addCreditFail,
    addExpenseFail,
    addAccountStart,
    addAccountFail,
    addAccountSuccess
} from './userSlice';
import store from './store';
import { populateAccount } from '../_mock/account'
import { populateTransactions } from '../_mock/user';

const API_URI = "https://fixed-sunny-wood.glitch.me/"

const userService = {
    async login(email, password) {
        store.dispatch(loginStart())
        const url = `${API_URI}login`
        const response = await axios.post(url, { email, password });
        const { user } = response.data;
        const { token } = response.data;
        store.dispatch(loginSuccess(user)); // dispatch login success action with user object
        populateAccount(user)
        populateTransactions(user.expenses)
        return token;
    },
    async getUser(token) {
        store.dispatch(loginStart())
        const url = `${API_URI}getUser`
        const response = await axios.post(url, { token });
        const { user } = response.data;
        const { Token } = response.data;
        store.dispatch(loginSuccess(user)); // dispatch login success action with user object
        populateAccount(user)
        populateTransactions(user.expenses)
        return Token;
    },
    async register(name, email, password, contact) {
        store.dispatch(registerStart())
        const url = `${API_URI}register`
        const response = await axios.post(url, { name, email, password, contact });
        const { user } = response.data;
        console.log(user)
        store.dispatch(registerSuccess()); // dispatch login success action with user object
        return user;
    },
    async addExpense(token, name, amount, category, description, date) {
        store.dispatch(addExpenseStart())
        const url = `${API_URI}addExpense`
        const response = await axios.post(url, { token, name, amount, category, description, date })
        const { user } = response.data
        populateTransactions(user.expenses)
        store.dispatch(addExpenseSuccess(user))
    },
    async removeExpense(id, token) {
        store.dispatch(removeExpenseStart())
        const url = `${API_URI}removeExpense`
        const response = await axios.post(url, { id, token })
        const { user } = response.data
        populateTransactions(user.expenses)
        store.dispatch(removeExpenseSuccess(user))
        return user
    },
    async removeMany(idArray, token) {
        store.dispatch(removeExpenseStart())
        const url = `${API_URI}removeMany`
        const response = await axios.post(url, { idArray, token })
        const { user } = response.data
        populateTransactions(user.expenses)
        store.dispatch(removeExpenseSuccess(user))
        return user
    },
    async logout() {
        console.log("done")
        store.dispatch(Logout())
    },
    async changePassword(oldPassword, newPassword, token) {
        store.dispatch(changePasswordStart())
        const url = `${API_URI}changePassword`
        try {
            const response = await axios.post(url, { oldPassword, newPassword, token })
            alert(response.data.message || "Something went wrong")
            store.dispatch(changePasswordSuccess())
        }
        catch (error) {
            alert(error.response.data.message || "Something went wrong")
            store.dispatch(changePasswordFail())
        }
    },
    async updateProfile(name, email, contact, token) {
        store.dispatch(updateProfileStart())
        const url = `${API_URI}updateProfile`
        try {
            const response = await axios.post(url, { name, email, contact, token })
            alert(response.data.message || "Something went wrong")
            populateAccount(response.data.user)
            store.dispatch(updateProfileSuccess(response.data.user))
        }
        catch (error) {
            alert(error.response.data.message || "Something went wrong")
            store.dispatch(updateProfileFail())
        }
    },
    async addCredit(token, salary) {
        store.dispatch(addCreditStart())
        const url = `${API_URI}creditSalary`
        try {
            const response = await axios.post(url, { token, salary })
            populateAccount(response.data.user)
            alert(response.data.message || "Something went wrong")
            store.dispatch(addCreditSuccess(response.data.user))
        }
        catch (error) {
            alert(error.response.data.message)
            store.dispatch(addCreditFail(error.response))
        }
    },
    async editExpense(token, expenseId, name, amount, category, description, date) {
        try {
            store.dispatch(addExpenseStart())
            const url = `${API_URI}editExpense`
            const response = await axios.post(url, { token, expenseId, name, amount, category, description, date })
            const { user } = response.data
            populateTransactions(user.expenses)
            store.dispatch(addExpenseSuccess(user))
            alert("Expense edited successfully")
        }
        catch (error) {
            store.dispatch(addExpenseFail(error))
            alert(error.data.message || "Something went wrong")
        }
    },
    async addAccount(token, accountNumber, accountName, accountType, accountBalance) {
        try {
            store.dispatch(addAccountStart())
            const url = `${API_URI}addAccount`
            const response = await axios.post(url, { token, accountNumber, accountName, accountType, accountBalance })
            const { user } = response.data
            store.dispatch(addAccountSuccess(user))
            alert("Account added successfully")
        }
        catch (error) {
            store.dispatch(addAccountFail(error))
            alert(error.data.message || "Something went wrong")
        }
    },
    async deleteAccount(token, accountId) {
        try {
            store.dispatch(addAccountStart())
            const url = `${API_URI}deleteAccount`
            const response = await axios.post(url, { token, accountId })
            const { user } = response.data
            store.dispatch(addAccountSuccess(user))
            alert("Account deleted successfully")
        }
        catch (error) {
            store.dispatch(addAccountFail(error))
            alert(error.data.message || "Something went wrong")
        }
    }
};

export default userService;
