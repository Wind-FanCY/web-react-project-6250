"use strict";

const secretWord = "RECAT";
function compare(username) {
    const lowerSecret = secretWord.toLowerCase();

    if (username.toLowerCase() === lowerSecret) {
        return `${username} is the secret word!`;
    }

    let matches = 0;
    const secretCharList = {};
    for (const char of lowerSecret) {
        if (!secretCharList[char]) {
            secretCharList[char] = 0;
        }
        secretCharList[char] += 1;
    }  

    for (const char of username) {
        if (secretCharList[char.toLowerCase()] && secretCharList[char.toLowerCase()] > 0) {
            matches += 1;
            secretCharList[char.toLowerCase()] -= 1;
        }
    }

    return `${username} had ${matches} letters in common`;
}

export default compare;