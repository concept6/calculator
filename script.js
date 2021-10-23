//helper functions to operate calculator
function add (a, b) {
	return a + b;
};

function subtract (a, b) {
	return a - b;
};

function multiply (a, b) {
  return a * b;
};

function divide(a, b) {
    return a / b; // todo verify decimals etc.
}

// new operate runs the functions

function operate(operator, a, b) {
    let stringFunctionName = String(operator) //redundant
    a = parseFloat(a);
    b = parseFloat(b);
    return window[stringFunctionName](a,b);
}

//will be using these three semi-global variables to work the display
var calculatorSpace = {
  displayNumber: '0',
  hiddenNumber: '',
  preparedOperator: ''
}


function clickedClearButton() {
  calculatorSpace.displayNumber = '0';
  calculatorSpace.hiddenNumber = '';
  calculatorSpace.preparedOperator = '';
  display.textContent = calculatorSpace.displayNumber;
  return;
}

// runs when a number is clicked
// updates the display number and updates the display
function updateDisplayNumber(e) {
  let numberEntered = e.currentTarget.textContent;
  if (calculatorSpace.displayNumber === '0') {
    calculatorSpace.displayNumber = numberEntered;
  } else {
    calculatorSpace.displayNumber = calculatorSpace.displayNumber + numberEntered;
  }
  display.textContent = calculatorSpace.displayNumber;
  return;
}

// runs when an operator is clicked
// if there is an existing hidden number, runs operate on the hidden and display
// and changes the hidden to the outcome of that operation
// if there is no existing hidden number, changes the display to hidden and prepares the operator
function introduceSecondNumber(e) {
  
  if (calculatorSpace.hiddenNumber !== '') {
    runOperate(false);
  }

  calculatorSpace.preparedOperator = e.currentTarget.textContent;
  calculatorSpace.hiddenNumber = calculatorSpace.displayNumber;
  calculatorSpace.displayNumber = '0';
  return;
}

// runs when equals is clicked.
// runs operate on the hidden and display numbers
// sets the display to the output
// and updates the display
function runOperate(updateDisplayBool) {

  if (!calculatorSpace.hiddenNumber || !calculatorSpace.preparedOperator || calculatorSpace.displayNumber === '0') {
    return false;
  }


  let operatorFullText = '';
  switch (calculatorSpace.preparedOperator) {
    case '÷':
      operatorFullText = 'divide';
      if (calculatorSpace.displayNumber === '0') {
        display.textContent = 'Cannot divide by zero!';
        return false;
      }
      break;
    case 'x':
      operatorFullText = 'multiply';
      break;
    case '-':
      operatorFullText = 'subtract';
      break;
    case '+':
      operatorFullText = 'add';
      break
  }

  calculatorSpace.displayNumber = String(Math.round(operate(operatorFullText,calculatorSpace.hiddenNumber,calculatorSpace.displayNumber) * 100) / 100);
  
  if (updateDisplayBool) {
    display.textContent = calculatorSpace.displayNumber;
  }
  calculatorSpace.hiddenNumber = '';
  return;
}


function addDecimal() {
  if (calculatorSpace.displayNumber.includes('.')) {
    return false;
  }
  if (calculatorSpace.displayNumber === '0') {
    calculatorSpace.displayNumber = '0.';
  } else {
    calculatorSpace.displayNumber = calculatorSpace.displayNumber + '.';
  }
  display.textContent = calculatorSpace.displayNumber;
}



const display = document.querySelector('.display');

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click',clickedClearButton);


const numberButtons  = Array.from(document.querySelectorAll('.number'));
numberButtons.forEach(numberButton => numberButton.addEventListener('click',updateDisplayNumber));


const operatorButtons = Array.from(document.querySelectorAll('.operator'));
operatorButtons.forEach(operatorButton => operatorButton.addEventListener('click',introduceSecondNumber))


const equalsButton = document.querySelector('.equals');
equalsButton.addEventListener('click',runOperate);


const decimalButton = document.querySelector('.decimal');
decimalButton.addEventListener('click',addDecimal);