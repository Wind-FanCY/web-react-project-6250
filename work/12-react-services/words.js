const words = {};
const WORD_REGEX = /^[a-zA-Z]+$/;

function isValidWord(word) {
    let isValidWord = true;
    isValidWord = !!word && word.trim();
    isValidWord = isValidWord && word.match(WORD_REGEX);
    return isValidWord;
}

function getWord(username) {
    return words[username];
}

function setWord(username, word) {
    words[username] = word;
}

export default {
    isValidWord,
    getWord,
    setWord
};