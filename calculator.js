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
      setFunction("×");
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
  //----------------------------------------------------//
  //Clears the memory of the calculator and             //
  //  resets it to 0                                    //
  //----------------------------------------------------//

  overflow = false;
  inputString = "0";
  term1 = null;
  term2 = null;
  constant = null;
  console.clear();
  display(inputString);
}

function clearLast() {
  //----------------------------------------------------//
  //Clears the last number element entered from the     //
  //  key pad                                           //
  //----------------------------------------------------//

  if (overflow) {
    let disp = document.getElementById("display");
    term1 = parseFloat(disp.innerHTML.slice(1));
    display(term1);
    overflow = false;
  } else {
    inputString = "0";
    display(inputString);
  }

}

function decimalButton() {
  //----------------------------------------------------//
  //Inputs a decimal so long as the current number      //
  //  doesn't already have one                          //
  //----------------------------------------------------//

  if (!hasDecimal(inputString)) {
    inputNumber(".");
  }
}

function hasDecimal(numString) {
  //----------------------------------------------------//
  //Checks to see if a decimal is in a number           //
  //string-> numString: string of a number to check     //
  //  for decimal                                       //
  //----------------------------------------------------//

  for (let i = 0; i < numString.length; i++) {
    if (numString[i] === ".") {
      return true;
    }
  }
  return false;
}

function inputNumber(item) {
  //----------------------------------------------------//
  //Inputs a number to the calculator                   //
  //----------------------------------------------------//

  if (overflow) return;
  /*if (calced) {
    //--------------------------------------------------//
    //If a number is entered immediately after pressing //
    //  the "=" key, it clears the memory and starts a  //
    //  new problem                                     //
    //--------------------------------------------------//

    constant = null;
    term1 = null;
    term2 = null;
    calced = false;
  }*/

  if (inputString[0] === "0") {
    //--------------------------------------------------//
    //The original Datamath Ⅱ displayed a 0 by default, //
    //  this is to prevent it from displaying in front  //
    //  of my term                                      //
    //--------------------------------------------------//

    inputString = item;
  } else {
    //--------------------------------------------------//
    //If there is no leading 0, then we just append the //
    //  last number entered                             //
    //--------------------------------------------------//

    inputString += item;
  }
  display(inputString)
}

function display(number) {
  //----------------------------------------------------//
  //Outputs a number to the display of the calculator   //
  //float-> number: number to be displayed              //
  //----------------------------------------------------//

  let disp = document.getElementById("display");
  let digits = countDigits(number);
  if (digits[0] > 8) {
    //--------------------------------------------------//
    //The Datamath Ⅱ only displayed 8 digits but it had //
    //  a unique way of expressing whole numbers over 8 //
    //  digits. This handles that.                      //
    //--------------------------------------------------//

    overflow = true;
    number /= 100000000;
    number = number.toFixed(7);
    term1 = number;
    number = "C" + number;
  } else if ((digits[0] + digits[1]) > 8 && typeof digits[1] === "number") {
    //--------------------------------------------------//
    //If the number has a fractional part, and it's over//
    //  8 digits, then the fractional part is rounded   //
    //  to the 8th digit                                //
    //--------------------------------------------------//

    number = number.toFixed(8 - digits[0]);
  }

  if (typeof number === "number") {
    //--------------------------------------------------//
    //Converts the number to a string                   //
    //--------------------------------------------------//

    number = number.toString(10);
  }

  if (hasDecimal(number)) {
    //--------------------------------------------------//
    //The Datamath Ⅱ always displays a decimal. If it's //
    //  displaying a whole number then that decimal is  //
    //  at the far right. This looks for that decimal   //
    //  and if it's not there, puts it in               //
    //--------------------------------------------------//

    disp.innerHTML = number;
  } else {
    disp.innerHTML = number + ".";
  }
}

