class EquationSolver {
/**
 * This class solves simple math equations.
 * it does NOT use PEMDAS ! 
 * It doesn't use eval() or anything like that. 
 */
  constructor() {
    this.operations = {
      '+': (c, a) => a + c,
      '*': (c, a) => a * c,
      '/': (c, a) => a / c,
      '-': (c, a) => a - c
    }
    this.OPERATOR_REGEX = /((^-|(?<=[-(+/*]))-?)?(\.?\d)+|[*-/]/g;
    this.GROUP_REGEX = /\([^()]+\)/g;
  }

  /** 
   * Calculates the given equation.
   * In case there's a group of operations, it will be calculated first.
   * The memory key is use to pass retained data from one calculation to the next.
   * The Fn key is used to pass the function to be used for the next calculation. (e.g. +, -, *, /)
   * @param {string} operation - The simplified equation.
   * @param {object} memory - The memory object.
   * @param {string} Fn - The function to be used for the next calculation.
  */
  calculate(operation, memory, Fn = (n) => n) {
    operation.match(this.OPERATOR_REGEX).map((char) => {
      this.operations[char]
        ? (Fn = this.operations[char])
        : (memory = Fn(Number(char), memory))
    })
    return memory
  }

  /**
   * Reduces the given equation to a simples equations.
   * Removing parenthesis and grouping operations using REGEX.
   * 10+(2*3) => ["10+", "2*3"] => 10+6 => 16
   */
  solve(equation) {
    while (equation.includes('(') || equation.includes(')'))
      equation
        .match(this.GROUP_REGEX)
        ?.map(
          (part) => (equation = equation.replace(part, this.calculate(part)))
        )

    return this.calculate(equation)
  }
}

module.exports = EquationSolver
