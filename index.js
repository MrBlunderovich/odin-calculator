//import { createElement } from "react";

const keypad = [
  { value: "0", id: "zero", label: "0", type: "digit" },
  { value: "1", id: "one", label: "1", type: "digit" },
  { value: "2", id: "two", label: "2", type: "digit" },
  { value: "3", id: "three", label: "3", type: "digit" },
  { value: "4", id: "four", label: "4", type: "digit" },
  { value: "5", id: "five", label: "5", type: "digit" },
  { value: "6", id: "six", label: "6", type: "digit" },
  { value: "7", id: "seven", label: "7", type: "digit" },
  { value: "8", id: "eight", label: "8", type: "digit" },
  { value: "9", id: "nine", label: "9", type: "digit" },
  { value: ".", id: "decimal", label: ".", type: "digit" },
  { value: "+", id: "add", label: "+", type: "operator" },
  { value: "-", id: "subtract", label: "-", type: "operator" },
  { value: "/", id: "divide", label: "/", type: "operator" },
  { value: "*", id: "multiply", label: "x", type: "operator" },
  { value: "", id: "clear", label: "AC", type: "clear" },
  { value: "=", id: "equals", label: "=", type: "equals" },
];
const calculator = document.querySelector(".calculator");

function handleClick(event) {
  //
}
/* const buttons = keypad
  .map((item, index) => {
    //check index=${index} prop
    return `<button
        id="${item.id}"
        index="${index}"
        class="${`key ${item.type}`}"
        key="${item.id}"
        onClick="handleClick"
        >
        ${item.label}
        </button>`;
  })
  .join("");
calculator.innerHTML = buttons; */
for (let index = 0; index < keypad.length; index++) {
  const key = keypad[index];
  const button = document.createElement("button");
  button.textContent = key.label;
  button.id = key.id;
  button.index = index;
  button.classList.add("key", key.type);
  button.dataset.key = key.id; //duplicates button.id for no reason?
  button.onclick = handleClick;
  calculator.appendChild(button);
}
