
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
        // handle letter guess
      });
      row.appendChild(button);
    });

    keyboard.appendChild(row);
  });
}

export { setupKeyboard };
