class EquationSolver {
  /**
   * This class solves simple math equations.
   * it does NOT use PEMDAS !
   * It doesn't use eval() or anything like that.
   * This code is an extension of the solution I had for a CodeWars kata.
   * URL : https://www.codewars.com/kata/5b05a8dd91cc5739df0000aa
   *
   * Part of this could be refactored to use proper variables declarations (calculate method)
   * instead of using params to store data. But I thought it would be nice to see that it is possible to
   * shorten the code but still make it readable.
   *
   * This isn't the best solution but is the shortest one. (With linted code)
   */

  constructor() {
    this.operations = {
      '+': (c, a) => a + c,
      '*': (c, a) => a * c,
      '/': (c, a) => a / c,
      '-': (c, a) => a - c,
      '^': (c, a) => a ** c
    }
    this.OPERATOR_REGEX = /((^-|(?<=[\W]))-?)?(\.?\d(e[+-])?)+|[-*^+/]/g
    this.GROUP_REGEX = /\([^()]+\)/g
  }

  /**
   * Calculates the given equation.
   * In case there's a group of operations, it will be calculated first.
   * The memory key is use to pass retained data from one calculation to the next.
   * The operationFn key is used to pass the function to be used for the next calculation. (e.g. +, -, *, /)
   * @param {string} operation - The simplified equation.
   * @constant {object} memory - The memory object.
   * @constant {string} operationFn - The function to be used for the next calculation.
   */
  calculate(operation) {
    let operationFn
    let memory
    operation.match(this.OPERATOR_REGEX).forEach((char) => {
      if (this.operations[char]) operationFn = this.operations[char]
      else if (operationFn) memory = operationFn(Number(char), memory || 0)
      else memory = Number(char)
    })
    return memory
  }

  /**
   * Reduces the given equation to a simples equations.
   * Removing parenthesis and grouping operations using REGEX.
   * 10+(2*3) => ["10+", "2*3"] => 10+6 => 16
   * 10+6 (Simplest form of the full operation) will be calculated on the return of the function.
   */
  solve(equation) {
    while (equation.match(this.GROUP_REGEX))
      equation = equation.replace(this.GROUP_REGEX, (group) =>
        this.calculate(group)
      )

    return this.calculate(equation)
  }
}

module.exports = EquationSolver
