function inputLetter(letter) {
  const placeholder = document.querySelector("#placeholders");
  // if there are no more placeholders, do nothing
  if (placeholder.innerHTML === "") return;

  //add right before the current letter
  const newLetter = document.createElement("span");
  newLetter.textContent = letter;
  placeholder.parentNode.insertBefore(newLetter, placeholder);

  // remove one placeholder
  placeholder.textContent = placeholder.textContent.slice(2);
}

export { inputLetter };
