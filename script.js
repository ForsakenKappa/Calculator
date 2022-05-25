const resultBox = document.querySelector('#result');
const numButtns = document.querySelectorAll('.num-butt');
const opButtns  = document.querySelectorAll('.op-butt');

let memory = '';

opButtns.forEach(button => button.addEventListener('click', handleOpButtns))
numButtns.forEach(button => button.addEventListener('click', handleNumButtns));

function handleNumButtns(e){

    if(memory.length > 12) return

    if(parseInt(e.target.value) === 0 && memory.length < 2){ // parseInt for e.target.value since there is a '00' button
        memory = '0';
    } else if(e.target.value === '.' && (memory.match(/\./g) || !memory)){
        return
    } else {
        memory += e.target.value
    }


    resultBox.textContent = memory;

}


// I don't know what I'm doing

function handleOpButtns(e){
    
    let expression = sliceExpressionString(memory);
    console.log(String(expression) + !!expression)
    
    
    if(e.target.value === 'c'){
        memory = '';
    }
    else if(e.target.value === '<'){
        memory = memory.slice(0, -1)
    }
    else if(expression){
        memory = calculate(expression);
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