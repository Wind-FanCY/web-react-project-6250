const { text } = require("express");

const users = { 
  "Amit": "Amit", 
  "Bao": "Bao",  
  "Jorts": "Jorts",
  "Zarya": false,
};

const messages = [ 
  {
    sender: "Amit",
    text: "You up?",
  },
  {
    sender: "Bao",
    text: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos.",
  },
  {
    sender: "Jorts",
    text: "Me, too."
  }
];

function addMessage({ sender, text }) {
  const newMessage = { sender: sender, text: text };
  messages.push(newMessage);
}

const chatModel = {
  users,
  messages,
  addMessage,
};

module.exports = chatModel;

