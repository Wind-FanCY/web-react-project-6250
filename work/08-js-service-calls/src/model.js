const state = {
    username: '',
    storedWord: '',
    error: '',
    isLoggedIn: false
};

export function getState() {
    return { ...state };
};

export function setError(error) {
    state.error = error;
};

export function setLoggedIn(username, storedWord) {
    state.isLoggedIn = true;
    state.username = username;
    state.storedWord = storedWord;
    state.error = '';
};

export function setLoggedOut() {
    state.isLoggedIn = false;
    state.username = '';
    state.storedWord = '';
    state.error = '';
};

export function setStoredWord(newWord) {
    state.storedWord = newWord;
}
