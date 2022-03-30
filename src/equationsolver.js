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
   * This isn't the best solution but is the shortest one.
   */

  constructor() {
    this.operations = {
      '+': (c, a) => a + c,
      '*': (c, a) => a * c,
      '/': (c, a) => a / c,
      '-': (c, a) => a - c,
      '^': (c, a) => Math.pow(a, c)
    }
    this.OPERATOR_REGEX = /((^-|(?<=[\W]))-?)?(\.?\d(e[+-])?)+|[-*^+/]/g
    this.GROUP_REGEX = /\([^()]+\)/g
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
  calculate(operation, Fn = (n) => n) {
    operation.match(this.OPERATOR_REGEX).map((char) => {
      (this.operations[char] && (Fn = this.operations[char])) ||
        (operation = Fn(Number(char), operation || 0))
    })
    return operation
  }

  /**
   * Reduces the given equation to a simples equations.
   * Removing parenthesis and grouping operations using REGEX.
   * 10+(2*3) => ["10+", "2*3"] => 10+6 => 16
   * 10+6 (Simplest form of the full operation) will be calculated on the return of the function.
   */
  solve(equation) {
    while (equation.match(this.GROUP_REGEX)) {
      equation = equation.replace(this.GROUP_REGEX, (group) =>
        this.calculate(group)
      )
    }

    return this.calculate(equation)
  }
}

console.log(new EquationSolver().solve('-539+(20-10)+20'))
console.log(
  new EquationSolver().solve(
    '((((378-(209*-959))+204+(231--297)/((598/(-348*-744))-191+(-427/-918))/(222*(-530--977)+(710*-245+8))*(671-39*-678-(98/-718)--390/-45))*((((8-(326*264))*683+(-3*-117))/(-148-52-921+-984-(451/204)))+(-665+128/-165/268*227*-572+(-668-796--969)/-372+-829/937*287)))*((-348-(-310/189)/(569-(438/-849))-((903/(662+730))+(247/(-792+411))))-((-60/-521+767)+497*-572-66*(-597+695*-650)-((431*927)/613-347)))*-200+277*-27-(-597*(-155+942))*530--800+-189+-598+(359+-562)+((151/888+200)--461*609*56-((739+144+469)+((-565-239)--482+985))))'
  )
)

module.exports = EquationSolver
