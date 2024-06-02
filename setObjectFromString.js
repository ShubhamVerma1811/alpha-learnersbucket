function set(obj, str, v) {
  str = str.replace(/\[(\w+)\]/gm, '.$1').split('.');

  obj = str.reduce((acc, curr) => acc[curr], obj);

  console.log(obj);
}

const object = { a: [{ b: { c: 3 } }] };

set(object, 'a[0].b.c', 4);
console.log(object.a[0].b.c);
// 4

set(object, ['x', '0', 'y', 'z'], 5);
console.log(object.x[0].y.z);
// 5
