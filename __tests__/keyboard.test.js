import { setupKeyboard, renderPlaceholders } from "../keyboard.js";
import { inputLetter } from "../input.js";

jest.mock("../input.js", () => ({
  inputLetter: jest.fn(),
}));

describe("keyboard.js", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="keyboard"></div>
      <div id="placeholders"></div>
    `;
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("setupKeyboard renders all letter buttons", () => {
    setupKeyboard();

    const buttons = document.querySelectorAll("#keyboard button");
    expect(buttons).toHaveLength(26);
    expect(document.querySelector("#keyQ")).not.toBeNull();
    expect(document.querySelector("#keyM")).not.toBeNull();
  });

  test("setupKeyboard button click calls inputLetter", () => {
    setupKeyboard();

    document.querySelector("#keyQ").click();
    expect(inputLetter).toHaveBeenCalledWith("Q");
  });

  test("renderPlaceholders creates an unguessed placeholder per character", () => {
    localStorage.setItem("word", "DOG");

    renderPlaceholders();

    const placeholders = document.querySelectorAll("#placeholders span");
    expect(placeholders).toHaveLength(3);
    expect(placeholders[0].textContent).toBe("_ ");
    expect(placeholders[1].classList.contains("unguessed")).toBe(true);
  });
});
