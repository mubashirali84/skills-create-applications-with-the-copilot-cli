const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const path = require("node:path");
const test = require("node:test");

const { calculate } = require("../calculator");
const calculatorPath = path.join(__dirname, "..", "calculator.js");

test("calculates the example operations", () => {
  assert.equal(calculate(2, "+", 3), 5);
  assert.equal(calculate(10, "-", 4), 6);
  assert.equal(calculate(45, "*", 2), 90);
  assert.equal(calculate(20, "/", 5), 4);
});

test("supports decimal and negative operands", () => {
  assert.equal(calculate(-2.5, "+", 0.5), -2);
  assert.equal(calculate(-10, "-", -4), -6);
  assert.equal(calculate(-4, "*", 2.5), -10);
  assert.equal(calculate(7.5, "/", -2.5), -3);
});

test("returns zero for operations whose result is zero", () => {
  assert.equal(calculate(0, "+", 0), 0);
  assert.equal(calculate(4, "-", 4), 0);
  assert.equal(calculate(0, "*", 8), 0);
});

test("rejects division by zero", () => {
  assert.throws(() => calculate(20, "/", 0), {
    message: "Cannot divide by zero.",
  });
});

test("rejects non-finite operands", () => {
  for (const operand of [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]) {
    assert.throws(() => calculate(operand, "+", 1), /finite numbers/);
    assert.throws(() => calculate(1, "+", operand), /finite numbers/);
  }
});

test("rejects unsupported operators", () => {
  assert.throws(() => calculate(2, "%", 3), /Unsupported operation/);
  assert.throws(() => calculate(2, "÷", 3), /Unsupported operation/);
});

test("CLI prints the result for a valid operation", () => {
  const result = spawnSync(process.execPath, [calculatorPath, "2", "+", "3"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 0);
  assert.equal(result.stdout, "5\n");
  assert.equal(result.stderr, "");
});

test("CLI reports missing arguments", () => {
  const result = spawnSync(process.execPath, [calculatorPath, "2", "+"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Usage:/);
});

test("CLI reports division by zero", () => {
  const result = spawnSync(process.execPath, [calculatorPath, "20", "/", "0"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Cannot divide by zero/);
});

test("CLI rejects non-numeric operands", () => {
  const result = spawnSync(process.execPath, [calculatorPath, "not-a-number", "+", "3"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /finite numbers/);
});
