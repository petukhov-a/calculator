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

        if (btn.classList.contains('digit')) {
            if (isOperatorClicked === true) {
                if (screenText != '-') {
                    screenText = '';
                }

                isOperatorClicked = false;
            }

            screenText += btn.textContent;
        }

        if (btn.classList.contains('operation')) {
            isOperatorClicked = true;
            doOperation();
            currentOperator = btn.textContent;
        }

        if (btn.classList.contains('equal-sign')) {
            doOperation();
            numbers = [];
        }

        if (btn.classList.contains('clear')) {
            screenText = '0';
            numbers = [];
        }

        if (btn.classList.contains('delete')) {
            if (screenText === '' || screenText === 'Ошибка!') {
                screenText = '0';
            }
            screenText = screenText.slice(0, -1);
        }

        if (btn.classList.contains('point')) {
            isOperatorClicked = false;
            if (!screenText.includes('.')) {
                screenText += '.';
            }
        }

        if (screenText.at(-1) != '.' && isFinite(screenText)) {
            screenText = Math.floor(screenText * 1000000) / 1000000;
        }

        calcScreen.textContent = screenText;
    });
});

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

function calculateResult() {
    return operation(numbers[0], numbers[1], currentOperator);
}

function saveNumberFromScreen() {
    numbers.push(+screenText);;
}

function doOperation() {
    saveNumberFromScreen();
    if (numbers.length === 2) {

        if (numbers[1] === 0) {
            screenText = 'Ошибка!';
            return;
        }

        screenText = calculateResult() + '';
        numbers = [screenText];
    }
}