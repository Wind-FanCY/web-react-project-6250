import '../css/Controls.css';

function Controls({ onLogout }) {
    return (
        <div className="controls">
            <button onClick={onLogout} className="logout-button">Logout</button>
        </div>
    );
}

export default Controls;