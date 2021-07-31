/** 9.3 - Set - SUMMARY */

// // Creates a new Set from an array
// const ninjas = new Set(['Kuma', 'Hattori', 'Yoshi']);

// // Adds more one ninja to the ninjas set
// ninjas.add('Kelly');

// // Tests
// assert(ninjas.size === 4, 'There are four ninjas in total.');
// assert(
//   ninjas.has('Kuma') && ninjas.has('Hattori') && ninjas.has('Yoshi') && ninjas.has('Kelly'),
//   'Their name are Kuma, Hattori, Yoshi, and Kelly.'
// );

// // Iterates over the ninjas set (uses the for...of loop)
// for (const ninja of ninjas) {
//   report(ninja);
// }
// // -> Kuma
// // -> Hattori
// // -> Yoshi
// // -> Kelly
// -------------------------------------------------------------------------------------------------------

/** UNION OF SETS */

/**
 * Actually, union of two arrays create a new set contains all elements of two arrays, and each of element
 * appears once in the new set.
 */

// // Defines an array of ninjas
// const ninjas = ['Yoshi', 'Kuma', 'Hattori'];
// // Defines an array of samurai
// const samurai = ['Yoshi', 'Kelly', 'David'];

// // Defines a new set, named warriors, contains all ninjas and samurai
// const warriors = new Set([...ninjas, ...samurai]);

// // Tests
// assert(warriors.size === 5, 'There are five warriors in total.');
// assert(
//   warriors.has('Yoshi') &&
//     warriors.has('Kuma') &&
//     warriors.has('Hattori') &&
//     warriors.has('Kelly') &&
//     warriors.has('David'),
//   'Their names are Yoshi, Kuma, Hattori, Kelly, and David.'
// );
// -------------------------------------------------------------------------------------------------------

/** INTERSECTION OF SETS */

/**
 * Intersection of two sets creates a new set contains elements contained in both two sets.
 */

// // Defines a set of ninjas
// const ninjas = new Set(['Yoshi', 'Kuma', 'Hattori']);
// // Defines a set of samurai
// const samurai = new Set(['Tomoe', 'Yoshi', 'Kuma', 'Gyu', 'Ado']);

// // Defines a new set
// const ninjaSamurais = new Set([...ninjas].filter((ninja) => samurai.has(ninja)));

// // Tests
// assert(ninjaSamurais.size === 2, 'There are two ninjas are also so samurai.');
// assert(ninjaSamurais.has('Yoshi') && ninjaSamurais.has('Kuma'), 'Their names are Yoshi and Kuma.')
// -------------------------------------------------------------------------------------------------------

/** DIFFERENCE OF SETS */

/**
 * Difference of set A and set B create a new set that contains element contained in set A, but not in set B
 */

// Defines a set of ninjas
const ninjas = new Set(['Yoshi', 'Kuma', 'Hattori']);
// Defines a set of samurai
const samurai = new Set(['David', 'Yoshi', 'Kelly']);

// Defines a new set
const pureNinjas = new Set([...ninjas].filter((ninja) => !samurai.has(ninja)));

// Tests
assert(pureNinjas.size === 2, 'There are two pure ninjas.');
assert(pureNinjas.has('Kuma') & pureNinjas.has('Hattori'), 'Their names are Kuma and Hattori.');
