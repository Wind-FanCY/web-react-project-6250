const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;

function isValidUsername(username) {
    let isValidUsername = true;
    isValidUsername = !!username && username.trim();
    isValidUsername = isValidUsername && username.match(USERNAME_REGEX);
    return isValidUsername;
}

function isPermittedUsername(username) {
    return username.toLowerCase() !== 'dog';
}

export default {
    isValidUsername,
    isPermittedUsername
}
