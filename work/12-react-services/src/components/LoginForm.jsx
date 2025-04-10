import { useState } from "react";
import Status from "./Status";
import '../css/LoginForm.css';

function LoginForm({ onLogin, error }) {
    const [username, setUsername] = useState('');

    function onChange(e) {
        setUsername(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        onLogin(username);
    }

    return (
        <div className="login">
            <h1 className="login-title">Login</h1>
            <form className="login-form" onSubmit={onSubmit}>
                <label htmlFor="username" className="login-label">
                    <span className="label-name">Username:</span>
                    <input type="text" id="username" className="label-input" value={username} onChange={onChange} />
                </label>
                <button className="login-button">Login</button>
                {error && <Status error={error} />}
            </form>
        </div>
    );
}

export default LoginForm;