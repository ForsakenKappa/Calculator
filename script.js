const resultBox = document.querySelector('#result');
const numButtns = document.querySelectorAll('.num-butt');
const opButtns  = document.querySelectorAll('.op-butt');

let memory = '';
let isChaining = false;

opButtns.forEach(button => button.addEventListener('click', handleOpButtns))
numButtns.forEach(button => button.addEventListener('click', handleNumButtns));

function handleNumButtns(e){

    if(resultBox.textContent.length > 14) return
    if(parseInt(e.target.value) == 0 && parseInt(resultBox.textContent) == 0) return // parseInt for e.target.value since there is a '00' button

    resultBox.textContent === '0'? resultBox.textContent = e.target.value : resultBox.textContent += e.target.value
    memory += e.target.value

}


// I don't know what I'm doing

function handleOpButtns(e){
    
    let expression = sliceExpressionString(memory);
    console.log(String(expression) + !!expression)
    
    if(expression){
        memory = calculate(expression);
    }

    if(e.target.value === 'c'){
        memory = '';
    }
    else if(e.target.value === '<'){
        memory = memory.slice(0, -1)
    }
    else{

        if(memory.slice(memory.length-1).match(/[-*+/]/g)){
            memory = memory.slice(0,-1)
        }

        e.target.value === '='? memory : memory += e.target.value
    }
        
    resultBox.textContent = memory;
}


function clear(){
    resultBox.textContent = ' ';


}

function sliceExpressionString(input = ''){

    let expression = input.match(/-?(\d+|\d+.\d+)[*+/-](\d+.\d+|\d+)/g);

    return expression? expression[0] : null
}

function calculate(expression){

    return String(eval(expression))


}