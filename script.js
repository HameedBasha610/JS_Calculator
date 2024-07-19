const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.keys');
const display = document.querySelector('.display');

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
            calculator.dataset.previousKeyType = 'number'
            console.log('number key!');
        }

        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.'
            }
            else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = '0.'
            }
            console.log('decimal key!');

            calculator.dataset.previousKeyType = 'decimal';
        }

        if (action !== 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
        }

        if (action === 'clear') {
            if (key.textContent === 'AC') {
                calculator.dataset.firstValue = '';
                calculator.dataset.operator = '';
                calculator.dataset.previousKeyType = '';
                calculator.dataset.modValue = '';
            }

            else {
                key.textContent = 'AC'
            }
            display.textContent = '0';
            calculator.dataset.previousKeyType = 'clear';
            console.log('clear key!');
        }

        if (action === 'add' || action === 'sub' || action === 'mul' || action === 'divide') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            // Note: It's sufficient to check for firstValue and operator because secondValue always exists
            if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue;

                calculator.dataset.firstValue = calcValue;
            }
            else {
                calculator.dataset.firstValue = displayedNum;
            }
            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';
            // calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = action;
            console.log('operator key!');
        }
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));


        if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            let secondValue = displayedNum;
            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum
                    secondValue = calculator.dataset.modValue
                }
                display.textContent = calculate(firstValue, operator, secondValue)
                console.log('equal key!')
            }
            calculator.dataset.modValue = secondValue
            calculator.dataset.previousKeyType = 'calculate'
        }
    }
});

// const calculate = (n1, operator, n2) => {
//     let result = '';

//     if (operator === 'add') {
//         result = parseFloat(n1) + parseFloat(n2);
//     } else if (operator === 'sub') {
//         result = parseFloat(n1) - parseFloat(n2);
//     } else if (operator === 'mul') {
//         result = parseFloat(n1) * parseFloat(n2);
//     } else if (operator === 'divide') {
//         result = parseFloat(n1) / parseFloat(n2);
//     }

//     return result;
// };


// Above code after refactoring

const calculate = (n1, operator, n2) => {
    const firstNum = parseFloat(n1)
    const secondNum = parseFloat(n2)
    if (operator === 'add') return firstNum + secondNum
    if (operator === 'sub') return firstNum - secondNum
    if (operator === 'mul') return firstNum * secondNum
    if (operator === 'divide') return firstNum / secondNum
  }
