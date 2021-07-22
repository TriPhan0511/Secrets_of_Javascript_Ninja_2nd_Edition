/** 6.3.6 - Waiting for a number of promises */

/**
 * In addition to helping us deal with a sequences of interdependent, asynchronous steps,
 * promises significantly reduce the burden of waiting for several independent asynchronous
 * tasks. Let's revisit our example in which we want to, in parallel, gather information about
 * the ninjas at our disposal, the intricacies of the plan, and the map of the location where
 * the plan  will be set in motion. With promises, this is as simple as shown in the following
 * listing.
 */

/** Listing 6.17 - Waiting for a number of promises with Promise.all */

// // Declares a director in which the json files are contained
// const jsonRepo =
//   'http://127.0.0.1:5500/Secrets_of_Javascript_Ninja_2nd_Edition/Part_02_Understanding_functions/Chapter_06_Generators_and_Promises/JSON_files';

// // The Promise.all method takes an array of promises,
// // and creates a new promise that succeeds if all promises succeed,
// // and fails if even one promise fails.
// Promise.all([
//   getJSON(`${jsonRepo}/ninjas.json`),
//   getJSON(`${jsonRepo}/mapInfo.json`),
//   getJSON(`${jsonRepo}/plan.json`),
// ])
//   .then((results) => {
//     const ninja = results[0],
//       mapInfo = results[1],
//       plan = results[2];

//     assert(
//       ninja !== null && mapInfo !== null && plan !== null,
//       'The plan is ready to be set in motion!'
//     );
//   })
//   .catch((error) => {
//     fail('A problem in carrying out our plan!');
//   });

/**
 * As you can see, we don't have to care about the order in which tasks are executed, and
 * whether some of them have finished, while others didn't. We state that we want to wait
 * for a number of promises by using the built-in Promise.all method. This method takes
 * in an array of promises and create an new promise that successfully resolves when all
 * passed-in promises resolve, and resjects if even one of the promises fails. The succeed
 * callback receives an array of succeed values, one for each of the passed-in promises,
 * in order. Take a minute to appreciate the elegance of code that processes multiple
 * parallel asynchronous tasks with promises.
 *
 * The Promise.all method waits for all promises in a list. But at a times we have numerous
 * promises, but we care only about the first one that succeeds (or fails). Meet the
 * Promise.race method.
 */
// -------------------------------------------------------------------------------------------

/** RACING PROMISES */

/**
 * Imagine that we have a group of ninjas at our disposal, and that we want to give an
 * assignment to the first ninja who answers our call. When dealing with promises, we
 * can write something like the following listing.
 */

/** Listing 6.18 - Racing promises with Promise.race */

// Get the reference to the director in which the json files contained
const jsonRepo =
  'http://127.0.0.1:5500/Secrets_of_Javascript_Ninja_2nd_Edition/Part_02_Understanding_functions/Chapter_06_Generators_and_Promises/JSON_files';

Promise.race([
  getJSON(`${jsonRepo}/yoshi.json`),
  getJSON(`${jsonRepo}/hattori.json`),
  getJSON(`${jsonRepo}/hanzo.json`),
])
  .then((ninja) => {
    assert(ninja !== null, `${ninja.name} responded first`);
  })
  .catch((error) => {
    fail('Failure!');
  });

/**
 * It's simple as that. There's no need for manually tracking everything. We use
 * the Promise.race method to take an array of promises and return a completely
 * new promise that resolves or rejects as soon as the first of the promises
 * resolves or rejects.
 */

/**
 * So far you've seen how promises work, and how we can use them to greatly simplify
 * dealing with a series of asynchronous steps, either in series or in parallel.
 * Although the improvements, when compared to plain old callbacks in term of error
 * handling and code elegance, are great, promisified code still isn't on the same
 * level of elegance as simple synchronous code. In the next section, the two big
 * concepts that e've introduced in this chapter, generators and promises, come
 * together to provide the simplicity of synchronous code with the nonblocking nature
 * of asynchronous code.
 */
