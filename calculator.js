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
    case "√x ":
      return Math.sqrt(curr);
    default:
      return curr;
  }
}

AllbuttonsContainer.addEventListener("click", function (e) {
  let el = e.target;
  let elText = el.innerHTML;

  if (isFinite(elText) || elText === ".") {
    currentValue += elText;
    Resultdisplay.value = currentValue;
  } else if (elText !== "=" && elText !== "del" && elText !== "C") {
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
      equalsPressed = true;
    }
  } else if (elText === "del") {
    if (currentValue.length > 0) {
      currentValue = currentValue.slice(0, -1); // Remove the last character
      Resultdisplay.value = currentValue;
    }
  } else if (elText === "C") {
    clearAll();
  }
});

function clearAll() {
  Resultdisplay.value = "";
  sequenceOfOperations.value = "";
  currentValue = "";
  previousValue = "";
  operator = "";
}
