const EquationSolver = require('../src/equationsolver')

describe('EquationSolver', () => {
  let solver = null
  
  beforeEach(() => {
    solver = new EquationSolver()
  })

  it('should parse and detect addition', () => {
    // setup
    const expected = 5
    // execute
    const result = solver.solve("2+3")
    // verify
    expect(result).toEqual(expected)
  })
})