export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    REQUIRED_MESSAGE: 'required-message'
};

export const CLIENT = {
    NETWORK_ERROR: 'networkError',
    NO_SESSIONL: 'noSession'
};

export const MESSAGES = {
    [CLIENT.NETWORK_ERROR]: 'NetWork error, please try again',
    [SERVER.AUTH_INSUFFICIENT]: 'Username "dog" is not allowed',
    [SERVER.REQUIRED_USERNAME]: 'Please enter a valid username (only letters and/or numbers and not exceed 20 characters)',
    [SERVER.REQUIRED_MESSAGE]: 'Please enter a message',
    default: 'Something went wrong. Please try again'
};