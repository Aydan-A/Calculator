let Resultdisplay = document.querySelector(".maindisplay");
let sequenceOfOperations = document.querySelector(".sequenceOfOperations");
let AllbuttonsContainer = document.querySelector(".buttons-grid");

let currentValue = "";
let previousValue = "";
let operator = "";
let equalsPressed = false;

function calculate(prev, curr, operator) {
  prev = parseFloat(prev);
  curr = parseFloat(curr);

  switch (operator) {
    case "+":
      return prev + curr;
    case "-":
      return prev - curr;
    case "*":
      return prev * curr;
    case "/":
      return prev / curr;
    case "%":
      return prev * (curr / 100);
    default:
      return curr;
  }
}

AllbuttonsContainer.addEventListener("click", function (e) {
  let el = e.target;
  let elText = el.innerHTML;
  console.log(elText);

  if (isFinite(elText) || elText === ".") {
    if (equalsPressed) {
      // Reset if equals was pressed previously
      currentValue = "";
      equalsPressed = false;
    }
    currentValue += elText;
    Resultdisplay.value = currentValue;
  } else if (
    elText !== "=" &&
    elText !== "del" &&
    elText !== "C" &&
    elText !== "√x"
  ) {
    if (currentValue !== "") {
      operator = elText;
      previousValue = currentValue;
      sequenceOfOperations.value = previousValue + " " + operator;
      currentValue = "";
      equalsPressed = false;
    }
  } else if (elText === "=") {
    if (previousValue !== "" && currentValue !== "" && operator !== "") {
      let result = calculate(previousValue, currentValue, operator);
      sequenceOfOperations.value =
        previousValue + " " + operator + " " + currentValue;
      currentValue = result;
      Resultdisplay.value = result;
      operator = "";
      equalsPressed = true;
    } else if (operator !== "√x") {
      Resultdisplay.value = "Something is missed";
    }
  } else if (elText === "del") {
    if (currentValue.length > 0) {
      currentValue = currentValue.slice(0, -1); // Remove the last character
      Resultdisplay.value = currentValue;
    }
  } else if (elText === "C") {
    clearAll();
  } else if (elText === "√x" || elText === "√") {
    // operator = elText;
    if (currentValue.length > 0 || equalsPressed) {
      let num = parseFloat(currentValue);
      if (num >= 0) {
        let root = Math.sqrt(num);
        sequenceOfOperations.value = `√${currentValue}`;
        Resultdisplay.value = root;
        currentValue = root.toString();
        equalsPressed = false;
        operator = "";
      } else {
        Resultdisplay.value = "invalid";
      }
    }
  }
});

function clearAll() {
  Resultdisplay.value = "";
  sequenceOfOperations.value = "";
  currentValue = "";
  previousValue = "";
  operator = "";
}
