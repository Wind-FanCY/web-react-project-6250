import { getState, setLoggedIn, setLoggedOut, setError, setStoredWord } from './model';
import { render } from './view';
import { fectchSession, fetchLogin, fetchLogout, fetchWord, updateWord } from './services';

function init() {
    checkSession();
    addEventListeners();
}

function checkSession() {
    fectchSession()
        .then(response => {
            return fetchWord()
                .then(wordData => {
                    setLoggedIn(response.username, wordData.storedWord);
                    render(getState());
                });
        })
        .catch(err => {
            if (err.error === 'not-logged-in' || err.error === 'auth-missing') {
                setLoggedOut();
                render(getState());
            } else {
                setError(err.error);
                render(getState());
            }
        });
}

function addEventListeners() {
    const contentEl = document.querySelector('#content');

    contentEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('logout-button')) {
            handleLogout();
        }
    });

    contentEl.addEventListener('submit', (e) => {
        e.preventDefault();

        if (e.target.closest('.login-form')) {
            const usernameEl = e.target.querySelector('#username');
            handleLogin(usernameEl.value);
        } else if (e.target.closest('.word-form')) {
            const newWordEL = e.target.querySelector('#newWord');
            handleUpdateWord(newWordEL.value);
        }
    })
}

function handleLogin(username) {
    fetchLogin(username)
        .then(() => fetchWord())
        .then(wordData => {
            setLoggedIn(wordData.username, wordData.storedWord);
            render(getState());
        })
        .catch(err => {
            setError(err.error);
            render(getState());
        });
}

function handleLogout() {
    fetchLogout()
        .then(() => {
            setLoggedOut();
            setError('');
            render(getState());
        })
        .catch(err => {
            setError(err.error);
            render(getState());
        });
}

function handleUpdateWord(newWord) {
    updateWord(newWord) 
        .then(wordData => {
            setStoredWord(wordData.storedWord);
            setError('');
            render(getState());
        })
        .catch(err => {
            setError(err.error);
            render(getState());
        })
}

init();