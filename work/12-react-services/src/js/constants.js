export const LOGIN_STATUS = {
    PENDING: 'pending',
    NOT_LOGGED_IN: 'notLoggedIn',
    IS_LOGGED_IN: 'loggedIn'
};

export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    REQUIRED_WORD: 'required-word',
    INVALID_CHARS: 'invalid-chars'
};

export const CLIENT = {
    NETWORK_ERROR: 'networkError',
    NO_SESSION: 'noSession'
};

export const MESSAGES = {
    [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network. Please try again',
    [SERVER.AUTH_INSUFFICIENT]: 'Username "dog" is not allowed',
    [SERVER.REQUIRED_USERNAME]: 'Please enter a valid username (only a-z, A-Z, 0-9 and _)',
    [SERVER.REQUIRED_WORD]: 'Plaease enter a valid word (only a-z, A-Z)',
    [SERVER.INVALID_CHARS]: 'Invalid characters in input (only a-z, A-Z)',
    default: 'Something went wrong. Please try again'
};