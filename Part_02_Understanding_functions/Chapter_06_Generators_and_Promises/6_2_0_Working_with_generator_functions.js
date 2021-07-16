/** 6.2 - Working with generator functions */

/**
 * Generators are a completely new type of function and are significantly different from
 * standard, run-of-the-mill functions. A generator is a function that generates a sequence
 * of values, but not all at once, as a standard function would, but on a per request basis.
 * We have to explicitly ask the generator for a new value, and the generator will either
 * respond with a value or nitify us that it has no more values to produce. What's even
 * more curious is that after a value is produced, a generator function doesn't end its
 * execution, as a normal function would. Instead, a generator is merely suspended. Then,
 * when a request for another value comes along, the generator resumes where it left off.
 *
 * The following listing provides a simple example of using a generator to generate a
 * sequence of weapons.
 */

/** Listing 6.1 - Using a generator function to generate a sequence of values */

// Defines a generator function by putting * after the function keyword
function* WeaponGenerator() {
  // Generates individual values by using the new yield keyword
  yield 'Katana';
  yield 'Wakizashi';
  yield 'Kusarigama';
}

// Consumes the generated sequence with the new for-of loop
for (let weapon of WeaponGenerator()) {
  assert(weapon !== undefined, weapon);
}
// -> Katana
// -> Wakizashi
// -> Kusarigama

assert(typeof WeaponGenerator() === 'object', 'calling a generator creates an iterator object.');

/**
 * We start by defining a generator that will produce a sequence of weapons. Creating a
 * generator function is simple: We append an asterisk (*) after the function keyword.
 * This enables us to use the new yield keyword within the body of the generator to
 * produce individual values.
 *
 * In this example, we create a generator called WeaponGenerator that produces a sequence
 * of weapons: Katana, Wakizashi, and Kusarigama. One way that consuming that sequence of
 * weapons is by using a new kind of loop, the for-of loop:
 * 
    for (let weapon of WeaponGenerator()) {
      assert(weapon !== undefined, weapon);
    }
 * 
 * On the right side of the for-of loop, we've placed the result of invoking our generator.
 * But if you take a closer look at the body of the WeaponGenerator function, you'll see 
 * that there's no return statement. What's up with that? In this case, shouldn't the 
 * right side of the for-loop evaluate to undefined, as would be the case if we were dealing
 * with a standard function?
 * 
 * The truth is that generators are unlike standard functions. For starters, calling a generator
 * doesn't execute the generator function; instead it creates an object called an iterator. Let's
 * explore that object.
 */
