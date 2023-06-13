const calcBtnsWrapper = document.querySelector('.calc-buttons');
const calcScreen = document.querySelector('.calc-screen');
let currentOperator;
let screenText = '0';
let isOperatorClicked = false;
let a = 0;
let b = 0;
let numbers = [];

function addCalcBtn(btnName, gridRow, girdColumn, className) {
    const calcBtn = document.createElement('div');
    calcBtn.classList.add('calc-btn', className);
    calcBtn.textContent = `${btnName}`;
    calcBtn.style.cssText = `
    grid-column: ${girdColumn};
    grid-row: ${gridRow};`
    calcBtnsWrapper.appendChild(calcBtn);
}

addCalcBtn('C', 1, 1, 'clear');
addCalcBtn('DEL', 1, 2, 'delete');
addCalcBtn('/', 1, 3, 'operation');
addCalcBtn('X', 1, 4, 'operation');
addCalcBtn('+', 2, 4, 'operation');
addCalcBtn('-', 3, 4, 'operation');
addCalcBtn('.', 4, 4, 'point');
addCalcBtn('=', 5, 4, 'equal-sign');

addCalcBtn('0', 5, 2, 'digit');
addCalcBtn('1', 2, 1, 'digit');
addCalcBtn('2', 2, 2, 'digit');
addCalcBtn('3', 2, 3, 'digit');
addCalcBtn('4', 3, 1, 'digit');
addCalcBtn('5', 3, 2, 'digit');
addCalcBtn('6', 3, 3, 'digit');
addCalcBtn('7', 4, 1, 'digit');
addCalcBtn('8', 4, 2, 'digit');
addCalcBtn('9', 4, 3, 'digit');

document.querySelectorAll('.calc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const isDigit = btn.classList.contains('digit'),
              isOperation = btn.classList.contains('operation'),
              isEqualSign = btn.classList.contains('equal-sign'),
              isClear = btn.classList.contains('clear'),
              isDelete = btn.classList.contains('delete'),
              isPoint = btn.classList.contains('point');
              keyName = btn.textContent;

        calculator(keyName, isDigit, isOperation, isEqualSign, isClear, isDelete, isPoint);
    })
});

document.addEventListener('keydown', e => {
    const operations = '+-/*';

    const isDigit = isFinite(e.key),
          isOperation = operations.includes(e.key),
          isEqualSign = (e.key === '=' || e.key === 'Enter'),
          isClear = e.key === 'Escape',
          isDelete = e.key === 'Backspace',
          isPoint = e.key === '.',
          keyName = e.key;

    calculator(keyName, isDigit, isOperation, isEqualSign, isClear, isDelete, isPoint);

});

function operation(a, b, operator) {
    if (operator === '+') {
        return a + b;
    }

    if (operator === '-') {
        return a - b;
    }

    if (operator === 'X' || operator === '*') {
        return a * b;
    }

    if (operator === '/') {
        return a / b;
    }
}

function saveNumberFromScreen() {
    numbers.push(+screenText);;
}

function roundResult(result) {
    return Math.floor(result * 1000000) / 1000000;
}

function isDivideByZero() {
    if (currentOperator === '/') {
        if (numbers[1] === 0) {
            return true;
        }
    }
    return false;
}

function doOperation() {
    saveNumberFromScreen();
    if (numbers.length === 2) {
        if (isDivideByZero()) {
            screenText = 'Ошибка!';
            numbers = [];
            return;
        }

        screenText = operation(numbers[0], numbers[1], currentOperator);
        screenText = roundResult(screenText);
        numbers = [screenText];
    }
}

function checkNumberLength() {
    if (screenText.length > 12) {
        screenText = screenText.slice(0, 12);
    }
}

function handleDigitInput(keyName) {
    if (isOperatorClicked === true || screenText === '0' || screenText === 'Ошибка!') {
        screenText = '';
        isOperatorClicked = false;
    }

    screenText += keyName;
}

function handleOperationInput(keyName) {
    if (keyName === '-' && screenText === '0') {
        screenText = '-';
    } else {
        if (screenText != 'Ошибка!') {
            isOperatorClicked = true;
            doOperation();
            currentOperator = keyName;
        }
    }
}

function handleEqualSignInput() {
    doOperation();
    numbers = [];
}

function handleClearButton() {
    screenText = '0';
    numbers = [];
}

function handleDeleteButton() {
    if (screenText === '' || screenText === 'Ошибка!' || screenText.length === 1) {
        screenText = '0';
    } else {
        screenText = screenText.slice(0, -1);
    }
}

function handlePointInput() {
    isOperatorClicked = false;
    if (!screenText.includes('.')) {
        screenText += '.';
    }
}

function calculator(keyName, isDigit, isOperation, isEqualSign, isClear, isDelete, isPoint) {
    checkNumberLength();

    if (isDigit) {
        handleDigitInput(keyName);
    }

    if (isOperation) {
        handleOperationInput(keyName);
    }

    if (isEqualSign) {
        handleEqualSignInput();
    }

    if (isClear) {
        handleClearButton();
    }

    screenText += '';

    if (isDelete) {
        handleDeleteButton();
    }

    if (isPoint) {
        handlePointInput();
    }

    calcScreen.textContent = screenText;
}