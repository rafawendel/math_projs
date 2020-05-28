// Calculates the expected value for N rolls of J-faces dice dropping the M lowest "advantage" (true) or M highest "disadvange" rolls (false)
function calculateExpectedValue(n, j, m, type = true) {
  if (n < 0 || j < 0 || m < 0) throw 'No negative values, smart-ass';
  if (j == 0) throw 'You cannot roll a 0-faced die, there is no such thing';
  if (m > n) throw 'You cannot drop more dice than you are rolling... duh';

  const matrix = (sequence, dimensions, callback, ...args) =>
    sequence.reduce((acc, curr) => acc + (dimensions > 1
      ? matrix(sequence, dimensions - 1, callback, curr, ...args)
      : callback(curr, ...args)), 0
    );

  const seq = [...Array(j).keys()].map(r => r + 1);
  const factor = j ** n;
  const cbClosure = () => (...rolls) => [...rolls].sort((a, b) => type ? (a - b) : (b - a)).slice(m).reduce((a, b) => a + b, 0)

  return matrix(seq, n, cbClosure()) / factor;
}

const mock = () => console.log(calculateExpectedValue(4, 6, 2, true));

