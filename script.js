const calcBtnsWrapper = document.querySelector('.calc-buttons');
const calcScreen = document.querySelector('.calc-screen');
let result;
let currentOperator;
let operator;
let screenText = '0';
let isOperatorClicked = false;
let a = 0;
let b = 0;

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
addCalcBtn(',', 4, 4, 'operation');
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
            if (isOperatorClicked === true || screenText === '0') {

                if (screenText != '-') {
                    screenText = '';
                }
                isOperatorClicked = false;

            }

            screenText += btn.textContent;
        }

        if (btn.classList.contains('operation')) {
            isOperatorClicked = true;

            if (a != 0) {
                b = +screenText;
            } else {
                a = +screenText;
            }

            if (a != 0 && b != 0) {
                screenText = operation(a, b, operator) + '';
                a = +screenText;
                b = 0;
            }

            operator = btn.textContent;

            if (operator === '-' && a === 0) {
                screenText = '-';
            }
        }

        if (btn.classList.contains('equal-sign')) {
            if (a != 0) {
                b = +screenText;
                screenText = operation(a, b, operator) + '';
                a = 0;
                b = 0;
            }
        }

        if (btn.classList.contains('clear')) {
            screenText = '0';
            a = 0;
            b = 0;
        }

        if (btn.classList.contains('delete')) {
            screenText = screenText.slice(0, -1);
            if (screenText === '') {
                screenText = '0';
            }
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