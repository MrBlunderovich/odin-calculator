let display = "0";
let formula = "";
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
const formulaDiv = document.querySelector("#formula");
const displayDiv = document.querySelector("#display");

for (let index = 0; index < keypad.length; index++) {
  const key = keypad[index];
  const button = document.createElement("button");
  button.textContent = key.label;
  button.id = key.id;
  button.dataset.index = index;
  button.classList.add("key", key.type);
  //button.dataset.key = key.id; //duplicates button.id for no reason?
  button.onclick = handleClick;
  calculator.appendChild(button);
}

/////////initialization
displayDiv.textContent = display;
formulaDiv.textContent = formula;

function calculate(frml) {
  function compute(first, operator, second) {
    switch (operator) {
      case "+":
        return +first + +second;
      case "-":
        return +first - +second;
      case "*":
        return +first * +second;
      case "/":
        return +first / +second;
      default:
        return "ERROR";
    }
  }
  const firstNumberRegex = /^-*\d+\.*\d*/;
  const operationRegex = /^([\+\-\*\/])(-*\d+\.*\d*)/;
  let firstNumber = frml.match(firstNumberRegex);
  if (firstNumber) {
    frml = frml.slice(firstNumber[0].length);
    while (frml.match(operationRegex)) {
      const operation = frml.match(operationRegex);
      firstNumber = compute(firstNumber, operation[1], operation[2]);
      frml = frml.slice((operation[1] + operation[2]).length);
    }
  }
  const n = firstNumber * 1000 * (1 + Number.EPSILON);
  return Math.round(n) / 1000;
}

function clear() {
  display = "0";
  formula = "";
  displayDiv.textContent = display;
  formulaDiv.textContent = formula;
}

function setDisplay(newValue) {
  display = newValue;
  updateFormula();
}

function handleClick(event) {
  const buttonIndex = +event.target.dataset.index;
  console.log(`button index: ${buttonIndex}`);
  switch (buttonIndex) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      if (
        display === "0" ||
        display === "+" ||
        display === "-" ||
        display === "/" ||
        display === "*" ||
        formula.includes("=")
      ) {
        if (formula && formula.includes("=")) {
          formula = "";
        }
        setDisplay(keypad[buttonIndex].value);
      } else {
        setDisplay(display + keypad[buttonIndex].value);
      }
      if (formula && formula.includes("=")) {
        formula = "";
      }
      break;
    case 10: //point dot decimal
      if (!formula) {
        setDisplay("0.");
      } else if (formula.includes("=")) {
        clear();
      } else if (display.toString().includes(".")) {
        break;
      } else if (
        display === "+" ||
        display === "-" ||
        display === "/" ||
        display === "*"
      ) {
        setDisplay("0.");
      } else {
        setDisplay(display + ".");
      }
      break;
    case 12: // minus
      setDisplay(keypad[buttonIndex].value); //'-'
      break;
    case 11:
    case 13:
    case 14: // + / * operators
      if (formula === "" || formula === "-") {
        break;
      } else if (
        display === "+" ||
        display === "-" ||
        display === "/" ||
        display === "*"
      ) {
        if (
          formula.slice(-2, formula.length) === "+-" ||
          formula.slice(-2, formula.length) === "*-" ||
          formula.slice(-2, formula.length) === "/-"
        ) {
          formula = formula.slice(0, -2);
          setDisplay(keypad[buttonIndex].value);
        } else if (display !== keypad[buttonIndex].value) {
          formula = formula.slice(0, -1);
          setDisplay(keypad[buttonIndex].value);
        }
      } else {
        setDisplay(keypad[buttonIndex].value);
      }
      break;
    case 15: //clear
      clear();
      break;
    case 16: //equals
      const result = calculate(formula);
      formula += keypad[buttonIndex].value;
      setDisplay(result);
      break;
    default:
      break;
  }
}

function updateFormula() {
  if (display === "0." || formula.slice(-1) === "=") {
    formula = formula + display; //initial or result
  } else if (formula === "" && display === "0") {
    formula = "";
  } else if (formula.includes("=")) {
    //new expression from previous result
    formula = formula.slice(formula.indexOf("=") + 1) + display;
  } else {
    formula = formula + display.slice(-1);
  }
  displayDiv.textContent = display;
  formulaDiv.textContent = formula;
}
