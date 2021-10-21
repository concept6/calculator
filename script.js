// copying in my calculation functions from the odin project javascript exercise
// commenting out ones not need/not working (array not iterable?)

function add (a, b) {
	return a + b;
};

function subtract (a, b) {
	return a - b;
};

/* function sum (array) {
	let totalSum = 0;
	for (const numEach of array) {
      totalSum = totalSum + numEach;
    }
  return totalSum;
}; */

function multiply (a, b) {
  return a * b;
};

/* function multiply (array) {
  let sum = 1;
  for (const numEach of array) {
    sum = sum * numEach;
  }
  return sum;
}; */

/* function power (a, b) {
  let sum = a;
  for (let i = 1; i < b; i++) {
    sum = sum * a;
  }
  return sum;
}; */

/* function factorial(a) {
	let sum = 1;
  for (let i = 1; i <= a; i++){
    sum = sum * i;
  }
  return sum;
}; */

// add a divide function

function divide(a, b) {
    return a / b; // todo verify decimals etc.
}


// new function operate

function operate(operator, a, b) {
    let stringFunctionName = String(operator) //redundant
    a = parseFloat(a);
    b = parseFloat(b);
    return window[stringFunctionName](a,b);
}




let check = operate('add', 2, 4);

let lol = check;


//will be using these three global variables to work the display
var calculatorSpace = {
  displayNumber: '0',
  hiddenNumber: '',
  preparedOperator: ''
}

//todo: functions that populate discplay when number buttons are clicked




//todo move this elsewhere
function clickedClearButton() {
  calculatorSpace.displayNumber = '0';
  calculatorSpace.hiddenNumber = ''
  display.textContent = calculatorSpace.displayNumber;
  return;
}


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


function introduceSecondNumber(e) {
  calculatorSpace.hiddenNumber = calculatorSpace.displayNumber;
  calculatorSpace.displayNumber = '0';
  display.textContent = calculatorSpace.displayNumber;
  calculatorSpace.preparedOperator = e.currentTarget.textContent;
  return;
}



function runOperate(e) {
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



  calculatorSpace.displayNumber = Math.round(operate(operatorFullText,calculatorSpace.hiddenNumber,calculatorSpace.displayNumber) * 100) / 100;
  display.textContent = calculatorSpace.displayNumber;
  return;
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