function setFunction(operation) {
  //----------------------------------------------------//
  //Sets the current operation of the calculator to be  //
  //  executed when the enter button is pressed or      //
  //  another function key is pressed                   //
  //string-> operation: either +, -, ×, or ÷ based on   //
  //  which key the user pressed                        //
  //----------------------------------------------------//

  if (overflow) return;
  if (calced) {
    //--------------------------------------------------//
    //If a number is entered immediately after pressing //
    //  the "=" key, followed by an operation, it       //
    //  clears the memory and starts a new problem.     //
    //--------------------------------------------------//

    constant = null;
    term1 = null;
    term2 = null;
    calced = false;
  }
  calced = false;
  if (!inputString) {
    //--------------------------------------------------//
    //If the inputString is blank, that means one of    //
    //  the Datamath's "hidden" functions is being used //
    //  and that we need to get the value of the        //
    //  previous answer                                 //
    //--------------------------------------------------//

    term1 = parseFloat(document.getElementById("display").innerHTML);
  } else if (typeof term1 === "number") {
    //--------------------------------------------------//
    //If there is an inputString and there's already a  //
    //  number in term1, pressing a function key again  //
    //  forces a calculation of the new number input,   //
    //  and the previous number in memory               //
    //--------------------------------------------------//

    term2 = parseFloat(inputString);
    if (negative) {
      //------------------------------------------------//
      //If the negative function has been activated then//
      //  we make the number negative before calculating//
      //  a result                                      //
      //------------------------------------------------//

      term2 *= -1;
      negative = false;
    }

    term1 = operator();
    display(term1);
  } else {
    //--------------------------------------------------//
    //If there is an inputString but there is nothing   //
    //  in term1, then we assign the number that was    //
    //  input to term1.                                 //
    //--------------------------------------------------//

    term1 = parseFloat(inputString);
    if (negative) {
      //------------------------------------------------//
      //If the negative function has been activated then//
      //  we make the number negative before calculating//
      //  a result                                      //
      //------------------------------------------------//

      term1 *= -1;
      negative = false;
    }
  }

  let disp = document.getElementById("display");
  let dispText = disp.innerHTML;
  disp.innerHTML = "";
  setTimeout(function() {
    disp.innerHTML = dispText;
  }, 50);

  constant = null;
  inputString = "";
  func = operation;
  operator = operations[operation];
}

function calculate() {
  //----------------------------------------------------//
  //Handles the multiple functions of the "=" key       //
  //----------------------------------------------------//

  if (overflow) return;
  if (typeof constant !== "number") {
    //--------------------------------------------------//
    //When there isn's a number assigned to the constant//
    //  variable...                                     //
    //--------------------------------------------------//

    if (inputString) {
      //------------------------------------------------//
      //If there is input, assign it to term2           //
      //------------------------------------------------//

      term2 = parseFloat(inputString);
    }
    if (func === "×") {
      //------------------------------------------------//
      //If the last function key pressed was "×", then  //
      //  assign the value of term1 to constant         //
      //------------------------------------------------//

      constant = term1;
    } else if (func === "÷" && !inputString) {
      //------------------------------------------------//
      //If the last function was division and no number //
      //  input was entered after the function key was  //
      //  pressed, that invokes the reciprocal function //
      //  which technically needs to be invoked twice   //
      //------------------------------------------------//

      if (typeof term2 !== "number") {
        //------------------------------------------------//
        //term1 is assigned to term2 because we want to   //
        //  divide the number by itself two times to find //
        //  its reciprocal and term1 changes with each    //
        //  calculation, term2 does not.                  //
        //------------------------------------------------//

        term2 = term1;
      }
    } else {
      //------------------------------------------------//
      //If the last function wasn't multiplication, then//
      //  the second value entered is assigned to the   //
      //  constant variable                             //
      //------------------------------------------------//

      constant = term2;
    }

    if (negative) {
      //------------------------------------------------//
      //If the negative function has been activated then//
      //  we make the number negative before calculating//
      //  a result                                      //
      //------------------------------------------------//

      term2 *= -1;
      negative = false;
    }

    if (func === "×" && !inputString) {
      //------------------------------------------------//
      //This handles the squaring function. If the "="  //
      //  key is pressed directly after the "×" key, it //
      //  computes the square of the number             //
      //------------------------------------------------//

      term1 = term1 ** 2;
    } else if (func === "÷" && !inputString) {
      //------------------------------------------------//
      //This handles the reciprocal function. If the "="//
      //  key is pressed directly after the "÷" key, it //
      //  divides the number by itself, and stores that //
      //  number. Press "=" again to find the reciprocal//
      //------------------------------------------------//

      term1 = term1 / term2;
    } else {
      //------------------------------------------------//
      //If we're not doing either of those functions,   //
      //  calculate the answer of term1 operated on by  //
      //  term2, then assign that value to term1        //
      //------------------------------------------------//

      term1 = operator();
    }
    display(term1);
  } else if (!inputString) {
    //------------------------------------------------//
    //If there's no input, we apply the previous      //
    //  operation to the number currently displayed   //
    //  (not in listed functionality)                 //
    //------------------------------------------------//

    term1 = parseFloat(document.getElementById("display").innerHTML);
    term1 = operator();
    display(term1);
  } else {
    //------------------------------------------------//
    //If a constant is saved in memory, and a new     //
    //  inputString has been entered, then the new    //
    //  input is operated on by the saved constant    //
    //------------------------------------------------//

    term1 = parseFloat(inputString);
    term2 = constant;
    display(operator());
  }
  inputString = "";
  calced = true;
}

