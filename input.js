function inputLetter(letter) {
  const word = localStorage.getItem("word");
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      const placeholder = document.querySelector(
        `#placeholders span:nth-child(${i + 1})`,
      );
      placeholder.textContent = letter + " ";
      placeholder.classList.remove("unguessed");
      placeholder.classList.add("inputed-letter_guessed");
      const button = document.querySelector(`#key${letter}`);
      button.classList.add("correct");
      return;
    }
  }
  const button = document.querySelector(`#key${letter}`);
  button.classList.add("incorrect");
  const failedAttempts = parseInt(localStorage.getItem("failedAttempts")) + 1;
  localStorage.setItem("failedAttempts", failedAttempts);
}

export { inputLetter };
