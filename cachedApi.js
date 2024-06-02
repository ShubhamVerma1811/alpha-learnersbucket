function cacheAPI(wait) {
  const map = new Map();
  let cached = false;

  return async function cachedCall(url) {
    if (cached) {
      return map.get(url);
    }

    const data = fetch(url)
      .then((r) => r.json())
      .then((d) => d)
      .catch((e) => {
        throw e;
      });

    map.set(url, data);
    cached = true;

    setTimeout(() => {
      cached = false;
    }, wait);

    return data;
  };
}

const call = cacheAPI(4000);

call('https://randomuser.me/api').then((r) => {
  console.log('R', r);
}); // fetch

setTimeout(() => {
  call('https://randomuser.me/api'); // cache
}, 1000);

setTimeout(() => {
  call('https://randomuser.me/api'); // cache
}, 1400);

setTimeout(() => {
  call('https://randomuser.me/api'); // cache
}, 1200);

setTimeout(() => {
  call('https://randomuser.me/api'); // fetch
}, 2000);
