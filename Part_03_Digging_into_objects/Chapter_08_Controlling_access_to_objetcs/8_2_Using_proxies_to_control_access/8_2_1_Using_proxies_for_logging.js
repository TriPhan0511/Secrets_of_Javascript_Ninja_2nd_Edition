/**
 * When implementing logging, we usually scatter logging statements throught the code.
 * Take a look at the Ninja example used earlier in the chapter.
 */

/**
 * Listing 8.8 -  Logging without proxies
 */

// // Declares a Ninja constructor function
// function Ninja() {
//   let _skillLevel = 0;

//   Object.defineProperty(this, 'skillLevel', {
//     get: () => {
//       report(`The skillLevel property is getting.`); // We log whenever the skillLevel property is read...
//       return _skillLevel;
//     },
//     set: (value) => {
//       report(`The skillLevel property is setting.`); // ...and whenever the skillLevel property is wriiten to.
//       _skillLevel = value;
//     },
//   });
// }

// // Creates an instance of Ninja
// const ninja = new Ninja();

// ninja.skillLevel; // Reads the skillLevel property and triggers the get method
// ninja.skillLevel = 4; // Writes to the skillLevel property and triggers the set method

/**
 * We define a Ninja constructor function that adds a getter and a setter to the skillLevel property,
 * which logs all attempts of reading and writing to that property.
 *
 * Notice that this isn't an ideal solution. We've cluttered our domain code that deals with reading and
 * writing to an object property with logging code. In addition, if in the future we need more properties
 * on the ninja object, we have to be careful not to forget to add additional logging statements to each new
 * property.
 *
 * Luckily, one of the straightforward uses of proxies is to enable logging whenever we read or write to a
 * property, but in a much nicer and cleaner way. Consider the following example:
 */

/**
 * Lising 8.9 - Using proxies to make it easier to add logging to objects
 */

// // Defines a function that takes a target object and makes it loggable
// function makeLoggable(target) {
//   // Creates a new proxy with that target object
//   return new Proxy(target, {
//     // A get trap that logs property reads
//     get: (target, property) => {
//       report(`Reading ${property}.`);
//       return target[property];
//     },

//     // A set trap that logs property writes
//     set: (target, property, value) => {
//       report(`Writing value ${value} to ${property}.`);
//       target[property] = value;
//     },
//   });
// }

// // Creates a new ninja object that will serve as our target object and
// // make it loggable
// let ninja = { name: 'Yoshi' };
// ninja = makeLoggable(ninja);

// // Reads and writes to our proxy object.
// // These actions are logged by the proxy traps.
// assert(ninja.name === 'Yoshi', 'Our ninja Yoshi.');
// ninja.weapon = 'sword';

/**
 * Here we define a makeLoggable function that takes a target object and returns a new Proxy that has a handler
 * with a get and a set trap. These traps, besides reading and writing to the property, log the information
 * about which property is read or written to.
 *
 * Next, we create a ninja object with a name property, and we pass it to makeLoggable function, in which it
 * will be used as a target for a newly created proxy. We then assign the proxy back to the ninja identifier,
 * overrding it. (Don't worry, our original ninja object is kept alive as the target object of our proxy.)
 *
 * Whenever we try to read a property (for example, with ninja.name), the get trap will be called,
 * and the information about which property has been read will be logged.
 * A similar thing will happen when writing to a property: ninja.weapon = 'sword'.
 *
 * Notice how much easier and more transparent this is when compared to the standard ways of using getters and
 * setters. We don't have to mix our domain code with our logging code, and there's no need to add seperate
 * logging for each object property. Instead, all property reads and writes go through our proxy object trap
 * methods. Logging has been specified in only one place and is reused as many times as neccessary, on as many
 * object as neccessary.
 */
