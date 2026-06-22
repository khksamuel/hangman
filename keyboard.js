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
      row.appendChild(button);
    });

    keyboard.appendChild(row);
  });
}

function renderPlaceholders(word) {
  const placeholders = document.querySelector("#placeholders");
  placeholders.textContent = "_ ".repeat(word.length).trim();
}

export { setupKeyboard, renderPlaceholders };
