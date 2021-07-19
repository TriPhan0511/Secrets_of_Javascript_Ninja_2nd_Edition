/** 6.3.2 - Diving into promises */

/**
 * A promise is an object that serves as a placeholder for a result of an asynchronous task.
 * It respresents a value that we don't have but hope to have in the future. For this reason,
 * durng its lifetime, a promise can go through a cople of states.
 *
 * A promise starts in the pending state, in which we know nothing about our promised value.
 * That's why a promise in the pending state is also called an resolved promise. During
 * program execution, if the promise's resolve function is called, the promise moves into
 * the fulfilled state, in which we successfully obtained the promise value. On the other
 * hand, if the promise's reject function is called, or if an unhandled exception occurs
 * during promise handling, the promise moves into rejected state, in which we weren't able
 * to obtain the promised value, but in which we at least know why. Once a promise has
 * reached either the fulfilled state of the rejected state, it can't switch (a promise
 * can't go from fulfilled to rejected or vice vers), and it always stays in that state.
 * We say that a promise is resolved (either successfully or not).
 *
 * The following listing provides a closer look at what's going on when we use promises.
 */

/** Listing 6.11 - A closer look at promise order of execution */

report('At code start'); // (1)

// Calling the Promise constructor immediately invokes the passed-in function.
let ninjaDelayedPromise = new Promise((resolve, reject) => {
  report('ninjaDelayedPromise executor'); // (2)
  // We'll resove this promise as successfully after a 500 ms timeout expires.
  setTimeout(() => {
    report('Resolving ninjaDelayedPromise'); // (7)
    resolve('Hattori');
  }, 500);
});

assert(ninjaDelayedPromise !== null, 'After creating ninjaDelayedPromise'); // (3)

// The Promise then method is used to set up a callback that
// will be called when the promise resolves, in our case when the timeout expires.
ninjaDelayedPromise.then((ninja) => {
  assert(ninja === 'Hattori', 'ninjaDelayedPromise resolve handled with Hattori'); // (8)
});

// Creates a new Promise that gets immediately resolved
const ninjaImmediatePromise = new Promise((resolve, reject) => {
  report('ninjaImmediatePromise executor. Immediate resolve.'); // (4)
  resolve('Yoshi');
});

// Sets up a callback to be invoked when the promise resolves.
// But our promise is already resolved!
ninjaImmediatePromise.then((ninja) => {
  assert(ninja === 'Yoshi', 'ninjaImmediatePromise resolve handled with Yoshi'); // (6)
});

report('At code end'); // (5)

/**
 * Figure 6.11 - The result of executing listing 6.11
 * 
    At code start
    ninjaDelayedPromise executor
    After creating ninjaDelayedPromise
    ninjaImmediatePromise executor. Immediate resolve.
    At code end
    ninjaImmediatePromise resolve handled with Yoshi
    Resolving ninjaDelayedPromise
    ninjaDelayedPromise resolve handled with Hattori
 */

/**
 * The code in listing 6.11 outputs the results shown in figure 6.11. As you can see, the
 * code starts by logging the "At code start" message by using our custom-made report
 * function that outputs the message onscreen. This enables us to easily track the order
 * of execution.
 * 
 * Next we create a new promise by calling the Promise constructor. This immediately invokes the 
 * executor function in which we set up a timeout:
 * 
      setTimeout(() => {
        report('Resolving ninjaDelayedPromise'); // (7)
        resolve('Hattori');
      }, 500);
 * 
 * The timeout will resolve the promise after 500ms. This could have been another asynchronous
 * task, but we choose the humble timeout because its simplicity.
 * 
 * After the ninjaDelayedPromise has been created, it still doesn't know the value that it 
 * will eventually have, or whether it will even be successful (Remember, it's still waiting
 * for the timeout that will resolve it.) So after construction, the ninjaDelayedPromise is 
 * in the first promise state, pending.
 * 
 * Next we use the then method on the ninjaDelayedPromise to schedule a callback to be executed
 * when the promise successfully resolves:
 * 
      ninjaDelayedPromise.then((ninja) => {
        assert(ninja === 'Hattori', 'ninjaDelayedPromise resolve handled with Hattori'); // (8)
      });
 * 
 * This callback will always be called asynchronously, regardless of the current state of the
 * promise.
 * 
 * We continue by creating another promise, ninjaImmediatePromise, which is resolved immediately
 * during its construction, by calling the resolve function. Unlike the ninjaDelayedPromise,
 * which after construction is in the pending state, the ninjaImmediatePromise finishes 
 * construction in the resolved state, and the promise already has the value Yoshi.
 * 
 * Afterward, we use the ninjaImmediatePromise's then method to register a callback that will be
 * executed when the promise successfully resolves. But our promise is already settled; does this
 * mean that the success callback will be immediately called or that it will be ignored? The
 * answer is neither.
 * 
 * Promises are designed to deal with asynchronous actions, so the Javascript engine always resorts
 * to asynchronous handling, to make the promise behavior predictable. The engine does this by 
 * executing the then callbacks after all the code in the current step of the event loop is executed
 * (once again, we'll explore exactly what this means in chapter 13). For this reason, if we study 
 * the output in figure 6.11, we'll see that we first log "At code end" and then we log that the
 * ninjaImmidiatePromise was reolved. In the end, after the 500ms timeout expires, 
 * the ninjaDelayedPromise is resolved, which causes the execution of the matching then callback.
 * 
 * In this example, for the sake of simplicitly, weve worked only with the rosy scenario in which
 * everything goes great. But the real world isn't all sunshine and rainbows, so let's see how to 
 * deal with all sorts of crazy problems that can occur.
 * 
 */
