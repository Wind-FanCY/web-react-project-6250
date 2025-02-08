const { messages } = require("./chat-model");

const chatView = {
  chatPage: function(model) {
    return `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Chat</title>
          <link rel="stylesheet" href="index.css">
        </head>
        <body>
          <div id="chat-app">
            <h1 class="app-title">Chat Room</h1>
            ${chatView.getUserList(model)}
            ${chatView.getMessageList(model)}
            ${chatView.getSendMessageForm(model)}
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(model) {
    return `<ol class="messages">` +
      // Generate the HTML for the
      model.messages.map(message => `
        <li>
          <div class="message">
            <div class="sender-info">
              <img class="avatar" alt="avatar of ${message.sender}" src="images/avatar-${model.users[message.sender] ? message.sender.toLowerCase() : "default" }.png"/>
              <span class="username">${message.sender}</span>
            </div>
            <p class="message-text">${message.text}</p>
          </div>
        </li>`).join('') + 
      `</ol>`;
  },

  getUserList: function(model) {
    return `<ul class="users">` +
    Object.values(model.users).map( user => `
      <li>
        <div class="user">
          <span class="username">${user ? user : ''}</span>
        </div>
      </li>
    `).join('') +
    `</ul>`;
  },

  getSendMessageForm: function() {
    // Generate the HTML for a 
    const senders = {};
    messages.forEach(message => {
      senders[message.sender] = senders[message.sender] ? senders[message.sender] + 1 : 1;
    });

    return `
      <form action="/chat" method="POST" class="chat-form">
          <label for="username" class="form-label">
              <span class="label-name">Username: </span>
              <select name="sender" id="username">` + 
                Object.keys(senders).map(sender => `
                  <option value=${sender}>${sender}</option>
                `).join('') +
              `</select>
          </label>
          <label for="message" class="form-label">
              <span class="label-name">Message: </span>
              <input type="text" id="message" name="text">
          </label>
          <button type="submit" class="form-button">Send</button>
      </form>`;
  }
};

module.exports = chatView;
