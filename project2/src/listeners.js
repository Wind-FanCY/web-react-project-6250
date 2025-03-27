import {
    fetchLogin,
    fetchLogout,
    fetchAddMessage,
    fetchMessages,
    fetchUsers
} from './services';
import {
    login,
    logout,
    setMessages,
    setUsers,
    setError,
    startLoading,
    stopLoading
} from './state';
import { SERVER } from './constants';

export function addLoginListener({ state, appEl, render }) {
    appEl.addEventListener('submit', (e) => {
        if (!e.target.classList.contains('login-form')) {
            return;
        }
        e.preventDefault();

        const username = appEl.querySelector('.label-input').value;
        startLoading();
        render({ state, appEl });

        fetchLogin(username)
            .then(response => {
                login(response.username);
                return fetchMessages();
            })
            .then(messages => {
                setMessages(messages);
                return fetchUsers();
            })
            .then(users => {
                setUsers(users);
                setError();
                stopLoading();
                render({ state, appEl });
            })
            .catch(err => {
                stopLoading();
                setError(err?.error || 'ERROR');
                render({ state, appEl });
            });
    });
}

export function addLogoutListener({ state, appEl, render }) {
    appEl.addEventListener('click', (e) => {
        if (!e.target.classList.contains('logout-button')) {
            return;
        }

        fetchLogout()
            .then(() => {
                logout();
                render({ state, appEl });
            })
            .catch(err => {
                setError(err?.error || 'ERROR');
                render({ state, appEl });
            });
    });
}

export function addMessageListener({ state, appEl, render }) {
    appEl.addEventListener('submit', (e) => {
        if (!e.target.classList.contains('chat-form')) {
            return;
        }
        e.preventDefault();

        const input = appEl.querySelector('.label-input');
        const message = input.value;

        fetchAddMessage(message)
            .then(() => {
                input.value = '';
                return fetchMessages();
            })
            .then(messages => {
                setMessages(messages);
                setError();
                render({ state, appEl });
            })
            .catch(err => {
                setError(err?.error || 'ERROR');
                render({ state, appEl });
            });
    });
}

export function startPolling({ state, appEl, render }) {
    setInterval(() => {
        if (!state.isLoggedIn) {
            return;
        }

        const currentError = state.error;

        fetchMessages()
            .then(messages => {
                setMessages(messages);
                return fetchUsers();
            })
            .then(users => {
                setUsers(users);
                if (currentError) {
                    setError(currentError);
                }
                render({ state, appEl });
            })
            .catch(err => {
                if (err?.error === SERVER.AUTH_MISSING) {
                    logout();
                    render({ state, appEl });
                    return;
                }
                setError(err?.error || 'ERROR');
                render({ state, appEl });
            });
    }, 5000);
}