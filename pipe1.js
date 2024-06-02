function pipe(obj) {
  return function piped(...args) {
    for (const k in obj) {
      if (typeof obj[k] === 'function') {
        obj[k] = obj[k].call(this, ...args);
      }

      if (typeof obj[k] === 'object') {
        pipe(obj[k])(...args);
      }
    }

    return obj;
  };
}

const test = {
  a: {
    b: (a, b, c) => a + b + c,
    c: (a, b, c) => a + b - c,
  },
  d: (a, b, c) => a - b - c,
  e: 1,
  f: true,
};

console.log(pipe(test)(1, 1, 1));

// expected output
// {
//   "a": {
//     "b": 3,
//     "c": 1
//   },
//   "d": -1,
//   "e": 1,
//   "f": true
// }
