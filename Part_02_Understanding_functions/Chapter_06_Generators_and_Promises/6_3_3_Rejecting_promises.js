/** 6.3.3 - Rejecting promises */

/**
 * There are two ways of rejecting a promise: explicitly, by calling the passed-in reject method
 * in the executor function of a promise, and implicitly, if during the handling of a promise,
 * an unhandled exception occurs.
 *
 * Let's start our exploration with the following listing
 */

/** Listing 6.12 - Explicitly rejecting promises */

// const promise = new Promise((resolve, reject) => {
//   // A promise can be explicitly rejected by calling the passed-in reject function
//   reject('Explicitly reject a promise!');
// });

// promise.then(
//   () => fail("Happy path, won't be called!"),
//   // If a promise is rejected, the second, error, callback is invoked.
//   (error) => pass('A promise was explicitly rejected.')
// );

/**
 * We can explicitly reject a promise, by calling the passed-in reject method:
 * 
    reject('Explicitly reject a promise!');
 * 
 * If a promise is rejected, when registering callbacks through the then method, the second,
 * error, callback will always be invoked.
 * 
 * In addition, we can use an alternative syntax for handling promise rejections, by using the
 * built-in catch method, as shown in the following listing.
 */

/** Listing 6.13 - Chaining a catch method */

// const promise = new Promise((resolve, reject) => {
//   reject('Explicitly reject a promise');
// });

// promise.then(() => "Happy path, won't be called.").catch(() => pass('Promise was also rejected.'));

/**
 * As listing 6.13 shows, we can chain in the catch method after the then method, to also
 * provide an error callback that will be invoked when a promise gets rejected. In this
 * example, this is a matter of personal style. Both option work equally well, but later,
 * when working with chain of promises, we'll see an example in which chaining the catch
 * method is useful.
 */

/**
 * In addition to explicit rejection (via the reject call), a promise can also be
 * rejected implicitly, if an exception occurs during its processing.
 *
 * Take a look at the following example
 */

/** Listing 6.14 - Exceptions implicitly reject a promise */

const promise = new Promise((resolve, reject) => {
  // A promise is implictly rejected if an unhandled exception
  // occurs when processing the promise.
  undeclaredVariable++;
});

promise
  .then(() => fail("Happy path, won't be invoked"))
  .catch((error) => pass('Third promise was also rejected.'));
// If an exception occurs, the second, error, callback is invoked

/**
 * Within the body of the promise executor, we try to increment undeclaredVariable, a variable
 * that isn't defined in our program. As expected, this results in an exception. Because there's
 * no try-catch statement within the body of the executor, this results in an implicit rejection
 * of the current promise, and the catch callback is eventually invoked. In this situation, we
 * could have just as easily supplied the second callback to the then method, and the end effect
 * would be the same.
 *
 * This way of treating all problems that happen while working with promises in a uniform way is
 * extremely handy. Regardless of how the promise was rejected, whether explicitly by calling
 * the reject method or even implicitly, if an exception occurs, all errors and rejection reasons
 * are directed to our rejection callback. This makes our lives as developers a little easier.
 */
