/** 6.4.1 - The async function */

/**
 * Notice that we still had to write some boilerplate code; we had to develop an async function
 * that takes care of handling promises and requesting values from the generator. Although we
 * can write this function only once and then reuse it throughout our code, it would be even
 * nicer if we didn't have to think about it. The people in charge of Javascript are well aware
 * of the usefulness of the combination of generators and promises, and they want to make our
 * lives even easier by building in direct language support for mixing generators and promises.
 *
 * For these situations, from ES2017, there are two new keyowords, async and await, that take care
 * of this boilerplate code. Now, we are able to write something like this:
 */

// Defines a function whcih returns a promise
function getJSON(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.open('GET', url);

    request.onload = function () {
      try {
        if (this.status === 200) {
          resolve(JSON.parse(this.response));
        } else reject(`${this.status} ${this.statusText}`);
      } catch (err) {
        reject(err.message);
      }
    };

    request.onerror = function () {
      reject(`${this.status} ${this.statusText}`);
    };

    request.send();
  });
}
// -----------------------------------------------------------------

// Get reference to the director in which the JSON files contained
const jsonRepo =
  'http://127.0.0.1:5500/Secrets_of_Javascript_Ninja_2nd_Edition/Part_02_Understanding_functions/Chapter_06_Generators_and_Promises/JSON_files';
// -----------------------------------------------------------------

(async function () {
  try {
    const ninjas = await getJSON(`${jsonRepo}/ninjas.json`);
    const missions = await getJSON(ninjas[0].missionsUrl);

    assert(missions, 'The missions obtained.');
  } catch (err) {
    fail(err);
  }
})();

/**
 * We use the async keyword in front of the function keyword to specify that this function
 * relies on asynchonous values, and at every place where we call an asynchronous task, we
 * place the await keyword that says to the Javascript engine, please wait for this result
 * without blocking. In the background, everything happens as we've discussed previously
 * throughout the chapter, but now we don't need to worry about it.
 */
