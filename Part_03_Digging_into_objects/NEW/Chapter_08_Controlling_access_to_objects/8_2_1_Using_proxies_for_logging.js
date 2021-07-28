/** 8.2.1 - Using proxies for logging */

/**
 * One of the most powerful tools when trying to figure out how code works or when trying
 * to get the root of a nasty bug is logging, the act of outputing information that we
 * find useful at a particular moment. We might, for example, want to know which functions
 * are called, how long they've been executing, what properties are read or written to,
 * and so on.
 */

/** Unfortunately, when implementing logging, we usually scatter logging statements
 * throughout the code. Take a look at the Ninja example used earlier this chapter.
 */

/** Listing 8.8 - Logging without proxy */

// function Ninja() {
//   let _skillLevel = 0;

//   Object.defineProperty(this, 'skillLevel', {
//     get: () => {
//       report('skillLevel get method is called.');
//       return _skillLevel;
//     },
//     set: (value) => {
//       report('skillLevel set method is called.');
//       _skillLevel = value;
//     },
//   });
// }

// const ninja = new Ninja();
// // Read the skillLevel property and triggers the get method
// ninja.skillLevel;
// // Writes to the skillLevel property and triggers the set method
// ninja.skillLevel = 10;

/**
 * We define a Ninja constructor function that adds a getter and setter to the
 * skillLevel property, which log all attempts of reading and writing to that property.
 *
 * Notice that this isn't ideal solution. We cluttered our domain code that deals with
 * reading and writing to an object property with logging code. In addition, if in the
 * future we need to more properties on the ninja object, we have to be careful not to
 * forget to add additional logging statements to each new property.
 */
// ------------------------------------------------------------------------------------------------------

/**
 * Luckily, one of the straightforward uses of proxies is to enable logging whenever
 * we read or write to a property, but in much nicer and cleaner way.
 *
 * Consider the following exmaple.
 */

/** Listing 8.9 - Using proxies makes it easier to add logging to objects */

// Defines a function that takes a target object and makes it loggable
function makeLoggable(target) {
  // Creates a new proxy with that target object
  return new Proxy(target, {
    // A get trap that logs property reads
    get: (target, property) => {
      report(`Reading ${property} property.`);
      return target[property];
    },
    // A set trap that log property writes
    set: (target, property, value) => {
      report(`Writing ${value} to ${property} property.`);
      target[property] = value;
    },
  });
}

// Creates a new ninja object that will server as our target object and make it loggable
let ninja = { name: 'Yoshi' };
ninja = makeLoggable(ninja);

// Reads and writes to our proxy object. These actions are logged by the proxy traps.
assert(ninja.name === 'Yoshi', 'Our ninja is Yoshi.');
ninja.weapon = 'sword';

/**
 * Here we define a makeLoggable function that takes a target object and returns a new Proxy
 * that has a handler with a get and a set trap.These traps, besides reading and writing to
 * the property, log information about which property is read or written to.
 *
 * Next, we create a ninja object with a name property, we pass it to the makeLoggable function,
 * in which it will be used as a target for a newly created proxy. We then assign the proxy back
 * to the ninja identifier, overriding it. (Don't worry, our original ninja object is kept alive
 * as the target object of our proxy.)
 *
 * Whenever we try to read a property (for example, ninja.name), the get trap will be called, and
 * the information about which property has been read will be logged. A similar thing will happen
 * when writing to a property: ninja.weapon = 'sword'.
 */

/** Notice how much easier and more tranparent this ia when compared to the standard way of using
 * getters and setters. We don't have to mix our domain code with our logging code, and there's
 * no need to add separate logging for each obejct property. Instead, all property reads and writes
 * go through our proxy object trap methods. Logging has been specified  in only one place and is
 * reused as many times as neccessary, on as many objects as neccessary.
 */
