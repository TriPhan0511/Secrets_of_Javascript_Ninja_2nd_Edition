/** 9.3.4 - Difference of sets */

/**
 * The difference of two sets, A and B, contains all elements that are in set A but not in set B.
 * As you might guess, this is similar to the intersection of sets, with one small but significant
 * difference.
 *
 * In the next listing, we want to find only true ninjas (not those who also moonlight as samurai.)
 */

/** Listing 9.23 - Difference of sets */

const ninjas = new Set(['Kuma', 'Hattori', 'Yagyu']);
const samurai = new Set(['Hattori', 'Oda', 'Tomoe']);

// With set difference, we care only about ninjas who are not samurai!
const pureNinjas = new Set([...ninjas].filter((ninja) => !samurai.has(ninja)));

assert(pureNinjas.size === 2, 'There are two pure ninjas.');
assert(pureNinjas.has('Kuma') && pureNinjas.has('Yagyu'), 'They are Kuma and Yagyu.');

/**
 * The only change is to specify that we care only about the ninjas who are not also samurai,
 * by pitting an exclamation mark (!) before the samurai.has(ninja) expression.
 */
