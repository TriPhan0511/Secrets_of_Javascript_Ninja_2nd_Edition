/** 6.3 - Working with promises */

/**
 * In Javascript, we rely a lot on asynchronous computations, computations whose
 * results we don't have yet but will at some later point. So ES6 has introduced
 * a new concept that makes handling asynchronous tasks easier: promises.
 *
 * A promise is a placeholder for a value that we don't have now but will have later;
 * it's a guarantee that we'll eventually know the result of an asynchronous computation.
 * If we make good on our promise, our result will be a value. If a problem occurs, our
 * result will be an error, an excuse for why we couldn't deliver. One great exmaple of
 * using promises is fetching data from a server; we promise that we'll eventually get
 * the data, but there's always a chance that problems will occur.
 *
 * Creating a new promise is easy, as you can see in the following example.
 */

/** Listing 6.10 - Creating a simple promise */

// Creates a promise by calling a built-in Promise constructor and
// passing in a callback function with two parameters: resolve and reject
const ninjaPromise = new Promise((resolve, reject) => {
  // A promise is successfully resolved by calling the passed-in resolve function
  // (and rejected by calling the reject function).
  resolve('Hattori');
  // reject('An error resolving a promise!)
});

// By using the then method on a promise, we can pass in two callbacks;
// the first is called if a promise is successfully resolved.
ninjaPromise.then(
  (ninja) => {
    assert(ninja === 'Hattori', 'We were promised Hattori!');
  },
  // And the second is called if an error occurs.
  (err) => {
    fail("There shouldn't be an error");
  }
);

/**
 * To create a promise, we use the new, built-in constructor, to which we pass a function,
 * in this case an arrow function (but we could just as easily use a function expression).
 * This function, called an executor function, has two parameters: resolve and reject.
 * The executor is called immediately when constructing the Promise object with two
 * built-in functions as arguments: resolve, which we manually call if we want the promise
 * to resolve successfully, and reject, which we call if an error occurs.
 *
 * This code uses the promise by calling the built-in then method on the Promise object,
 * a method to which we pass two callback functions: a success calback and a fail callback.
 * The former is called if the promise is resolved successfully (if the resolve function is
 * called on the promise), and the latter is called if there's a problem (either an
 * unhandled exception occurs or the reject function is called on a promise).
 *
 * In our example code, we create a promise and immediately resolve it by calling the
 * resolve function with the argument Hattori. Therefore, when we call the then method,
 * the first, success, callback is executed and the test that outputs We were promised
 * Hattori! passes.
 */
