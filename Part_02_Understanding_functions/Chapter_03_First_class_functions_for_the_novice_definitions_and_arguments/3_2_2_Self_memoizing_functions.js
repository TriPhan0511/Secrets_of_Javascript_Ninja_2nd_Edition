/** 3.2.2 - Self-memoizing functions */

/**
 * Memoization (no, that's not a type) is a process of building a function that's capableof remembering its previous
 * computed values. In a nutshell, whenever a function computes its result, we store that result alongside the
 * function arguments. In this way, when another invocation occurs for the same set of arguments, we can return the
 * previous stored result, instead of calculating it anew. This can markedly increase performance by avoiding
 * needless complex computations that have already performed. Memoization is particular useful when performing
 * calculation for animations, searching data that doesn't change often, or any time-consuming math.
 *
 * As an example, let's look a simplistic (and certainly not particularly efficient) algorithm for computing
 * prime numbers. Although this is a simple example of complex calculation, this technique is readily applicable
 * to other expensive computations (such as deriving the MD5 hash for a string) that rae too complex to present here.
 *
 * From the outside, the function appears to be just like any normal function, but we'll surreptitously build in
 * an anwser cache in which the function will save the answers to the computations it perfomrs:
 */

/** Listing 3.3 - Memoizing previous computed values */

function isPrime(value) {
  // Creates the cache
  if (!isPrime.answers) {
    isPrime.answers = {};
  }

  // Check for cached values
  if (isPrime.answers[value] !== undefined) {
    return isPrime.answers[value];
  }

  // let prime = value !== 1; // 1 is not a prime
  // for (let i = 2; i < value; i++) {
  //   if (value % i === 0) {
  //     prime = false;
  //     break;
  //   }
  // }
  // return (isPrime.answers[value] = prime);

  let prime = value >= 2;
  if (prime) {
    for (let i = 2; i < value; i++) {
      if (value % i === 0) {
        prime = false;
        break;
      }
    }
  }

  return (isPrime.answers[value] = prime);
}

// Checks
assert(isPrime(5), '5 is prime');
assert(isPrime.answers[5], 'The answer was cached');

/**
 * Within the isPrime function, we start by checking whether the answers property that we'll use as a cache has
 * been created, and if not, we create it:
 * 
      if (!isPrime.answers) {
        isPrime.answers = {};
      }
 * 
 * The creation of this initially empty object will occur only the first call to the function; after that, 
 * the cache will exist.
 * 
 * Then check whether the result for the passed value has already been cached in answers:
 * 
      if (isPrime.answers[value] !== undefined) {
        return isPrime.answers[value];
      }
 * 
 * Within this cache, we'll store the computed answer (true of false) using the argument value as the property key.
 * If we find a cached answer, we return it.
 * 
 * If no cached value is found, we go ahead and perform the calculations needed to determine whether the value is
 * prime (which can be expensive operation for larger values) and store the result in the cache as we return it:
 * 
     return (isPrime.answers[value] = prime);
 * 
 * Our cache is a property of the function itself, so it's kept alive for as long as the function itself is alive.
 */

/**
 * This approach has two major advantages:
 *
 *  * The end user enjoy performance benefits for function calls asking for a previously computed value.
 * 
 *  * It happen seamlessly and behind the scenes; neither the end user nor the page author needs to perform any 
 *    special requests or do any extra initialization in order to make it works.
 */

/**
 * But it's not all roses and violins; its disadvantages may need to weighed against its advantages:
 * 
 *  * Any sort of caching will certainly secrifice memory in favor of performance.
 * 
 *  * Purists may consider that caching is a concern that shouldn't be mixed with the business logic;
 *    a function or a method should do one thing and do it well. But don't worry; in chapter 8, you'll
 *    see how to tackle this complaint.
 * 
 *  * It's difficult to load-test or measure the performance of an algorithm such as this one, because our
 *    results depend on the previous inputs to the functions.
 */