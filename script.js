document.addEventListener("DOMContentLoaded", function() {
    // Calculator state variables
    let displayValue = "0";
    let pendingValue;
    let operator;
    let shouldResetDisplay = false;
  
    // Display the value on the calculator screen
    function updateDisplay() {
      const display = document.getElementById("display");
      display.textContent = displayValue;
    }
  
    // Reset the calculator state
    function resetCalculator() {
      displayValue = "0";
      pendingValue = undefined;
      operator = undefined;
      shouldResetDisplay = false;
    }
  
    // Handle number button clicks
    function inputNumber(number) {
      if (displayValue === "0" || shouldResetDisplay) {
        displayValue = number;
        shouldResetDisplay = false;
      } else {
        displayValue += number;
      }
    }
  
    // Handle operator button clicks
    function inputOperator(clickedOperator) {
      const currentValue = parseFloat(displayValue);
  
      if (operator && shouldResetDisplay) {
        operator = clickedOperator;
        return;
      }
  
      if (pendingValue === undefined) {
        pendingValue = currentValue;
      } else if (operator) {
        const result = performCalculation();
        displayValue = String(result);
        pendingValue = result;
      }
  
      operator = clickedOperator;
      shouldResetDisplay = true;
    }
  
    // Perform the calculation based on the operator
    function performCalculation() {
      const currentValue = parseFloat(displayValue);
  
      switch (operator) {
        case "+":
          return pendingValue + currentValue;
        case "-":
          return pendingValue - currentValue;
        case "*":
          return pendingValue * currentValue;
        case "/":
          return pendingValue / currentValue;
      }
    }
  
    // Handle decimal button click
    function inputDecimal() {
      if (!displayValue.includes(".")) {
        displayValue += ".";
      }
    }
  
    // Handle equals button click
    function calculate() {
      if (pendingValue === undefined || operator === undefined) {
        return;
      }
  
      const currentValue = parseFloat(displayValue);
      const result = performCalculation();
  
      displayValue = String(result);
      pendingValue = currentValue;
      operator = undefined;
      shouldResetDisplay = true;
    }
  
    // Handle clear button click
    function clear() {
      resetCalculator();
    }
  
    // Add click event listeners to calculator buttons
    function addClickListeners() {
      const numbers = document.querySelectorAll(".button:not(#clear):not(#equals)");
      numbers.forEach(function(numberButton) {
        numberButton.addEventListener("click", function() {
          inputNumber(numberButton.textContent);
          updateDisplay();
        });
      });
  
      const operators = document.querySelectorAll(".button[id=add], .button[id=subtract], .button[id=multiply], .button[id=divide]");
      operators.forEach(function(operatorButton) {
        operatorButton.addEventListener("click", function() {
          inputOperator(operatorButton.textContent);
        });
      });
  
      const decimalButton = document.getElementById("decimal");
      decimalButton.addEventListener("click", function() {
        inputDecimal();
        updateDisplay();
      });
  
      const equalsButton = document.getElementById("equals");
      equalsButton.addEventListener("click", function() {
        calculate();
        updateDisplay();
      });
  
      const clearButton = document.getElementById("clear");
      clearButton.addEventListener("click", function() {
        clear();
        updateDisplay();
      });
    }
  
    // Initialize the calculator
    function initializeCalculator() {
      addClickListeners();
      updateDisplay();
    }
  
    // Start the calculator when the DOM is loaded
    initializeCalculator();
  });
  