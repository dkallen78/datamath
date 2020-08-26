let inputString = "";
let term1, term2;
let operator = function() {};
const operations = {
  "+": function() {return add(term1, term2)},
  "-": function() {return subtract(term1, term2)},
  "×": function() {return multiply(term1, term2)},
  "÷": function() {return divide(term1, term2)}
}
calced = false;

function clearAll() {
  inputString = "0";
  term1 = null;
  term2 = null;
  console.clear();
  console.log(`clear all, term1: ${term1} term2: ${term2}`);
  console.log(`inputString: ${inputString}`);
  display(inputString);
}

function clearLast() {
  console.log("clear element");
  inputString = "0";
  display(inputString);
}

function hasDecimal() {
  for (let i = 0; i < inputString.length; i++) {
    if (inputString[i] === ".") {
      return;
    }
  }
  inputNumber(".");
}

function inputNumber(item) {
  console.log(`term1: ${term1} term2: ${term2}`);

  if (inputString[0] === "0") {
    inputString = item;
  } else if (calced) {
    term1 = 0;
    inputString += item;
  } else {
    inputString += item;
  }
  console.log(`inputString: ${inputString}`);
  calced = false;
  display(inputString)
}

function display(string) {
  console.log(`displaying ${string}`);
  let disp = document.getElementById("display");
  disp.innerHTML = string;
}

function setFunction(operation) {
  console.log(`operation is ${operation}`);
  calced = false;
  if (term1 && inputString) {
    term2 = parseFloat(inputString);
    term1 = operator();
    display(term1);
  } /*else if (term1 && !inputString) {

  }*/ else if (inputString) {
    term1 = parseFloat(inputString);
  }
  inputString = "";
  console.log(`term1: ${term1} term2: ${term2}`);
  console.log(`inputString: ${inputString}`);
  operator = operations[operation];
}

function calculate() {
  if (inputString) {
    term2 = parseFloat(inputString);
  }
  term1 = operator();
  calced = true;
  inputString = "";
  console.log(`term1: ${term1} term2: ${term2}`);
  console.log(`inputString: ${inputString}`);
  display(term1);
}

function add(term1, term2) {
  return term1 + term2;
}

function subtract(term1, term2) {
  return term1 - term2;
}

function multiply(term1, term2) {
  return term1 * term2;
}

function divide(term1, term2) {
  return term1 / term2;
}
