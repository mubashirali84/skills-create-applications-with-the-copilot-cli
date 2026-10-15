#!/usr/bin/env node

// Supported operations: addition (+), subtraction (-), multiplication (*),
// division (/), modulo (%), exponentiation (^ or **), and square root (sqrt).
function validateFiniteOperands(...operands) {
  if (!operands.every(Number.isFinite)) {
    throw new Error("Operands must be finite numbers.");
  }
}

function modulo(a, b) {
  validateFiniteOperands(a, b);
  if (b === 0) {
    throw new Error("Cannot calculate modulo with zero.");
  }
  return a % b;
}

function power(base, exponent) {
  validateFiniteOperands(base, exponent);
  return base ** exponent;
}

function squareRoot(n) {
  validateFiniteOperands(n);
  if (n < 0) {
    throw new Error("Cannot calculate the square root of a negative number.");
  }
  return Math.sqrt(n);
}

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
    case "%":
      return modulo(firstValue, secondValue);
    case "^":
    case "**":
      return power(firstValue, secondValue);
    default:
      throw new Error(`Unsupported operation "${operator}". Use +, -, *, /, %, ^, or **.`);
  }
}

function main(args) {
  if (args.length === 2 && args[0] === "sqrt") {
    const valueInput = args[1];
    if (valueInput.trim() === "") {
      console.error("The operand must be a finite number.");
      process.exitCode = 1;
      return;
    }

    try {
      console.log(squareRoot(Number(valueInput)));
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    }
    return;
  }

  if (args.length !== 3) {
    console.error(
      "Usage: node src/calculator.js <number> <+|-|*|/|%|^|**> <number>\n" +
        "   or: node src/calculator.js sqrt <number>",
    );
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

module.exports = { calculate, modulo, power, squareRoot };
