const resultBox = document.querySelector('#result');
const numButtns = document.querySelectorAll('.num-butt');
const opButtns  = document.querySelectorAll('.op-butt');

let operand = '';
let memory = '';
let clearFlag = false;
let allowDecimal = true;
let numOfDigitAfterDecimal = 8;

let decimalPrecision = Math.pow(10, numOfDigitAfterDecimal);

opButtns.forEach(button => button.addEventListener('click', (e) => handleOperators(e.target.value)))
numButtns.forEach(button => button.addEventListener('click', (e) => handleNumbers(e.target.value)));

document.addEventListener('keypress', handleNumPadButtns)

function handleNumPadButtns(e){
    
    if(e.key === 'c') handleOperators('c');
    if(e.key === 'd') handleOperators('<');

    if(!e.code.match(/Numpad/g)) return
    switch(e.key){
        case "+":
        case '-':
        case '*':
        case '/':
        case 'Enter':
            handleOperators(e.key);
            break
        default:
            handleNumbers(e.key);
    }
}

function handleNumbers(input = ''){

    if(adjustResultBoxSize() === 1 || operand.length > 12) return

    if(clearFlag) clear()

    if(parseInt(input) === 0 && (parseFloat(operand) === 0 || !operand)) { // parseInt for input since there is a '00' buttonm
        operand = '0'; 
    }
    else if(input === '.' ){
        if ((operand.match(/\./g))) return
        !operand? operand += '0.' :
                 operand += input;
    } 
    else {
        operand === '0'? operand = input:
                        operand += input;
    }

    resultBox.textContent = operand;
}

function handleOperators(operator = ''){

    memory += operand;
    operand = '';

    expression = sliceExpressionString(memory);
    
    if(expression){
        memory = calculate(expression);
        if (!clearFlag) handleOperators(operator);
        adjustResultBoxSize()
    }
    else if(operator === 'c' || clearFlag){
        clear()
    }
    else if(operator === '<'){
        memory = memory.slice(0, -1)
    }
    else if(operator === '+/-'){
        memory = String(memory.match(/-?(\d+.\d+|\d+)/g)[0] * -1);
    }
    else{

        if(memory.slice(memory.length-1).match(/[-*+/]/g)) memory = memory.slice(0,-1) 
        operator === '=' || operator === 'Enter'? memory : memory += operator
    }
        
    resultBox.textContent = memory;
    
}

function adjustResultBoxSize(){

    if(memory.length > 30 && memory.length < 80) resultBox.style.fontSize = '16px';
    else if(memory.length > 26) return 1
    else if (memory.length > 17) resultBox.style.fontSize = '32px';
    else if(memory.length > 12) resultBox.style.fontSize = '48px';
}

function clear(){
    memory = '';
    operand = '';
    resultBox.style.fontSize = '60px';
    clearFlag = false;
}


function sliceExpressionString(input = ''){

    let expression = input.match(/-?(\d+|\d+.\d+)[*+/-](\d+.\d+|\d+)/g);

    return expression? expression[0] : null
}

function makeWittyComment(){

    clearFlag = true;
    let choice = Math.floor(Math.random() * 12)

    switch(choice){
        case 0: return 'Division by zero detected'
        case 1: return 'You did... what?'
        case 2: return 'Oh no... Division by zero'
        case 3: return 'Why would you do that?'
        case 4: return 'I was a young mathematician like you. Then I divided by 0'
        case 5: return 'Div by zero? Wacky'
        case 6: return 'Nope'
        case 7: return 'I\'m in you walls :p'
        case 8: return 'Nani?'
        case 9: return 'This division by zero was sponsored by Tom Clancy\'s: The Division'
        case 10: return 'Got any... uhh... integers (o u o) ?'
        case 11: return 'Wanna play minecraft? |- u - |"'

    }
}

function calculate(expression){

    let result = eval(expression)

    if(result === Infinity || isNaN(result)) result = makeWittyComment();
    else result = String(Math.round( result * decimalPrecision) / decimalPrecision);

    return result
    
}