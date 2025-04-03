import { useState } from "react";

function Login({ onLogin }) {
    const [loginName, setLoginName] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        
        const nameReg = /^[a-zA-Z0-9]{5}$/
        if (loginName.match(nameReg) && loginName !== "dog") {
            setError("");
            onLogin(loginName);
        } else if (loginName === "dog") {
            setError('"dog" was not a valid user');
        } else {
            setError(`${loginName} was not a valid word (length: 5, only characters and numbers)`);
        }
        setLoginName("");
    }

    return (
        <>
            <form className="login-form" onSubmit={handleLogin}>
                <h1 className="form-title">Login</h1>
                <label className="form-label">
                    <span className="label-name">Username: </span>
                    <input type="text" value={loginName} onInput={(e) => setLoginName(e.target.value)} className="label-input" />
                </label>
                <button className="login-button">Login</button>
                <span className="error">{ error }</span>
            </form>
        </>
    )
}

export default Login;