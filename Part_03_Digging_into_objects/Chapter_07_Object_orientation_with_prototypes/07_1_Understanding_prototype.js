/**
 * 07.1 - With prototypes, objects can access properties of other objects
 */

// // Create three objects, each with its own property
// const yoshi = { skulk: true };
// const hattori = { sneak: true };
// const kuma = { creep: true };

// // yoshi has access to only its own, skulk, property
// assert('skulk' in yoshi, 'Yoshi can skulk');
// assert(!('sneak' in yoshi), 'Yoshi cannot sneak');
// assert(!('creep' in yoshi), 'Yoshi cannot creep');

// // Use the Object.setPrototypeOf() method to set one object as the prototype of another object.
// Object.setPrototypeOf(yoshi, hattori);

// // By setting hattori as yoshi's prototype, yoshi now has access to hattori's properties
// assert('sneak' in yoshi, 'Yoshi can sneak');

// // Currently, hattori can't creep
// assert(!('creep' in hattori), 'Hattori cannot creep');

// // Sets the kuma as a prototype of hattori
// Object.setPrototypeOf(hattori, kuma);

// // Now hattori has access to creep
// assert('creep' in hattori, 'Hattori can now creep');

// // yoshi also has access to creep, through hattori
// assert('creep' in yoshi, 'Yoshi can also creep');

/**
 * It's important to emphasize that every object can have a prototype, and an object's prototype
 * can also have a prototype, and so on, forming a PROTOTYPE CHAIN.
 *
 * The search delegation for a particular property occurs up the whole chain, and it stops only
 * when there are no more prototypes to explore. For example, asking yoshi for the value of the
 * creep property triggers the search for the property first in yoshi. Because the property isn't
 * found, yoshi's prototype, hattori, is searched. Again, hatttori doesn't have a property named
 * creep, so hattori's prototype, kuma, is searched, and the property is finally found.
 */
// -------------------------------------------------------------------------------------------------

// // Prototype chain
// console.log(Object.getPrototypeOf(yoshi) === hattori);
// // true
// console.log(Object.getPrototypeOf(hattori) === kuma);
// // true
// console.log(Object.getPrototypeOf(kuma) === Object.prototype);
// // true
// console.log(Object.getPrototypeOf(Object.prototype) === null);
// // true
// -------------------------------------------------------------------------------------------------


