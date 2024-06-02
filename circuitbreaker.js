function circuitBreaker(fn, limit, timeout) {
  let fails = limit;
  let unavailable = false;

  return function breaker(...args) {
    if (fails <= 0) {
      unavailable = true;
      setTimeout(() => {
        unavailable = false;
      }, timeout);
    }

    if (unavailable) {
      console.error('Unreachable');
    }

    try {
      const data = fn(...args);
      fails = limit;
      return data;
    } catch (err) {
      fails--;
      console.error(err);
    }
  };
}

// test function
const testFunction = (y) => {
  let count = 0;

  return (x) => {
    count++;
    if (count < 4) {
      throw 'failed ' + x;
    } else {
      return 'hello ' + y;
    }
  };
};

const t = testFunction(0);
const c = circuitBreaker(t, 3, 200);

c(1); // "error"
c(2); // "error"
c(3); // "error"

// service is closed for 200 MS
c(4); // "service unavailable"
c(5); // "service unavailable"
c(6); // "service unavailable"
c(7); // "service unavailable"
c(8); // "service unavailable"

// service becomes available after 300ms
setTimeout(() => {
  console.log(c(9));
}, 300); // "hello";
