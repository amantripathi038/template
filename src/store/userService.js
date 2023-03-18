import axios from 'axios';
import { addExpenseStart, addExpenseSuccess, loginStart, loginSuccess, registerStart, registerSuccess, removeExpenseStart, removeExpenseSuccess, logout as Logout } from './userSlice';
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
        console.log(user.expenses)
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
        store.dispatch(addExpenseSuccess(user))
        return user
    },
    async removeExpense(id, token) {
        store.dispatch(removeExpenseStart())
        const url = `${API_URI}removeExpense`
        const response = await axios.post(url, { id, token })
        const { user } = response.data
        store.dispatch(removeExpenseSuccess(user))
        return user
    },
    async logout() {
        console.log("done")
        store.dispatch(Logout())
    }
};

export default userService;
