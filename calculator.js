let inputString = "";
let term1, term2, constant;
let operator = function() {};
let func = "";
const operations = {
  "+": function() {return add(term1, term2)},
  "-": function() {return subtract(term1, term2)},
  "×": function() {return multiply(term1, term2)},
  "÷": function() {return divide(term1, term2)},
  "%": function() {return percent(term1, term2)}
}
let overflow = false;
let negative = false;
let calced = false;

document.onkeypress = function(event) {

  switch(event.key) {
    case "1":
      inputNumber("1");
      break;
    case "2":
      inputNumber("2");
      break;
    case "3":
      inputNumber("3");
      break;
    case "4":
      inputNumber("4");
      break;
    case "5":
      inputNumber("5");
      break;
    case "6":
      inputNumber("6");
      break;
    case "7":
      inputNumber("7");
      break;
    case "8":
      inputNumber("8");
      break;
    case "9":
      inputNumber("9");
      break;
    case "0":
      inputNumber("0");
      break;
    case ".":
      decimalButton();
      break;
    case "+":
      plusButton();
      break;
    case "-":
      minusButton();
      break;
    case "*":
      timesButton();
      break;
    case "/":
      event.preventDefault();
      setFunction("÷");
      break;
    case "p":
      percent();
      break;
    case "Enter":
      calculate();
      break;
    case "c":
      clearAll()
      break;
    case "v":
      clearLast();
      break;
  }
}

function clearAll() {
  overflow = false;
  inputString = "0";
  term1 = null;
  term2 = null;
  constant = null;
  console.clear();
  display(inputString);
}

function clearLast() {
  console.log("clear element");
  if (overflow) {
    console.log(term1)
    let disp = document.getElementById("display");
    //let value =
    term1 = parseFloat(disp.innerHTML.slice(1));
    display(term1);
    overflow = false;
  } else {
    inputString = "0";
    display(inputString);
  }


}

function decimalButton() {
  if (!hasDecimal(inputString)) {
    inputNumber(".");
  }
}

function hasDecimal(numString) {

  for (let i = 0; i < numString.length - 1; i++) {
    if (numString[i] === ".") {
      return true;
    }
  }
  return false;
}

function inputNumber(item) {
  if (overflow) return;
  console.log(`INPUT ${item}`);
  if (term1) console.log(`term1 ${term1}`);
  if (inputString[0] === "0") {
    inputString = item;
  } else {
    inputString += item;
  }
  console.log(`inputString ${inputString}`);
  display(inputString)
}

function display(number) {
  let disp = document.getElementById("display");
  let digits = countDigits(number);
  if (digits[0] > 8) {
    overflow = true;
    number /= 100000000;
    number = number.toFixed(7);
    term1 = number;
    number = "C" + number;
  } else if ((digits[0] + digits[1]) > 8 && typeof digits[1] === "number") {
    number = number.toFixed(8 - digits[0]);
  }

  if (typeof number === "number") {
    number = number.toString(10);
  }
  console.log(`DISPLAY ${number}, ${typeof number}`);
  if (hasDecimal(number)) {
    console.log(`${number} has a decimal`);
    disp.innerHTML = number;
  } else {
    console.log(`${number} does not have a decimal`);
    disp.innerHTML = number + ".";
  }
  //disp.innerHTML = number;
}

function setFunction(operation) {
  if (overflow) return;
  calced = false;
  console.log(`OPERATION ${operation}`);
  if (!inputString) {
    term1 = parseFloat(document.getElementById("display").innerHTML);
  } else if (typeof term1 === "number") {
    term2 = parseFloat(inputString);
    if (negative) {
      term2 *= -1;
      negative = false;
    }
    term1 = operator();
    display(term1);
  } else {
    term1 = parseFloat(inputString);
    if (negative) {
      term1 *= -1;
      negative = false;
    }
  }

  constant = null;
  inputString = "";

  console.log(`term1 ${term1} term2 ${term2}`);
  console.log(`inputString ${inputString}`);
  func = operation;
  operator = operations[operation];
}

function calculate() {
  if (overflow) return;
  console.log("CALCULATE");
  if (typeof constant !== "number") {
    console.log("NO CONSTANT");
    /*if (typeof term2 !== "number") {
      term2 = parseFloat(inputString);
    }*/
    if (inputString) {
      term2 = parseFloat(inputString);
    }
    if (func === "×") {
      constant = term1;
    } else if (func === "÷" && !inputString) {
      if (typeof term2 !== "number") {
        term2 = term1;
      }

    } else {
      constant = term2;
    }
    if (negative) {
      term2 *= -1;
      negative = false;
    }
    console.log(`term1 ${term1} term2 ${term2} constant ${constant}`);
    if (func === "×" && !inputString) {
      term1 = term1 ** 2;
    } else if (func === "÷" && !inputString) {
      term1 = term1 / term2;
    } else {
      term1 = operator();
    }
    //term1 = operator();
    display(term1);
  } else if (!inputString) {
    term1 = parseFloat(document.getElementById("display").innerHTML);
    term1 = operator();
    console.log(`term1 ${term1} term2 ${term2} constant ${constant}`);
    display(term1);
  } else {
    term1 = parseFloat(inputString);
    term2 = constant;
    console.log(`term1 ${term1} term2 ${term2} constant ${constant}`);
    display(operator());
  }

  //term2 = parseFloat(inputString);
  //term1 = operator();
  inputString = "";
  calced = true;
  //display(term1);

}

function countDigits(number) {
  number = number.toString(10);
  let count = [0, 0];
  let index = 0;
  for (let i = 0; i < number.length; i++) {
    if (number[i] == ".") {
      index = 1;
    }
    count[index]++;
  }
  return count;
}

function plusButton() {
  if (overflow) return;
  console.log("+");
  if (typeof term1 === "number" && typeof term2 === "number" && !inputString && !calced) {
    console.log(`term1 ${term1} term2 ${term2}`);
    console.log(`inputString ${inputString}`);
    term1 = add(term1, term2);
    display(term1);
  } else {
    setFunction("+");
  }
}

function minusButton() {
  if (overflow) return;
  console.log("-");
  if (!inputString && (func !== "-" || typeof func !== "string")) {
    console.log("make it negative");
    negative = true;
    display("-0");
  } else if (typeof term1 === "number" && typeof term2 === "number" && !inputString) {
    console.log(`term1 ${term1} term2 ${term2}`);
    term1 = operator();
    display(term1);
  } else {
    setFunction("-");
  }
}

function timesButton() {
  setFunction("×");
}

function percent() {
  if (overflow) return;
  console.log("PERCENT");
  term2 = parseFloat(inputString);
  term2 = term1 * (term2 / 100);
  console.log(`term1 ${term1} term2 ${term2}`);
  console.log(`inputString ${inputString}`);
  if (func === "-") {
    display("-" + term2);
  } else {
    display(term2);
  }
  inputString = "";
}

function add(term1, term2) {
  return term1 + term2;
}

function subtract(term1, term2) {
  return term1 - term2;
}

function multiply(x, y) {
  x *= 10000;
  y *= 10000;
  let product = x * y;
  return product / 100000000;
}

function divide(term1, term2) {
  return term1 / term2;
}
