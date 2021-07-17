/** 6.2.3 - Communicating with a generator */

/**
 * In the examples presented so far, you've seen how to return multiple values from a generator
 * by using yield expressions. But generators are even more powerful than that! We can also
 * send data to a generator, thereby achieving two-way communication! With a generator, we can
 * produce an intermediary result, use that result to calculate something else from outside
 * the generator, and then, whenever we're ready, send completely new data back to the generator
 * and resume its execution. We'll use this feature to great effect at the end of the chapter
 * to deal with asynchronous code, but for now, let's kepp it simple.
 */
// --------------------------------------------------------------------------------------------------

/** SENDING VALUES AS GENERATOR FUNCTION ARGUMENTS */

/**
 * The easiest way to send data to a generator is by treating it like any other function and
 * using function call arguments. Take a look at the following listing.
 */

/** Listing 6.8 - Sending data and receiving data from a generator */

// // A generator can receive standard arguments, like any other function
// function* NinjaGenerator(action) {
//   const imposter = yield `Hattori ${action}`;

//   // The value sent over next becomes the value of the yielded expression,
//   // so our imposter is Hanzo.
//   assert(imposter === 'Hanzo', 'The generator has been infiltrated');
//   yield `Yoshi (${imposter}) ${action}`;
// }

// // Normal argument passing
// const ninjaIterator = NinjaGenerator('skulk');

// // Triggers the execution of the generator and checks we get the correct value
// const result1 = ninjaIterator.next();
// assert(result1.value === 'Hattori skulk', 'Hattori is skulking.');

// // Sends data to the generator as an argument to the next method
// // and checks whether the value was correctly transferred
// const result2 = ninjaIterator.next('Hanzo');
// assert(result2.value === 'Yoshi (Hanzo) skulk', 'We have an imposter!');

/**
 * A function receiving data is nothing special; plain old function do it all time.
 * But remember, generators have this amazing power; they can be suspended and resumed.
 * And it turns out that, unlike standard functions, generators can even receive data
 * after their execution has started, whenever we resume them by requesting a new value.
 */
// --------------------------------------------------------------------------------------------------

/** USING THE NEXT MEDTHOD TO SEND VALUES INTO A GENERATOR */

/**
 * In addition to providing data when first invoking the generator, we can send data into
 * a generator by passing arguments to the next methods. In the process, we wake up the
 * generator from suspension and resume its execution. This passed-in value is used by
 * the generator as the value of the whole yield expression, in which the generator was
 * currently suspended.
 *
 * In this example, we have two calls to the ninjaIterator's next method. The first call,
 * ninjaIterator.netx(), requests the first value from the generator. Because our generator
 * hasn't started executing , this call starts the generator, which calculates the values
 * of the expression `Hattori ${action}`, yields the Hattori skulk value, and suspends the
 * generator's execution. There's nothing special about this; we've done something similar
 * multiple times throughout this chapter.
 *
 * The interesting thing happens on the second call the ninjaInterator's next method:
 * ninjaIterator.next('Hanzo'). This time, we're using the next method to pass data back to
 * the generator. Our generator function is patiently waiting , suspended at the expression
 * yield `Hattori ${action}`, so the value Hanzo, passed as the argument to next(),
 * is used as the value of the whole yield expression. In our case, this means that the
 * variable imposter in imposter = yield `Hattori ${action}` will end up with the value Hanzo.
 *
 * That's how we achieve two-way communication with a generator. We use yield to return data
 * from a generator, and the iterator's next() method to pass data back to the generator.
 */

/**
 * NOTE:
 * The next method supplies the value to the waiting yield expression, so
 * if there's no yield expression waiting, there's nothing to supply the value to.
 * For this reason, we can't supply values over the first call to the next method.
 * But remember, if you need to supply an initial value to the generator, you can
 * do so when calling the generator itself, as we did with NinjaGenerator('skulk').
 */
// --------------------------------------------------------------------------------------------------

/** THROWING EXCEPTIONS */

/**
 * There's another, slightly less orthodox, way to supply a value to a generator: by throwing
 * an exception. Each iterator, in addition to haing a next method, has a throw method that
 * we can use to throw an exception back to the generator. Again, let's look at a simple example.
 */

/** Listing 6.9 - Throwing exceptions to generators */

function* NinjaGenerator() {
  try {
    yield 'Hattori';
    fail("The expected exception didn't occur"); // This fail shouldn't be reached.
  } catch (e) {
    // Catches exceptions and tests whether we've received the expected exception
    assert(e === 'Catch this!', 'Aha! We caught an exception.');
  }
}

const ninjaInterator = NinjaGenerator();

// Pulls one value from the generator
const result1 = ninjaInterator.next();
assert(result1.value === 'Hattori', 'We got Hattori.');

// Throws an exception to the generator
ninjaInterator.throw('Catch this!');

/**
 * Listing 6.9 starts similarly to listing 6.8, by specifying a generator named NinjaGenerator.
 * But this time, the body of the generator is slightly different. We've surrounded the whole
 * function body code with a try-catch block:
 * 
    function* NinjaGenerator() {
      try {
        yield 'Hattori';
        fail("The expected exception didn't occur"); // This fail shouldn't be reached.
      } catch (e) {
        // Catches exceptions and tests whether we've received the expected exception
        assert(e === 'Catch this!', 'Aha! We caught an exception.');
      }
    }
 * 
 * We then continue by creating an iterator, and getting one value from the generator:
 * 
    const result1 = ninjaInterator.next();
    assert(result1.value === 'Hattori', 'We got Hattori.');
 * 
 * Finally, we use the throw method, available on all iterators, to throw an exception
 * back to the generator:
 * 
    ninjaInterator.throw('Catch this!');
 * 
 * By running this listing, we can see that our exception throwing works as expected.
 * 
 * This feature that enables us to throw exceptions back to the generators might feel
 * a bit strange at first. Why would we even want to do that? Don't worry; we won't
 * keep you in the dark for long. At the end of this chapter, we'll use this feature
 * to improve asynchronous server-side communication. Just be patient a bit longer.    
 */
