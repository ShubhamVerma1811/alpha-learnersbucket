const ogFetch = fetch;

fetch = async function fetch(...args) {
  args = requestInterceptor(...args);
  const res = await ogFetch(...args);

  return responseInterceptor(res);
};

// request interceptor
// perform all the pre-request actions
const requestInterceptor = (...args) => {
  // original request does not contains page info
  // assign the pagination in the interceptor
  args[0] = args[0] + '4';
  return args;
};

// response interceptor
// perform all the post-response actions
const responseInterceptor = (response) => {
  // convert the value to json
  // to avoid parsing every time
  return response.json();
};

fetch('https://jsonplaceholder.typicode.com/todos/').then((json) =>
  console.log(json)
);

// Output:
// {
//   "userId": 1,
//   "id": 2,
//   "title": "quis ut nam facilis et officia qui",
//   "completed": false
// }
