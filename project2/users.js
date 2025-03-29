const users = {};

function isValidUsername(username) {
    let isValid = true;
    isValid = !!username && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    isValid = isValid && username.length <= 20;
    
    return isValid
}

function isPermittedUsername(username) {
    return username.toLowerCase() !== 'dog';
}

function addUser(username) {
    users[username] = {
        username
    };
}

function getUser(username) {
    return users[username];
}

function getAllUsers() {
    return Object.keys(users);
}

module.exports = {
    isValidUsername,
    isPermittedUsername,
    addUser,
    getUser,
    getAllUsers
};