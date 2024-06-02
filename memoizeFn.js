function memoizeFn(fn) {
  const res = {};

  return (val) => {
    if (val in res) {
      return res[val];
    }

    res[val] = fn(val);
    return res[val];
  };
}

function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return factorial(n - 1) * n;
}

const memoizedFactorial = memoize(factorial);
const a = memoizedFactorial(100);
console.log(a);

const b = memoizedFactorial(100);
console.log(b);
