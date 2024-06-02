async function retry(asyncFn, retries, delay, finalError = 'Errored') {
  if (retries <= 0) {
    throw new Error(finalError);
  }

  try {
    const data = await asyncFn();
    return data;
  } catch (err) {
    setTimeout(() => {
      retry(asyncFn, retries - 1, delay, finalError);
    }, delay);
  }
}

// function retrySync(
//   asyncFn,
//   retries = 3,
//   delay = 50,
//   finalErr = 'Retry failed'
// ) {
//   return new Promise((resolve, reject) => {
//     return asyncFn()
//       .then(resolve)
//       .catch((reason) => {
//         //if retries are left
//         if (retries > 0) {
//           //delay the next call
//           return (
//             wait(delay)
//               //recursively call the same function to retry with max retries - 1
//               .then(retrySync.bind(null, asyncFn, retries - 1, delay, finalErr))
//               .then(resolve)
//               .catch(reject)
//           );
//         }

//         // throw final error
//         return reject(finalErr);
//       });
//   });
// }

async function getUser() {
  const data = await fetch('https://randomser.me/api')
    .then((r) => r.json())
    .catch((err) => {
      throw new Error(err);
    });

  return data;
}

retry(getUser, 5, 1000);
