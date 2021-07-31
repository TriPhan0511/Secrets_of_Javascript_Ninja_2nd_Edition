/** 9.3.3 - Intersection of sets */

/**
 * The intersection of two sets A and B, creates a set that contains element of A that are
 * also in B.
 *
 * For example, we can find ninjas that are also samurai, as shown next.
 */

const ninjas = new Set(['Kuma', 'Hattori', 'Yagyu']);
const samurai = new Set(['Hattori', 'Oda', 'Tomoes']);

// Uses the spread operator to turn out set into an array
// so we can use the array's filter method to
// keep only ninjas that are contained in the samurai set.
const ninjaSamurais = new Set([...ninjas].filter((ninja) => samurai.has(ninja)));

assert(ninjaSamurais.size === 1, 'There is only one ninja samurai.');
assert(ninjaSamurais.has('Hattori'), 'Hattori is his name.');

/**
 * The idea behind listing 9.22 is to create a new set that contains only ninjas who are
 * also samurai. We do this by taking advantage of the array's filter method, which, as
 * you'll remember, creates a new array that contains only items that match a certain
 * criterion. In this case, the criterion is that the ninjas is also a samurai (is contained
 * in the set of samurai). Because the filter method can only be used on arrays, we have
 * to turn the ninjas set into an array by using the spread operator:
 *
 *    [...ninjas]
 *
 * Finally, we check that we've found only one ninja who's also a samurai: the Jack of all
 * trades: Hattori.
 */
