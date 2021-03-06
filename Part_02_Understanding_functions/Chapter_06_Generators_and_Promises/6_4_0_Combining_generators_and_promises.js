/** 6.4 - Combining generators and promises */

/**
 * In this section, we'll combine generators (and their capability to pause and resume
 * their execution) with promises, in order to achieve more elegant asynchronous code.
 * We'll use the example of a functionality that enables users to get details of the
 * highest-rated mission done by the most popular ninja. The data representing the ninjas,
 * the summaries of their missions, as well as the details of the missions are stored on
 * a remote server, encoded in JSON.
 *
 * All of these subtasks are long-running and mutually dependent. If we were to
 * implement them in synchronous fashion, we'd get the following straightforward
 * code:
 */

/**
    try {
      const ninjas = syncGetJSON('data/ninjas.json');
      const missions = syncGetJSON(ninjas[0].missionsUrl);
      const missionDetails = syncGetJSON(missions[0].detailsUrl);
      // Study the mission description
    } catch (error) {
      // Oh no, we weren't able to get the mission details
    }
*/

/**
 * Although this code is great for its simplicity and error handling, it blocks the UI,
 * which results in unhappy users. Ideally, we'd like to change this code so that
 * no blocking occurs during a long-running task. One way of doing this is by combining
 * generators and promises.
 */

/**
 * As we know, yielding from a generator suspends the execution of the generator
 * without blocking. To wake up the generator and continue its execution, we have to call
 * the next method on the generator's iterator. Promises, on the other hand, allow us to
 * specify a callback that will be triggered in case we were able to obtain the promised
 * value, and a callback that will be triggered in case an error has occured.
 *
 * The idea, then, is to combine generators and promises in the following way: We put
 * the code that uses asynchronous tasks in a generator, and we execute that generator
 * function. When we reach a point in the generator execution that calls an asynchronous
 * task, we create a promise that represents the value of that asynchronous task.
 * Because we have no idea when that promise will be resolved (or even if it won't be
 * resolved), at this point of generator execution, we yield from the generator, so that
 * we don't cause blocking. After a while, when the promised gets settled, we continue
 * the execution of our generator by calling the iterator's next method. We do this as
 * many times as necessary
 *
 * See the following listing for a practical example
 */

/** Listing 6.19 - Combining generators and promises */

// Defines a function which returns a promise
function getJSON(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = function () {
      try {
        if (this.status === 200) {
          resolve(JSON.parse(this.response));
        } else {
          reject(`${this.status} ${this.statusText}`);
        }
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

// Get the reference to the directory in which the json files are contained
const jsonRepo =
  'http://127.0.0.1:5500/Secrets_of_Javascript_Ninja_2nd_Edition/Part_02_Understanding_functions/Chapter_06_Generators_and_Promises/JSON_files';

// The fucntion using asynchronous results should be able to pause while waiting for results
// Notice the function*. We're using generators!
async(function* () {
  try {
    // Yield on each asynchronous task.
    const ninjas = yield getJSON(`${jsonRepo}/ninjas.json`);
    const missions = yield getJSON(ninjas[0].missionsUrl);
    const mission = yield getJSON(missions[0].detailsUrl);

    // Study the mission details
    assert(mission, mission.first);
  } catch (err) {
    // Oh no, we weren't able to get the mission details
    fail(err);
  }
});

// Defines a helper function that will control our generator
function async(generator) {
  // Creates an iterator through which we'll control the generator
  const iterator = generator();

  // Defines the function that will handle each value generated by the genrator
  function handle(iteratorResult) {
    // Stops when the generator has no more results
    if (iteratorResult.done) {
      return;
    }

    const iteratorValue = iteratorResult.value;

    // If the generated value is a promise, register a suucess and a failure callback.
    // This is the asynchronous part.
    // If the promise succeeds, great, resume the generator and send in the promised value.
    // If there's an error, through an exception to the generator.
    if (iteratorValue instanceof Promise) {
      iteratorValue.then((res) => handle(iterator.next(res))).catch((err) => iterator.throw(err));
    }
  }

  // Restarts the generator execution.
  try {
    handle(iterator.next());
  } catch (err) {
    iterator.throw(err);
  }
}

/**
 * The async function takes a generator, calls it, and creates an iterator that will be used
 * to resume the generator execution. Inside the async function, we declare a hanlde function
 * that handles one return value from the generator - one "iteration" of our iterator. If the
 * generator result is a promise that gets resolved successfully, we use the iterator's next
 * method to send the promised value back to the generator and resume the generator's execution.
 * If an error occurs and the promise gets rejected, we throw that error to the generator by
 * using the iterator's throw method (told you it would come in handy). We keep doing this until
 * the generator say it' done.
 */

/**
 * Now let's take a closer at the generator. On the first invocation of the iterator's
 * next method, the generator executes up to the first getJSON(`${jsonRepo}/ninjas.json`)
 * call. This call creates a promise that will eventually contain the list of information
 * about our ninjas. Because this value is fetched asynchronously, we have no idea how
 * much time it will take the browser to get it. But we know one thing: We don't want to
 * block the application execution while we're waiting. For this reason, at this moment
 * of execution, the generator yields control, which pause the generator, and returns the
 * control flow to the invocation of the handle function. Because the yielded value is a
 * getJSON promise, in the handle function, by using the then and catch methods of the
 * promise, we register a success and an error callback, and continue execution. With this,
 * the control flow leaves the execution of the handle function and the body of the async
 * function, and continues after the call to the async function (in our case, there's no
 * more code after, so id idles). During this time, our generator function patiently
 * waits suspended, without blocking the program execution.
 *
 * Much, much later, when the browser receives a response (either a positive or a negative
 * one), one of the promise callbacks is invoked. If the promise wa reolved successfully,
 * the success calback is invoked, which in turn causes the execution of the iterator's
 * next method, which asks the generator for another value. This brings back the generator
 * from suspension and sends to it the value passed in by the callback. This means that
 * we reenter the body of our generator, after the first yield expression, whose value
 * becomes the ninjas list that was asynchronously fetched from the server. The execution
 * of the generator function continues, and the value is assigned to the ninjas variable.
 *
 * In the next line of the generator, we use some of the obtained data, ninjas[0].missionsUrl,
 * to make another getJSON call that creates another promise that should eventually contain a
 * list of missions done by the most popular ninja. Again, because this is an asynchronous
 * task, we have no idea how long it's going to take, so we again yield the executionand repeat
 * the whole process.
 *
 * This process is repeated as long as there are asynchronous tasks in the generator.
 *
 * This was a tad on the complex side, but we like this example because it combines a lot of
 * things that you've learned so far:
 *
 *  _ Functions as first-class objects - We send a function as an argument to the async function.
 *
 *  _ Generator functions - We use theirs ability to suspend and resume execution.
 *
 *  _ Promises - They help us deal with asynchronous code.
 *
 *  _ Callbacks - We register success and failure callbacks on our promises.
 *
 *  _ Arrow functions - Because of their simplicity, for callbacks we use arrow functions.
 *
 *  _ Closures - The iterator, through which we control the generator, is created in the async
 *    function, and we access it, through closures, in the promise callbacks.
 */
