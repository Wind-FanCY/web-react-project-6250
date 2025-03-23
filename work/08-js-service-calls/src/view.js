export function render(state) {
    const contentEl = document.querySelector('#content');

    if (state.isLoggedIn) {
        contentEl.innerHTML = generateWordView(state);
    } else {
        contentEl.innerHTML = generateLoginView(state);
    }
};

function generateLoginView(state) {
    return `
    <div class="login-container">
        <h2 class="login-title">Login</h2>
        <form class="login-form">
            <label class="login-label" for="username">
                <span class="label-name">Username: </span>
                <input class="label-input" type="text" name="username" id="username">
            </label>
            <button class="login-button">Login</button>
        </form>
        ${state.error ? `<p class="error">${getErrorMessage(state.error)}</p>` : ''}
    </div>
    `;
}

function generateWordView(state) {
    return `
    <div class="word-container">
        <div class="user-info">
            <button class="logout-button">Logout</button>
            <h2 class="info-title">Welcome, ${state.username}!</h2>
        </div>
        <div class="user-word">
            <h3 class="word-title">Your stored word: </h3>
            <p class="word-content">${state.storedWord ? state.storedWord : '(No stored word)'}</p>
        </div>
        <form class="word-form">
            <label class="word-label" for="newWord">
                <span class="label-name">Update Word: </span>
                <input class="label-input" type="text" name="newWord" id="newWord" value="${state.storedWord}">
            </label>
            <button class="update-button">Update</button>
        </form>
        ${state.error ? `<div class="error">${getErrorMessage(state.error)}</div>` : ''}
    </div>
    `;
}

function getErrorMessage(error) {
    const errorMessgae = {
        'network-error': 'Network error, please check your connection',
        'auth-missing': 'You need to login',
        'auth-insufficient': 'Username is forbidden',
        'required-username': 'Please enter a valid username (only letters, numbers and underscores)',
        'required-word': 'Please enter a word',
        'invalid-word': 'Word can only contain letters'
    };

    return errorMessgae[error] || `Error occured: ${error}`;
}