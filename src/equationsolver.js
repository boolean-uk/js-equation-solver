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


  calculate(operation, memory, Fn = (n) => n) {
    operation.match(this.OPERATOR_REGEX).map((char) => {

      this.operations[char]
        ? (Fn = this.operations[char])
        : (memory = Fn(Number(char), memory))
    })
    return memory
  }

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
