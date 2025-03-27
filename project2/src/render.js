function render({ state, appEl }) {
    if (state.isLoading && !state.isLoggedIn) {
        appEl.innerHTML = `<div class="chat-loading">Loading chat content...</div>`;
        return;
    }

    const html = `
        <main class="main">
            ${generateLoginForm(state)}
            ${generateChat(state)}
        </main>
    `;

    if (state.isLoggedIn && appEl.querySelector('.chat')) {
        updateDynamicContent(state, appEl);
    } else {
        appEl.innerHTML = html;
    }
    
}

function updateDynamicContent(state, appEl) {
    const messagesEl = appEl.querySelector('.messages');
    const userListEl = appEl.querySelector('.users-list');
    const errorEl = appEl.querySelector('.error');

    if (messagesEl) {
        messagesEl.innerHTML = generateMessages(state.messages);
    }
    if (userListEl) {
        userListEl.innerHTML = generateUsers(state.users);
    }
    if (errorEl) {
        errorEl.innerHTML = `${state.errorMessage}`;
    }
}

function generateLoginForm(state) {
    if (state.isLoggedIn) {
        return ``;
    }

    if (state.isLoading) {
        return `<div class="chat-loading">Loading chat content...</div>`;
    }

    return `
        <div class="login">
            <form class="login-form">
                <h1 class="login-title">Login</h1>
                <label for="username" class="login-label">
                    <span class="label-name">Username: </span>
                    <input type="text" name="username" id="username" class="label-input">
                </label>
                <button class="login-button">Login</button>
                <span class="error">${state.errorMessage}</span>
            </form>
        </div>
    `;
}

function generateChat(state) {
    if (!state.isLoggedIn) {
        return ``;
    }
    
    return `
        <div class="chat">
            <div class="chat-header">
                <button class="logout-button">Logout</button>
                <h1 class="chat-title">Chat Room</h1>
            </div>
            <div class="chat-main">
                <div class="users">
                    <p class="users-title">Online Users</p>
                    <ul class="users-list">
                        ${generateUsers(state.users)}
                    </ul>
                </div>
                <div class="messages">
                    ${generateMessages(state.messages)}
                </div>
                <form class="chat-form">
                    <label for="message" class="chat-label">
                        <input type="text" name="message" id="message" class="label-input" placeholder="Type a message...">
                    </label>
                    <button class="chat-button">Send</button>
                    <span class="error">${state.errorMessage}</span>
                </form>
            </div>
        </div>
    `;
}

function generateMessages(messages) {
    return messages.map(message => `
            <div class="message">
                <span class="message-username">${message.username}: </span>
                <span class="message-text">${message.text}</span>
            </div>
        `).join('');
}

function generateUsers(users) {
    const usersList = users.map(user => `
            <li class="username">${user}</li>
        `).join('');
    
    return `${usersList}`;
}

export default render;