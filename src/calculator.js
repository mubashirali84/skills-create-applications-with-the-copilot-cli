#!/usr/bin/env node

// Supported operations: addition (+), subtraction (-), multiplication (*), and division (/).
function calculate(firstValue, operator, secondValue) {
  if (!Number.isFinite(firstValue) || !Number.isFinite(secondValue)) {
    throw new Error("Both operands must be finite numbers.");
  }

  switch (operator) {
    case "+":
      return firstValue + secondValue;
    case "-":
      return firstValue - secondValue;
    case "*":
      return firstValue * secondValue;
    case "/":
      if (secondValue === 0) {
        throw new Error("Cannot divide by zero.");
      }
      return firstValue / secondValue;
    default:
      throw new Error(`Unsupported operation "${operator}". Use +, -, *, or /.`);
  }
}

function main(args) {
  if (args.length !== 3) {
    console.error("Usage: node src/calculator.js <number> <+|-|*|/> <number>");
    process.exitCode = 1;
    return;
  }

  const [firstInput, operator, secondInput] = args;
  if (firstInput.trim() === "" || secondInput.trim() === "") {
    console.error("Both operands must be finite numbers.");
    process.exitCode = 1;
    return;
  }

  const firstValue = Number(firstInput);
  const secondValue = Number(secondInput);

  try {
    console.log(calculate(firstValue, operator, secondValue));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main(process.argv.slice(2));
}

module.exports = { calculate };
