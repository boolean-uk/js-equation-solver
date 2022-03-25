# Equation Solver

In this challenge you are tasked with writing a mathematical equation solver. The solver accepts a mathematical equation in the form of a string and solves it returning the result. 

Example:

```js
const solver = new EquationSolver()
const solution = solver.solve("3+5/2")
console.log(solution) // 5.5
```

Some things to think about:
- consider how you're going to parse the equation (convert the string into some data types that make it easy to find a solution)
- consider what data types (classes, objects, or other) you'd want to use to represent your parsed equation. Ie. how will you represent numbers, operations, brackets, etc.
- consider how you'll solve the equation

## Part 1: solving basic arithmetic operations

The equation solver should be able to handle equations that include `+`, `-`. `/` and `*` operations.

It should respect the correct order of operations (multiplications and divisions before additions and subtractions).

It should be able to solve any length of equation, without limits on how many numbers/operations should be in the string. Examples: short equations `3+5` or longer ones like `6-7*5/8+4-3/8+16*129`

It should return a number if the equation has just a number and no operations: `solver.solve('18')` should return the number `18`.

It should return an error / throw an error if the equation cannot be solved. Here are some error conditions to implement:

- the equation is empty
- the equation just has operation symbols and no numbers `+-`
- two operation symbols appear next to each other such as `*/`, but not if the operation is a `+` or `-` which indicates the sign of a number eg: `3*-2` should be valid, giving a result of `-6` (see Part 2)
- the equation contains characters/symbols that cannot be parsed `y+x`, for example.

## Part 2: supporting decimal numbers, negative numbers and exponentials

Your solver should be able to handle decimal numbers in any of these formats:

- `equation="2.3+3" // 5.3`
- `equation="0.3+3" // 3.3`
- `equation=".3+3*.5" // 1.8`

Your solver should be able to handle negative numbers in the operations:

- `equation="2*-3" // -6`

Your solver should be able to compute exponetials: x to the power of y:

- `2^3 = 8`
- `2^-1 = 0.5`

## Part 3: nested equations - supporting brackets

Your solver should be able to handle brackets, which can be thought of nested equations: equations inside other equations. 

The solver should solve the inner-most equations first all the way to the outer ones. 

The solver should automatically add `*` between two groups of brackets: `(2+3)(3+4)` should be the equivalent of `(2+3)*(3+4)`

The solver should handle converting a nested equation to a negative result: `3+-(2+3)` should give `-2` as a result.

Your solver should throw/return an error if the open and closed brackets don't match: `3+(2-(8)` or a close bracket is closed before it should: `3+2-8)`

Your solver should handle exponentials with a nested equation after the `^` symbol.

Examples:

- `3+(2*6)` 
- `(2)-(3)`
- `2(3/6)` - you should handle treating this case as if there is a `*` after the `2`
- `(2/7)+(8-6)`
- `((2/7) + 5)+(8-6)`
- `(((2/7) + 5)+(8-6)(7/9))`

Example nested exponentials:
- `2^(1+2)` which is the same as `2^3`
- `2^-(2-1)` which is the same as `2^-1` which is 0.5

## Part 4: add support for special mathematical functions & constants

In maths we sometimes need to represent constants, such as `PI=3.14159` or `e=2.71828`.

Your equation solvers should detect and replace constants: `PI*3*3` should be treated as `3.14159*3*3=28.36`

In maths we have special functions like `log`, `ln`, `sin`, `cos`, `tan` and so on. Add support in your solver to detect these functions and apply the correct solution to them. Examples:

- `3+sin(12)=2.4634...`
- `log(3/2)=0.176...`

## Part 5: write a function that prints out each step that takes you to the solution:

Example code:

```js
const solver = new EquationSolver()
solver.printSteps("3+5*(3-4)")
// output could be:
= 3 + 5 * (3 - 4)
= 3 + 5 * (-1)
= 3 - 5
= -2
```

# Challenge 1: use trees to represent nested equations

If you haven't used a tree to represent each part of the equation, consider refactoring your code to use this data structure. Each symbol in the equation could be a node at the current level of the tree, as soon as you encounter a nested equation within `()`, then that starts a new branch. This might make it easy for you to solve the equation by solving the outmost branches first, until you reach the root.
