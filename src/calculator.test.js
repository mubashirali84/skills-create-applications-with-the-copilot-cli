const assert = require("node:assert/strict");
const test = require("node:test");

const { calculate } = require("./calculator");

test("adds two numbers", () => {
  assert.equal(calculate(7, "+", 8), 15);
});

test("subtracts two numbers", () => {
  assert.equal(calculate(8, "-", 3), 5);
});

test("multiplies two numbers", () => {
  assert.equal(calculate(4, "*", 6), 24);
});

test("divides two numbers", () => {
  assert.equal(calculate(9, "/", 3), 3);
});

test("rejects division by zero", () => {
  assert.throws(() => calculate(1, "/", 0), /Cannot divide by zero/);
});

test("rejects non-finite operands", () => {
  assert.throws(() => calculate(Number.NaN, "+", 1), /finite numbers/);
});

test("rejects unsupported operations", () => {
  assert.throws(() => calculate(2, "÷", 3), /Unsupported operation/);
});
