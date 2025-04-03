import compare from "./compare";

function Game({ username, onLogout }) {
    return (
        <>
            <div className="main">
                <button className="logout-button" onClick={onLogout}>Logout</button>
                <h1 className="main-title">Hello, {username}!</h1>
                <p className="main-message">{compare(username)}</p>
            </div>
        </>
    )
}

export default Game;