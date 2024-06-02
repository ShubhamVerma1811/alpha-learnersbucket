function get(obj, str) {
  str = str.replace(/\[(\w+)\]/gm, '.$1').split('.');

  // let currObj = structuredClone(obj);

  // for (const k of arr) {
  //   currObj = currObj[k];
  // }

  return str.reduce((acc, curr) => {
    return acc[curr];
  }, obj);
}

const obj = {
  a: {
    b: {
      c: [1, 2, 3],
    },
  },
};

console.log(get(obj, 'a.b.c'));
console.log(get(obj, 'a.b.c.0'));
console.log(get(obj, 'a.b.c[1]'));
console.log(get(obj, 'a.b.c[3]'));

// [1,2,3]
// 1
// 2
// undefined
