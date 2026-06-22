// import keyboard setup
import { setupKeyboard, renderPlaceholders } from "./keyboard.js";

setupKeyboard();

// load word list from JSON file
var wordList = await fetch("./assets/example-words.json").then((response) =>
  response.json(),
);

const word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();

renderPlaceholders(word);

