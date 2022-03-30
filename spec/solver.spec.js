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

  it('should parse and detect multiplication', () => {
    // setup
    const expected = 6
    // execute
    const result = solver.solve("2*3")
    // verify
    expect(result).toEqual(expected)
  })

  it('should parse and detect division', () => {
    // setup
    const expected = 2
    // execute
    const result = solver.solve("4/2")
    // verify
    expect(result).toEqual(expected)
  })

  it('should parse and detect subtraction', () => {
    // setup
    const expected = 2
    // execute
    const result = solver.solve("4-2")
    // verify
    expect(result).toEqual(expected)
  })

  it('should parse and detect multiple operations', () => {
    // setup
    const expected = 20
    // execute
    const result = solver.solve("2+3*4")
    // verify
    expect(result).toEqual(expected)
  })

  it('should parse and detect multiple operations with parentheses', () => {
    // setup
    const expected = 45
    // execute
    const result = solver.solve("2+3*(4+5)")
    // verify
    expect(result).toEqual(expected)
  })

  it('solves more complicated equations', () => { 
    expect(solver.solve("2*-3")).toEqual(-6);
    expect(solver.solve("2--3")).toEqual(5);
    expect(solver.solve("2*3*4*5+99")).toEqual(219);
    expect(solver.solve("2*3*4*5+99*321-12312312")).toEqual(-12242013);
    expect(solver.solve("1-2*2/2*2-1*7+3")).toEqual(-18);
    expect(solver.solve("1*3-(7/1*3-9+1*4/8*9-9)*12+213")).toBeCloseTo(-345);
  })
})