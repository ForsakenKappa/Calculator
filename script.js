const resultBox = document.querySelector('#result');
const numButtns = document.querySelectorAll('.num-butt');
const opButtns  = document.querySelectorAll('.op-butt');

let memory = [];

opButtns.forEach(button => button.addEventListener('click', handleOpButtns))
numButtns.forEach(button => button.addEventListener('click', handleNumButtns));

console.log('Hello')

function handleNumButtns(e){
    if(resultBox.textContent.length > 14) return
    if(parseInt(e.target.value) == 0 && parseInt(resultBox.textContent) == 0) return // parseInt for e.target.value since there is a '00' button

    resultBox.textContent == '0'? resultBox.textContent = e.target.value : resultBox.textContent += e.target.value;
}
function handleOpButtns(e){
    switch(e.target.value){
        case 'c':
            resultBox.textContent = '0';
    }
}
