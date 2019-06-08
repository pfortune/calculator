document.addEventListener('DOMContentLoaded', () => {

    const display = document.querySelector(".display");
    let previousOperator = null;
    let buffer = "0";
    let runningTotal = 0;

    document.querySelector(".calculator").addEventListener("click", e => {
        buttonClick(e.target.value);
    });

    function buttonClick(value) {
        if (isNaN(value)) {
            handleSymbol(value);
        } else {
            handleNumber(value);
        }

        refreshDisplay(buffer);
    }

    function handleSymbol(symbol) {
        switch (symbol) {
            case "c":
                buffer = "0";
                runningTotal = 0;
                previousOperator = null;
                break;
            case "d":
                deleteNumber();
                break;
            case "equals":
                if (previousOperator === null) {
                    return;
                }
                handleMath(parseInt(buffer));
                previousOperator = null;
                buffer = "" + runningTotal;
                console.log(buffer);
                runningTotal = 0;
                break
            default:
                handleOperator(symbol);
                break;
            
        }
    }

    function handleNumber(value) {
        if (buffer === "0") {
            buffer = value;
        } else {
            buffer += value;
        }
    }

    function refreshDisplay(value) {
        display.value = value;
    }

    function deleteNumber() {
        if(buffer.length === 1){
            buffer = "0";
        } else {
            buffer = buffer.substring(0, buffer.length - 1);
        }
        
    }

    function handleOperator(operator) {

        if(buffer === "0"){
            return;
        }
        
        const intBuffer = parseInt(buffer);

        if(runningTotal === 0){
            runningTotal = intBuffer;
        } else {
            handleMath(intBuffer);
        }

        previousOperator = operator;
        
        buffer = "0";
    }

    function handleMath(intBuffer){


        if(previousOperator === "add"){
            runningTotal += intBuffer;
        } else if(previousOperator === "subtract"){
            runningTotal -= intBuffer;
        } else if(previousOperator === "multiply"){
            runningTotal *= intBuffer;
        } else {
            runningTotal /= intBuffer;
        }
    }

});