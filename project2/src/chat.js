import { SERVER } from './constants';
import state, {
    login,
    setMessages, 
    setUsers,
    setError,
    startLoading,
    stopLoading,
    logout
} from './state';
import { fetchSession, fetchMessages, fetchUsers } from './services';
import render from './render';
import {
    addLoginListener,
    addLogoutListener,
    addMessageListener,
    startPolling
} from './listeners';

const appEl = document.querySelector('.app');

init();

function init() {
    addLoginListener({ state, appEl, render });
    addLogoutListener({ state, appEl, render });
    addMessageListener({ state, appEl, render });
    startPolling({ state, appEl, render });
    checkForSession();
}

function checkForSession() {
    startLoading();
    render({ state, appEl });

    fetchSession()
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
            if (err?.error === SERVER.AUTH_MISSING) {
                return Promise.reject({ error: 'noSession' });
            }
            return Promise.reject(err);
        })
        .catch(err => {
            stopLoading();
            if (err?.error === 'noSession') {
                logout();
                render({ state, appEl });
                return;
            }
            setError(err?.error || 'ERROR');
            render({ state, appEl });
        });
}