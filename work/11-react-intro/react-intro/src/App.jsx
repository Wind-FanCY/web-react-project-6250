import { useState } from 'react';
import Login from './Login';
import Game from './Game';
import './App.css';

function App() {
  const [isLoggedIn, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");

  function onLogin(username) {
    setUsername(username);
    setIsLogged(true);
  }

  function onLogout() {
    setIsLogged(false);
  }

  return (
    <>
      <div className="app">
        { isLoggedIn ?
          <Game username={username} onLogout={onLogout} /> :
          <Login onLogin={onLogin} />
        }
      </div>
    </>
  );
}

export default App;
