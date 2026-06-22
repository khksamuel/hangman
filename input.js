function inputLetter(letter) {
  const word = localStorage.getItem("word");
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      const placeholder = document.querySelector(
        `#placeholders span:nth-child(${i + 1})`,
      );
      placeholder.textContent = letter + " ";
      placeholder.classList.remove("unguessed");
      const button = document.querySelector(`#key${letter}`);
      button.classList.add("correct");
      if (!document.querySelector(".unguessed")) {
        // 0.5 second delay to allow the final letter to be seen before alert and reset
        setTimeout(() => {
          alert("Congratulations, you won!");
          localStorage.setItem("failedAttempts", 0);
          location.reload();
        }, 500);
      }
      return;
    }
  }
  const button = document.querySelector(`#key${letter}`);
  button.classList.add("incorrect");
  const failedAttempts = parseInt(localStorage.getItem("failedAttempts")) + 1;
  localStorage.setItem("failedAttempts", failedAttempts);
  const image = document.querySelector("#hangman-image");
  image.src = `./assets/img/h-${failedAttempts}.jpg`;
  if (failedAttempts > 9) {
    // 0.5 second delay to allow the final image to be seen before alert and reset
    setTimeout(() => {
      alert(`Game over! The word was: ${word}`);
      localStorage.setItem("failedAttempts", 0);
      location.reload();
    }, 500);
    return;
  }
}

function setKeyboardListener() {
  document.addEventListener("keydown", (event) => {
    const letter = event.key.toUpperCase();
    if (letter >= "A" && letter <= "Z") {
      inputLetter(letter);
    }
  });
}

export { inputLetter, setKeyboardListener };
