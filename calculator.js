const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display')
 
keys.addEventListener('click', e => {

    if(e.target.matches('button')){
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayNumber = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        if (!action) {
            console.log('number key!')
        }

        if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
        ) {
        console.log('operator key!')
        }

        if (action === 'decimal') {
            console.log('decimal key!')
          }
          
          if (action === 'clear') {
            console.log('clear key!')
          }
          
          if (action === 'calculate') {
            console.log('equal key!')
          }

        if(!action){
            if(displayNumber === '0'){
                display.textContent = keyContent;
            }
        }

       if(!action){
            if(displayNumber === '0')
            {
                display.textContent = keyContent;
            }
            else
            {
                display.textContent = displayNumber + keyContent;
            }
        }

        if(action === 'decimal'){

            display.textContent = displayNumber + '.';

        }

        if(action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide'){

            key.classList.add("is-depressed");
            // Add custom attribute
            calculator.dataset.previousKeyType = 'operator'

        }

        // Remove .is-depressed class from all keys
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));

        console.log(previousKeyType);

        if(!action){    
            if(displayNumber === '0' || previousKeyType === 'operator'){
                display.textContent = keyContent 
            }
            else
            {
                display.textContent = displayNumber + keyContent;
            }
        }

       

       
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

            if (
                firstValue &&
                operator &&
                previousKeyType !== 'operator'
              ) {

                
                display.textContent = calculate(firstValue, operator, secondValue)
              }



            key.classList.add('is-depressed');

                calculator.dataset.previousKeyType = 'operator';
                calculator.dataset.operator = action

            
        }

        const calculate = (n1, operator, n2) => {

            let result = '';

            if (operator === 'add') {
                result = parseFloat(n1) + parseFloat(n2);
            } else if (operator === 'subtract') {     
                result = parseFloat(n1) - parseFloat(n2);
               
            } else if (operator === 'multiply') {
                result = parseFloat(n1) * parseFloat(n2);
            } else if (operator === 'divide') {
                result = parseFloat(n1) / parseFloat(n2);
            }

            return result;

        }

        if( action === 'calculate' ){
            
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            //display.textContent = keyContent;
            let secondValue = displayNumber;

            if(firstValue){
                if(previousKeyType === 'calculate'){
                   
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

        if(action === 'decimal'){

            if(!displayNumber.includes('.')){
                display.textContent = displayNumber + '.'
            }
            else if(previousKeyType === 'oparator' || previousKeyType === 'calculate'){
                display.textcontent = '0.'
            }

            calculator.dataset.previousKey = 'decimal';

        }

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

        if(action === 'calculate'){

            calculator.dataset.previousKeyType = 'calculate';

        }

        if(!action){

            if( displayNumber === 0 || previousKeyType === 'operator' || previousKeyType === 'calculate'){

                display.textContent = keyContent;

            }
            else
            {
                display.textContent = displayNum + keyContent;
            }

            calculator.dataset.previousKeyType = 'number'

        }

        if(action !== 'clear'){

            const clearButton = calculator.querySelector('[data-action=clear]');
            clearButton.textContent = 'CE';

        }


    }

});


