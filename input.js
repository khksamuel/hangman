function inputLetter(letter) {
  // const placeholder = document.querySelector("#placeholders");
  // // if there are no more placeholders, do nothing
  // if (placeholder.innerHTML === "") return;

  // //add right before the current letter
  // const newLetter = document.createElement("span");
  // newLetter.textContent = letter;
  // placeholder.parentNode.insertBefore(newLetter, placeholder);

  // // remove one placeholder
  // placeholder.textContent = placeholder.textContent.slice(2);
  const word = localStorage.getItem("word");
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      const placeholder = document.querySelector(
        `#placeholders span:nth-child(${i + 1})`,
      );
      placeholder.textContent = letter + " ";
      const button = document.querySelector(
        `#key${letter}`,
      );
      button.classList.add("correct");
      return;
    }
  }
  const button = document.querySelector(
    `#key${letter}`,
  );
  button.classList.add("incorrect");
}

export { inputLetter };
