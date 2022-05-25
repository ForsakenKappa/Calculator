const resultBox = document.querySelector('#result');
const numButtns = document.querySelectorAll('.num-butt');
const opButtns  = document.querySelectorAll('.op-butt');

let memory = '';
let clearFlag = false;
let numOfDigitAfterDecimal = 8;

let decimalPrecision = Math.pow(10, numOfDigitAfterDecimal);

opButtns.forEach(button => button.addEventListener('click', handleOpButtns))
numButtns.forEach(button => button.addEventListener('click', handleNumButtns));

function handleNumButtns(e){

    // 60px - default

    if(adjustResultBoxSize() === 1) return

    if(clearFlag) clear()

    if(parseInt(e.target.value) === 0 && memory.length < 2) memory = '0'; // parseInt for e.target.value since there is a '00' buttonm
    else if(e.target.value === '.' && (memory.match(/\./g) || !memory)) return
    else memory += e.target.value;

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
    resultBox.style.fontSize = '60px';
    clearFlag = false;
}

function handleOpButtns(e){
    
    let expression = sliceExpressionString(memory);
    console.log(String(expression) + !!expression)
    
    if(e.target.value === 'c' || clearFlag){
        clear()
    }
    else if(e.target.value === '<'){
        memory = memory.slice(0, -1)
    }
    else if(e.target.value === '+/-'){
        memory = String(memory * -1);
    }
    else if(expression){
        memory = calculate(expression);
        adjustResultBoxSize()
    }
    else{

        if(memory.slice(memory.length-1).match(/[-*+/]/g)) memory = memory.slice(0,-1)
        e.target.value === '='? memory : memory += e.target.value
    }
        
    resultBox.textContent = memory;
}

function sliceExpressionString(input = ''){

    let expression = input.match(/-?(\d+|\d+.\d+)[*+/-](\d+.\d+|\d+)/g);

    return expression? expression[0] : null
}

function makeWittyComment(){

    clearFlag = true;
    let choice = Math.floor(Math.random() * 5)

    switch(choice){
        case 0: return 'Division by zero detected'
        case 1: return 'You did... what?'
        case 2: return 'Oh no... Division by zero'
        case 3: return 'Why would you do that?'
        case 4: return 'I was a young mathematician like you. Then I divided by 0'
    }
}

function calculate(expression){

    let result = eval(expression)

    if(result === Infinity || isNaN(result)) result = makeWittyComment();
    else result = String(Math.round( result * decimalPrecision) / decimalPrecision);

    return result
    
}