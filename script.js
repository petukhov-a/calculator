const calcBtnsWrapper = document.querySelector('.calc-buttons');
const calcScreen = document.querySelector('.calc-screen');
let result;
let currentOperator;
let operator;
let screenText = '';
let isOperatorClicked = false;
let a = null;
let b = null;

function addCalcBtn(btnName, gridRow, girdColumn, color, className) {
    const calcBtn = document.createElement('div');
    calcBtn.classList.add('calc-btn', className);
    calcBtn.textContent = `${btnName}`;
    calcBtn.style.cssText = `
    grid-column: ${girdColumn};
    grid-row: ${gridRow};
    background-color: ${color};`
    calcBtnsWrapper.appendChild(calcBtn);
}

addCalcBtn('C', 1, 1, '#e1e1e1', 'clear');
addCalcBtn('DEL', 1, 2, '#e1e1e1', 'delete');
addCalcBtn('/', 1, 3, '#e1e1e1', 'operation');
addCalcBtn('X', 1, 4, '#e1e1e1', 'operation');
addCalcBtn('+', 2, 4, '#e1e1e1', 'operation');
addCalcBtn('-', 3, 4, '#e1e1e1', 'operation');
addCalcBtn(',', 4, 4, '#e1e1e1', 'operation');
addCalcBtn('=', 5, 4, '#e1e1e1', 'equal-sign');

addCalcBtn('0', 5, 2, '#fff', 'digit');
addCalcBtn('1', 2, 1, '#fff', 'digit');
addCalcBtn('2', 2, 2, '#fff', 'digit');
addCalcBtn('3', 2, 3, '#fff', 'digit');
addCalcBtn('4', 3, 1, '#fff', 'digit');
addCalcBtn('5', 3, 2, '#fff', 'digit');
addCalcBtn('6', 3, 3, '#fff', 'digit');
addCalcBtn('7', 4, 1, '#fff', 'digit');
addCalcBtn('8', 4, 2, '#fff', 'digit');
addCalcBtn('9', 4, 3, '#fff', 'digit');

document.querySelectorAll('.calc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('digit')) {
            if (isOperatorClicked === true) {
                screenText = '';
                isOperatorClicked = false;
            }

            screenText += btn.textContent;
        }

        if (btn.classList.contains('operation')) {
            isOperatorClicked = true;

            if (a != null) {
                b = +screenText;
            } else {
                a = +screenText;
            }

            if ((a != null) && (b != null)) {
                screenText = operation(a, b, operator);
                a = screenText;
                b = null;
            }

            operator = btn.textContent;
        }

        if (btn.classList.contains('equal-sign')) {
            if (a != null) {
                b = +screenText;
                screenText = operation(a, b, operator);
                a = null;
                b = null;
            }
        }

        if (btn.classList.contains('clear')) {
            screenText = '';
            a = null;
            b = null;
        }

        if (btn.classList.contains('delete')) {
            screenText = screenText.slice(0, -1);
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