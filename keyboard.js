import { inputLetter } from "./input.js";

function setupKeyboard() {
  // populate the virtual keyboard in QWERTY rows
  const keyboard = document.querySelector("#keyboard");
  const keyboardRows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

  keyboardRows.forEach((rowLetters) => {
    const row = document.createElement("div");
    row.className = "keyboard-row";

    rowLetters.split("").forEach((letter) => {
      const button = document.createElement("button");
      button.textContent = letter;
      button.addEventListener("click", () => {
        inputLetter(letter);
      });
      button.id = `key${letter}`;
      row.appendChild(button);
    });

    keyboard.appendChild(row);
  });
}

function renderPlaceholders() {
  const word = localStorage.getItem("word");
  // safety check to prevent errors if word isn't set for some reason
  // since the placeholders are not rendered at this point
  // user wont really notice this reload
  if (!word) location.reload(); 
  const placeholders = document.querySelector("#placeholders");
  for (let i = 0; i < word.length; i++) {
    const placeholder = document.createElement("span");
    placeholder.textContent = "_ ";
    placeholder.className = "unguessed";
    placeholders.appendChild(placeholder);
  }
}

export { setupKeyboard, renderPlaceholders };
