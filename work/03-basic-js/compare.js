"use strict";

module.exports = compare; 

function compare(word, guess) {

  let sameLetter = 0;
  const wordNum = {};

  for (let w of word) {
    const wUpper = w.toUpperCase();
    
    if (!(wUpper in wordNum)) {
      wordNum[wUpper] = 0;
    }

    wordNum[wUpper] += 1;
  }

  for (let g of guess) {
    const gUpper = g.toUpperCase();

    if (gUpper in wordNum && wordNum[gUpper] > 0) {
      sameLetter += 1;
      wordNum[gUpper] -= 1;
    }
  }
  
  return sameLetter; 
}
