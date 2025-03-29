import { MESSAGES } from "./constants";

const state = {
    messages: [],
    users: [],
    username: '',
    isLoggedIn: false,
    isLoading: true,
    error: '',
    errorMessage: ''
};

export function login(username) {
    state.username = username;
    state.isLoggedIn = true;
    state.isLoading = false;
    state.error = '';
    state.errorMessage = '';
}

export function logout() {
    state.username = '';
    state.isLoggedIn = false;
    state.isLoading = false;
    state.messages = [];
    state.users = [];
    state.error = '';
    state.errorMessage = '';
}

export function setMessages(messages) {
    state.messages = messages;
}

export function setUsers(users) {
    state.users = users;
}

export function setError(error) {
    if (!error) {
        state.error = '';
        state.errorMessage = '';
        return;
    }
    state.error = error;
    state.errorMessage = MESSAGES[error] || MESSAGES.default;
    state.isLoading = false;
}

export function startLoading() {
    state.isLoading = true;
}

export function stopLoading() {
    state.isLoading = false;
}

export default state;