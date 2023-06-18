const calcBtnsWrapper = document.querySelector('.calc-buttons');
const calcScreen = document.querySelector('.calc-screen');
let currentOperator;
let screenText = '0';
let isOperatorClicked = false;
let numbers = [];

// Creating Caclculator Buttons

function addCalcBtn(btnName, gridRow, girdColumn, className) {
    const calcBtn = document.createElement('button');
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

const calcBtns = calcBtnsWrapper.querySelectorAll('.calc-btn');

// End of Creating Caclculator Buttons

// Handle Onscreen Calculator Buttons

document.querySelectorAll('.calc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // btnAnimation(btn);

        const isDigit = btn.classList.contains('digit'),
              isOperation = btn.classList.contains('operation'),
              isEqualSign = btn.classList.contains('equal-sign'),
              isClear = btn.classList.contains('clear'),
              isDelete = btn.classList.contains('delete'),
              isPoint = btn.classList.contains('point'),
              keyName = btn.textContent;

        calculator(keyName, isDigit, isOperation, isEqualSign, isClear, isDelete, isPoint);
    });
});

// End of Handle Onscreen Calculator Buttons

// Handle Keyboard Calculator Keys

document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
    const keyboardCalcActions = {
        '*': 'X',
        'Backspace': 'DEL',
        'Escape': 'C',
        'Enter': '='
    }

    calcBtns.forEach(btn => {
        const btnText = btn.textContent;
        if (btnText === e.key || btnText === keyboardCalcActions[e.key]) {
            btn.click();
        }
    });
});

// End of Handle Keyboard Calculator Keys

function calculator(keyName, isDigit, isOperation, isEqualSign, isClear, isDelete, isPoint) {
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

// function btnAnimation(btn) {
//     if (btn.classList.contains('digit')) {
//         btn.classList.toggle('active-dark');
//         setTimeout(() => {
//             btn.classList.toggle('active-dark');
//         }, 500);
//     } else {
//         btn.classList.toggle('active-light');
//         setTimeout(() => {
//             btn.classList.toggle('active-light');
//         }, 500);
//     }
// }

function handleDigitInput(keyName) {
    if (isOperatorClicked || screenText === '0' || screenText === 'Error!') {
        screenText = '';
        isOperatorClicked = false;
    }
    if (!isNumberOverflow()) {
        screenText += keyName;
    }
}

function handleOperationInput(keyName) {
    if (keyName === '-' && screenText === '0') {
        screenText = '-';
    } else {
        if (screenText != 'Error!' && screenText != '-') {
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
    if (screenText === '' || screenText === 'Error!' || screenText.length === 1) {
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

function operation(a, b, operator) {
    if (operator === '+') {
        return a + b;
    }

    if (operator === '-') {
        return a - b;
    }

    if (operator === 'X') {
        return a * b;
    }

    if (operator === '/') {
        return a / b;
    }
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
            screenText = 'Error!';
            numbers = [];
        } else {
            screenText = operation(numbers[0], numbers[1], currentOperator);
            screenText = roundResult(screenText);

            if ((screenText + '').length > 8) {
                screenText = screenText.toExponential(8);
            }

            numbers = [screenText];
        }
    }
}

function roundResult(result) {
    return (result.toFixed(11) * 100000000000) / 100000000000;
}

function saveNumberFromScreen() {
    numbers.push(+screenText);
}

function isNumberOverflow() {
    if (screenText.length > 11) {
        return true;
    }
    return false;
}