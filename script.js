const calcBtnsWrapper = document.querySelector('.calc-buttons');

function addCalcBtn(btnName, gridRow, girdColumn, color='#e1e1e1') {
    const calcBtn = document.createElement('div');
    calcBtn.classList.add('calc-btn');
    calcBtn.textContent = `${btnName}`;
    calcBtn.style.cssText = `
    grid-column: ${girdColumn};
    grid-row: ${gridRow};
    background-color: ${color};`
    calcBtnsWrapper.appendChild(calcBtn);
}

addCalcBtn('C', 1, 1);
addCalcBtn('DEL', 1, 2);
addCalcBtn('/', 1, 3);
addCalcBtn('X', 1, 4);
addCalcBtn('+', 2, 4);
addCalcBtn('-', 3, 4);
addCalcBtn(',', 4, 4);

addCalcBtn('0', 5, 2, '#fff');

addCalcBtn('1', 2, 1, '#fff');
addCalcBtn('2', 2, 2, '#fff');
addCalcBtn('3', 2, 3, '#fff');

addCalcBtn('4', 3, 1, '#fff');
addCalcBtn('5', 3, 2, '#fff');
addCalcBtn('6', 3, 3, '#fff');

addCalcBtn('7', 4, 1, '#fff');
addCalcBtn('8', 4, 2, '#fff');
addCalcBtn('9', 4, 3, '#fff');