function countDigits(number) {
  //----------------------------------------------------//
  //Counts the number of digits in a number, both       //
  //  before the decimal, and after                     //
  //float-> number: number thats digits are             //
  //  to be counted                                     //
  //----------------------------------------------------//

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
  //----------------------------------------------------//
  //Handles everything that can happen when the "+"     //
  //  is pressed                                        //
  //----------------------------------------------------//

  if (overflow) return;
  if (typeof term1 === "number" && typeof term2 === "number" && !inputString && !calced) {
    //--------------------------------------------------//
    //The Datamath lets you repeatedly add the same     //
    //  number by continuing to press the "+" key. If   //
    //  there is a value assigned to both term1 and     //
    //  term2 and the inputString is blank, AND we      //
    //  haven't just completed a calculation, then we   //
    //  do that function.                               //
    //--------------------------------------------------//

    term1 = add(term1, term2);
    display(term1);
  } else {
    //--------------------------------------------------//
    //Otherwise, we run the setFunction() function for  //
    //  addition                                        //
    //--------------------------------------------------//

    setFunction("+");
  }
}

function minusButton() {
  //----------------------------------------------------//
  //Handles everything that can happen when the "-"     //
  //  button is pressed                                 //
  //----------------------------------------------------//

  if (overflow) return;
  if (!inputString && !calced && (func !== "-" || typeof func !== "string")) {
    //--------------------------------------------------//
    //This determines when the "-" key is for making a  //
    //  number negative instead of indicating the       //
    //  subtraction operation                           //
    //--------------------------------------------------//

    negative = true;
    display("-0");
  } else if (typeof term1 === "number" && typeof term2 === "number" && !inputString && !calced) {
    //--------------------------------------------------//
    //If both term1 and term2 have values and the       //
    //  inputString is empty AND the "=" key hasn't just//
    //  been pressed, the continued subtraction         //
    //  operation is ran                                //
    //--------------------------------------------------//

    term1 = operator();
    display(term1);
  } else {
    //--------------------------------------------------//
    //Otherwise, treat it as a normal subtraction       //
    //  operation                                       //
    //--------------------------------------------------//

    setFunction("-");
  }
}

function percent() {
  //----------------------------------------------------//
  //Handles the percentage functions when "%" is pressed//
  //----------------------------------------------------//

  if (overflow) return;
  term2 = parseFloat(inputString);
  term2 = term1 * (term2 / 100);
  if (func === "-") {
    //--------------------------------------------------//
    //The Datamath puts a negative sign in front of     //
    //  percentages when called after a subtraction     //
    //  operation                                       //
    //--------------------------------------------------//

    display("-" + term2);
  } else {
    display(term2);
  }
  inputString = "";
}

function add(x, y) {
  //----------------------------------------------------//
  //Adds two numbers. The crazy upsizing/downsizing     //
  //  is to accomodate the "Curse of Floating Point     //
  //  Numbers"                                          //
  //----------------------------------------------------//

  let digits = countDigits(x)[1] + countDigits(y)[1];
  let bigX = x * 10 ** (digits);
  let bigY = y * 10 ** (digits);
  let sum = (bigX + bigY) / (10 ** digits);
  return sum;
}

function subtract(x, y) {
  //----------------------------------------------------//
  //Subtracts two numbers. The crazy upsizing/downsizing//
  //  is to accomodate the "Curse of Floating Point     //
  //  Numbers"                                          //
  //----------------------------------------------------//

  let digits = countDigits(x)[1] + countDigits(y)[1];
  let bigX = x * 10 ** (digits);
  let bigY = y * 10 ** (digits);
  let difference = (bigX - bigY) / (10 ** digits);
  return difference;
}

function multiply(x, y) {
  //----------------------------------------------------//
  //I use these large multiplications and divisions to  //
  //  avoid the imprecision inherent in floating point  //
  //  arithmetic                                        //
  //----------------------------------------------------//

  x *= 10000;
  y *= 10000;
  let product = x * y;
  return product / 100000000;
}

function divide(x, y) {
  //----------------------------------------------------//
  //Divides one number by another. The crazy upsizing/  //
  //  downsizing is to accomodate the "Curse of Floating//
  //  Point Numbers"                                    //
  //----------------------------------------------------//

  let digits = countDigits(x)[1] + countDigits(y)[1];
  x *= 10 ** digits;
  y *= 10 ** digits;
  let quotient = x / y;
  return quotient;
}
