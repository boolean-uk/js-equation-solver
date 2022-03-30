z = {
  '+': (c, a) => a + c,
  '*': (c, a) => a * c,
  '/': (c, a) => a / c,
  '-': (c, a) => a - c
}
s = (a, b, f = (n) => n) => {
  a.match(/((^-|(?<=[-(+/*]))-?)?(\.?\d)+|[*-/]/g).map((c) =>
    z[c] ? (f = z[c]) : (b = f(Number(c), b))
  )
  return b
}
e = (c) => {
  for (let n of c) c.match(/\([^()]+\)/g)?.map((a) => {
      (c = c.replace(a, s(a)))
      console.log(c)
    })
  console.log(c)
  return s(c)
}


console.log(e('(1+2)*(3+4)'))