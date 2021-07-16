/** 6.2.2 - Using generators */

/**
 * Generating sequences of items is all nice and dandy, but let's get more pratical,
 * starting with a simple case of generating IDs.
 */
// -----------------------------------------------------------------------------------------

/** USING GENERATORS TO GENERATE IDS */

/**
 * When creating certain objects, often we need to assign a unique ID to each object.
 * The easiest way to do this is through a global counter variable, but that's kind
 * of ugly because the variable can be accidently messed up from anywhere in our code.
 * Another option is to use a generator, as shown in the following listing.
 */

/** Listing 6.5 - Using generator for generating IDs */

// Defines a IdGenerator generator function
function* IdGenerator() {
  // A variable that keeps track of IDs.
  // This variable can't be modified from outside our generator
  let id = 0;
  // A loop that generates an infinite sequence of IDs
  while (true) {
    yield ++id;
  }
}

// An iterator through which we'll request new IDs from the generator
const idIterator = IdGenerator();

// Requests three new IDs
const ninja1 = { id: idIterator.next().value };
const ninja2 = { id: idIterator.next().value };
const ninja3 = { id: idIterator.next().value };

assert(ninja1.id === 1, 'First ninja has id 1.');
assert(ninja2.id === 2, 'Second ninja has id 2.');
assert(ninja3.id === 3, 'Third ninja has id 3.');

/**
 * This example starts with a generator that has one local variable, id, which represents
 * our ID counter. The id variable is local to our generator; there's no fear that someone
 * will accidently modify it from somewhere else in the code. This is followed by an infinite
 * while loop, which at each iteartion yields a new id value ans suspends its execution until
 * a request for another ID comes along:
 * 
    function* IdGenerator() {
      let id = 0;
      while (true) {
        yield ++id;
      }
    }
 */

/**
 * NOTE:
 * Writing infinite loop isn't something that we generally want to do in a standard function.
 * But with generators, everything is fine! Whenever the generator encounters a yield statement,
 * the generator execution is sespended until the next method is called again. So every next call
 * executes only one iteration of our infinite while loop and sends back the next ID value.
 */

/**
 * After defining the generator, we create an iterator object:
 * 
    const idIterator = IdGenerator();
 * 
 * This allows us to control the generator with calls to the idIterator.next() method.
 * This executes the generator until a yield is encountered, returning a new ID value
 * that we can use for our objects:
 * 
    const ninja1 = { id: idIterator.next().value };
 * 
 * See how simple this is? No messy global variables whose value can be accidentally
 * changed. Instead, we use an iterator to request values from a generator. In addition,
 * if later we need another iterator for tracking the IDs of, for example, samurai, we
 * can initialize a new generator for that.
 */
