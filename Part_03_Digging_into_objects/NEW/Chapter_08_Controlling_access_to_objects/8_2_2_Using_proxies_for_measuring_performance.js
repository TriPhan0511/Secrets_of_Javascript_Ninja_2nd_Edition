/** 8.2.2 - Using proxies for measuring performance */

/**
 * Besides being used for logging property accesses, proxies can be used for measuring
 * the performance of function invocations, without even modifing the source code of a
 * function.
 *
 * Say we want to measure the performance of a function that calculates whether a number
 * is a prime, as shown in the following listing.
 */

/** Listing 8.10 - Measuring performance with proxies */

// Defines a primitive implementation of the isPrime function
function isPrime(number) {
  if (number < 2) {
    return false;
  }

  for (let i = 2; i < number; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

// Wraps the isPrime function within a proxy
isPrime = new Proxy(isPrime, {
  // Provides an apply trap that will be called whenever a proxy is called as a function
  apply: (target, thisArg, args) => {
    // Starts a timer called isPrime
    console.time('isPrime');

    // Invokes the target function
    const result = target.apply(thisArg, args);

    // Stops the timer and ouputs the result
    console.timeEnd('isPrime');

    return result;
  },
});

// Calls the isPrime
isPrime(1299827);

/**
 * In this example, we have a simple isPrime function. (The exact function doesn't matter;
 * we're using it as an example of a function whose execution can last a nontrivial amount
 * of time.)
 * 
 * Now imagine that we need to measure the performance of the isPrime function, but without
 * modifying its code. We could wrap the function into a proxy that has a trap that will be
 * called whenever the function is called:
 * 
      isPrime = new Proxy(isPrime, {
        apply: (target, thisArg, args) => {
          ...
        }
      });
 * 
 * We use isPrime function as the target object of a newly constructed proxy. In addition,
 * we supply a handler with an apply trap that will be executed on function invocation.
 * 
 * Similarly, as in the precious example, we've assigned the newly created proxy to the 
 * isPrime identifier. In that way, we don;t have to change any of the code that calls
 * the function whose execution time we want to measure; the rest of the program code is
 * completely oblivious to our changes.
 * 
 * Whenever the isPrime function is called, that call is rerouted to our proxy's apply
 * trap, which wil start a stopwatch with the built-in console.time method, call the
 * original isPrime function, log the elapsed time, and finally return the result of
 * the isPrime invocation.
 */
