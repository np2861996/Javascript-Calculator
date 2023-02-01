//For select Calculator div
const calculator = document.querySelector('.calculator');

//For select calculator__keys div
const keys = calculator.querySelector('.calculator__keys');

//For select calculator__display div and show input numbers or calculated numbers
const display = document.querySelector('.calculator__display');


//trigger when key is pressed in calculator__keys div
keys.addEventListener('click', e => {

    //if button is pressed
    if(e.target.matches('button')){

        //const for get and set values
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayNumber = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        //if data-action is not available it will trigger 
        if(!action){
            if(displayNumber === '0'){
                display.textContent = keyContent;
            }
            else
            {
                display.textContent = displayNumber + keyContent;
            }
        }

        //if data-action is 'decimal' it will trigger 
        if(action === 'decimal'){
            display.textContent = displayNumber + '.';
        }

        //if data-action is 'add' or 'subtract' or 'multiply' or 'divide'  it will trigger
        if(action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide'){

            //on click 'is-depressed' class will added
            key.classList.add("is-depressed");
            // Add custom attribute
            calculator.dataset.previousKeyType = 'operator';

        }

        // Remove .is-depressed class from all keys
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));

        //if data-action is not available or previous key type is 'operator' it will trigger 
        if(!action){    
            if(displayNumber === '0' || previousKeyType === 'operator'){
                display.textContent = keyContent; 
            }
            else
            {
                display.textContent = displayNumber + keyContent;
            }
        }

        //function for calculation
        const calculate = (n1, operator, n2) => {
            let result = '';
            if (operator === 'add') {
                //parseFloat for convert to float
                result = parseFloat(n1) + parseFloat(n2);
            } else if (operator === 'subtract') { 
                //parseFloat for convert to float    
                result = parseFloat(n1) - parseFloat(n2);   
            } else if (operator === 'multiply') {
                //parseFloat for convert to float
                result = parseFloat(n1) * parseFloat(n2);
            } else if (operator === 'divide') {
                //parseFloat for convert to float
                result = parseFloat(n1) / parseFloat(n2);
            }
            return result;
        };
       
        //if data-action is 'add' or 'subtract' or 'multiply' or 'divide'  it will trigger
        if(action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide'){
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayNumber;

            //check first number and oprator
            if(firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate' ){
                 const calcValue = calculate( firstValue, operator, secondValue );
                 display.textContent = calcValue;
                 // Update calculated value as firstValue
                 calculator.dataset.firstValue = calcValue;
            }
            else
            {
                // If there are no calculations, set displayedNum as the firstValue
                calculator.dataset.firstValue = displayNumber;
            }

            if (firstValue && operator && previousKeyType !== 'operator') {
                display.textContent = calculate(firstValue, operator, secondValue);
            }

            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.operator = action;
        }

        //if = is presed
        if( action === 'calculate' ){
            
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            let secondValue = displayNumber;

            if(firstValue){
                if(previousKeyType === 'calculate'){
                     //change first and second value for the calculation on multiple click on = based upon last value.
                     firstValue = displayNumber;
                     secondValue = calculator.dataset.modValue;
                }

                display.textContent = calculate(firstValue, operator, secondValue);
            }

            // Set modValue attribute
            calculator.dataset.modValue = secondValue;
            calculator.dataset.previousKeyType = 'calculate';
        }

        if(!action){
            calculator.dataset.previousKey = 'number';
        }

        //if value is decimal like 1.2 
        if(action === 'decimal'){
            if(!displayNumber.includes('.')){
                display.textContent = displayNumber + '.';
            }
            else if(previousKeyType === 'oparator' || previousKeyType === 'calculate'){
                display.textcontent = '0.';
            }
            
            calculator.dataset.previousKey = 'decimal';
        }

        //if we click of All clear aka ac
        if(action === 'clear'){

            if(key.textContent === 'AC'){
                calculator.dataset.firstValue = '';
                calculator.dataset.modValue = '';
                calculator.dataset.operator = '';
                calculator.dataset.previousKeyType = '';
            }
            else
            {
                key.textContent = 'AC';
            }

            display.textContent = 0;
            calculator.dataset.previousKeyType = 'clear';

        }

        //when pressed on = key
        if(action === 'calculate'){
            calculator.dataset.previousKeyType = 'calculate';
        }

        //check if displyed number is 0 or previous key type is operator or previous key type is = key.
        if(!action){

            if( displayNumber === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate'){

                display.textContent = keyContent;

            }
            else
            {
                display.textContent = displayNumber + keyContent;
            }

            calculator.dataset.previousKeyType = 'number';

        }

        //change AC to CE
        if(action !== 'clear'){
            const clearButton = calculator.querySelector('[data-action=clear]');
            clearButton.textContent = 'CE';
        }


    }

});


