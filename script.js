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

    switch(e.target.value){
        case 'c':
            clear();
            break
        case '+':
            memory +=  '+';
            resultBox.textContent += '+';
            break
        case '=':
            memory = calculate(memory);
            displayResults()
            break;
            
    }

}

function clear(){
    resultBox.textContent = '0';
    memory = '';

}

function displayResults(){
    resultBox.textContent = memory;
}

function calculate(input = ''){

    console.log(input);

    let regExpOp = /[+\-*/]/g

    let numbers = input.split(regExpOp);
    let operator = input.match(regExpOp);


    let a = parseInt(numbers[0]);
    let b = parseInt(numbers[1]);
    let op = operator[0];

    console.log(`A = ${a}`)
    console.log(`B = ${b}`)
    console.log(`Operation = ${op}`)

    console.log(`Doing ${a}${op}${b}`)
    
    switch(op){
        case '+':
            return (a + b)
    }



}