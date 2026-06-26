import { inputLetter, setKeyboardListener, setCheatButton } from "../input.js";

function buildGameDom(word) {
  document.body.innerHTML = `
    <img id="hangman-image" src="./assets/img/h-0.jpg" alt="Hangman Image" />
    <h1 id="inputed-letter"><span id="placeholders"></span></h1>
    <div id="keyboard"></div>
    <h1 class="title">Hangma<span class="cheatbutton">n</span></h1>
  `;

  const placeholders = document.querySelector("#placeholders");
  for (let i = 0; i < word.length; i++) {
    const placeholder = document.createElement("span");
    placeholder.textContent = "_ ";
    placeholder.className = "unguessed";
    placeholders.appendChild(placeholder);
  }

  const keyboard = document.querySelector("#keyboard");
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((letter) => {
    const button = document.createElement("button");
    button.id = `key${letter}`;
    button.textContent = letter;
    keyboard.appendChild(button);
  });
}

describe("input.js", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("failedAttempts", "0");
    jest.clearAllMocks();
    jest.useRealTimers();
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("inputLetter marks correct guess and reveals placeholders", () => {
    localStorage.setItem("word", "CAT");
    buildGameDom("CAT");

    inputLetter("A");

    const second = document.querySelector("#placeholders span:nth-child(2)");
    expect(second.textContent).toBe("A ");
    expect(second.classList.contains("unguessed")).toBe(false);
    expect(document.querySelector("#keyA").classList.contains("correct")).toBe(
      true,
    );
    expect(localStorage.getItem("failedAttempts")).toBe("0");
  });

  test("inputLetter ignores letters that were already guessed", () => {
    localStorage.setItem("word", "CAT");
    buildGameDom("CAT");
    document.querySelector("#keyA").classList.add("correct");

    inputLetter("A");

    const second = document.querySelector("#placeholders span:nth-child(2)");
    expect(second.textContent).toBe("_ ");
    expect(localStorage.getItem("failedAttempts")).toBe("0");
  });

  test("inputLetter marks incorrect guess and increments failed attempts", () => {
    localStorage.setItem("word", "CAT");
    buildGameDom("CAT");

    inputLetter("Z");

    expect(
      document.querySelector("#keyZ").classList.contains("incorrect"),
    ).toBe(true);
    expect(localStorage.getItem("failedAttempts")).toBe("1");
    expect(document.querySelector("#hangman-image").getAttribute("src")).toBe(
      "./assets/img/h-1.jpg",
    );
  });

  test("setKeyboardListener responds to keydown letter events", () => {
    localStorage.setItem("word", "CAT");
    buildGameDom("CAT");

    setKeyboardListener();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "c" }));

    expect(document.querySelector("#keyC").classList.contains("correct")).toBe(
      true,
    );
  });

  test("setCheatButton reveals the stored word", () => {
    localStorage.setItem("word", "DOG");
    buildGameDom("DOG");
    const cheatButton = document.querySelector(".cheatbutton");

    setCheatButton();
    cheatButton.click();

    expect(cheatButton.textContent).toBe("n DOG");
  });
});
