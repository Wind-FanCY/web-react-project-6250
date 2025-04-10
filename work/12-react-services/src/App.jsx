import { useState, useEffect } from 'react';
import { LOGIN_STATUS, CLIENT, SERVER } from './js/constants';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchWord,
  fetchUpdateWord
} from './js/services';
import LoginForm from './components/LoginForm';
import WordForm from './components/WordForm';
import Loading from './components/Loading';
import Controls from './components/Controls';
import Word from './components/Word';

import './App.css';

function App() {
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.NOT_LOGGED_IN);
  const [username, setUsername] = useState('');
  const [word, setWord] = useState('');
  const [error, setError] = useState('');
  const [isWordPending, setIsWordPending] = useState(false);

  function onLogin(username) {
    setLoginStatus(LOGIN_STATUS.PENDING);
    fetchLogin(username)
      .then(session => {
        setUsername(session.username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        return fetchWord();
      })
      .then(response => {
        setWord(response.word);
        setError('');
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
      });
  }

  function onLogout() {
    setLoginStatus(LOGIN_STATUS.PENDING);
    fetchLogout()
      .then(() => {
        setUsername('');
        setWord('');
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        setError('');
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
      });
  }

  function onUpdateWord(newWord) {
    setIsWordPending(true);
    fetchUpdateWord(newWord)
      .then(response => {
        setWord(response.word);
        setIsWordPending(false);
        setError('');
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
        setIsWordPending(false);
      });
  }

  function checkForSession() {
    fetchSession()
      .then(session => {
        setUsername(session.username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        return fetchWord();
      })
      .catch(err => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION });
        }
        return Promise.reject(err);
      })
      .then(response => {
        setWord(response.word);
      })
      .catch(err => {
        if (err?.error === CLIENT.NO_SESSION) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          return;
        }
        setError(err?.error || 'ERROR');
      });
  }

  useEffect(() => {
    checkForSession();
  }, []);

  return (
    <div className="app">
      <main className="main">
        {loginStatus === LOGIN_STATUS.PENDING && (
            <Loading className="login-waiting">Loading user...</Loading>
        )}
        {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
          <LoginForm onLogin={onLogin} error={error} />
        )}
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="content">
            <Controls onLogout={onLogout} />
            <div className="content-panel">
              <h1 className="panel-title">Hello, {username}</h1>
              <Word word={word} isWordPending={isWordPending} />
              <WordForm word={word} onUpdateWord={onUpdateWord} error={error} />
            </div>
          </div>
        )}
        
      </main>
    </div>
  );
}

export default App;
