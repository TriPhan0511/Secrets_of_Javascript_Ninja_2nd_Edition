/** 7.1 - Understanding prototypes */

// Creates a new object with object-literal notation:
// const obj = {
//   // Assigns a simple value
//   prop1: 1,
//   // Assigns a function
//   prop2: function () {},
//   // Assign another object
//   prop3: {},
// };

// // Changes the value of the property
// assert(obj.prop1 === 1, 'Initial value is 1.');
// obj.prop1 = 20;
// assert(obj.prop1 === 20, 'Now, the value is 20.');

// // Deletes a property
// assert(obj.prop3, 'The obj has the prop3.');
// delete obj.prop3;
// assert(!obj.prop3, 'Now, the prop3 was deleted.');

// // Adds a complete new property to an object
// obj.prop4 = 'Hello';
// assert(obj.prop4 && obj.prop4 === 'Hello', 'A new pproperty added to obj.');
// --------------------------------------------------------------------------------------------------------------

/**
 * In Javascript, inheritance is implemented with prototyping.
 *
 * The idea of prototyping is simple. Every object can have a reference to its prototype,
 * an object to which the search for a particular property can be delegated to, if the object
 * itself doesn't have that property.
 */

/** Listing 7.1 - With prototypes, onjects can access properties of other objects */

// Creates three objects, each with its own property.
const yoshi = { skulk: true };
const hattori = { sneak: true };
const kuma = { creep: true };

// yoshi has access to only its own, skulk, property.
assert('skulk' in yoshi, 'Yoshi can skulk.');
assert(!('sneak' in yoshi), 'Yoshi cannot sneak.');
assert(!('creep' in yoshi), 'Yoshi cannot creep.');

// Use the Object.setPrototypeOf method to set one object as the prototype of another object.
Object.setPrototypeOf(yoshi, hattori);

// By setting hattori as yoshi's prototype, yoshi has now access to hattori's properties.
assert('sneak' in yoshi, 'Yoshi can now sneak.');
assert(!('creep' in yoshi), 'But he still can not creep.');

// Sets kuma as the prototype of hattori
Object.setPrototypeOf(hattori, kuma);

// Now, hattori has access creep.
assert('creep' in hattori, 'Hattori can now creep.');
// yoshi also has access to creep, through hattori.
assert('creep' in yoshi, 'Now, Yoshi can also creep.');

/**
 * To test whether an object has access to a particular property, we can use the in operator.
 * For example, executing skulk in yoshi returns true, because yoshi hass access to skulk property;
 * whereas executing sneak in yoshi returns false.
 */

/**
 * In Javascript, the object's prototype property is an internal property ( we mark it
 * with [[prototype]]). And we have two ways to access the prototype of a specified object:
 * via the __proto__ property of the object (every object has the __proto__ property) and
 * via the built-in Object.getPrototypeOf method:
 */

assert(yoshi.__proto__ === hattori, 'The prototype of yoshi is hattori.');
assert(Object.getPrototypeOf(yoshi) === hattori, 'Again, the prototype of yoshi is hattori.');

/**
 * We can use the built-in Object.setPrototypeOf method which takes in two object arguments
 * and sets the second object as the prototype of the first. For example, calling
 * Object.setPrototypeOf(yoshi, hattori); sets up hattori as a prototype of yoshi.
 *
 * As a result, whenevr we ask yoshi for a property that it doesn't have, yoshi delagates
 * that search to hattori. We can access hattori's sneak through yoshi.
 *
 * We can do a similar thing with hattori and kuma. By using Object.setPrototypeOf method,
 * we can set kuma as the prototype of hattori. If we then ask hattori for a property that
 * he doesn't have, that search will be delegated to kuma. In this case, hattori now has
 * access to kuma's creep property.
 */

/**
 * It's important to emphasize that every object can have a prototype, and
 * object's prototype can also have a prototype, and so on, forming a prototype chain.
 * The search delagation for a particular property occurs up the whole chain, and it stops
 * only when there no more prototypes to explore.
 * For example, asking yoshi for a value of the creep property triggers the search for the
 * property first in yoshi. Because the property isn't found, yoshi's prototype, hattori,
 * is searached. Again, hattori doesn't have a property named creep, so hattori's prototype,
 * kuma, is searched, and the property is finally found.
 */

/**
 * Now that we have a basic idea of how the search for a particular property occurs through
 * the prototype chain, let's see how prototypes are used when constructing new objects with
 * constructor function.
 */
