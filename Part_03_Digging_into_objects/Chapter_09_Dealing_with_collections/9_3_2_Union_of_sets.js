/** 9.3.2 - Union of sets */

/**
 * A union of two sets, A and B, creates a new set that contains all elements from both A
 * and B. Naturally, each item can't occur more than once in the new set.
 */

/** Listing 9.21 - Using sets to perform a union of collections */

// Creates an array of ninjas and samurai.
// Notice that Hattori is both a ninja and a samurai.
const ninjas = ['Kuma', 'Hattori', 'Yagyu'];
const samurai = ['Hattori', 'Oda', 'Tomoe'];

// Creates a new set of warriors by spreding ninjas and samurai
const warriors = new Set([...ninjas, ...samurai]);

// All ninjas and samurai are included in the new warriors set.
assert(warriors.has('Kuma'), 'Kuma is here.');
assert(warriors.has('Hattori'), 'Hattori is here.');
assert(warriors.has('Yagyu'), 'Yagyu is here.');
assert(warriors.has('Oda'), 'Oda is here.');
assert(warriors.has('Tomoe'), 'Tomoe is here.');

// There are no duplicates in the new set.
// Even though Hattori is in both the ninjas and samurai sets, he is included only once.
assert(warriors.size === 5, 'There are five warriors in total.');

/**
 * We first create an array of ninjas and an array of samurai. Notice that Hattori is leading
 * a busy life: samurai by day, ninja by night. Now imagine that we need to create a collection
 * of people whom we can call to arms if a neighboring daimyo decides that his province is a
 * bit cramped. We create a new set, warriors, that includes all ninjas and and all samurai.
 * Hattori in both collections, but we want to include him only once - it's not like two Hattoris
 * will respond our call.
 *
 * In this case, a set is perfect! We don't need to manually keep track of whether an item has
 * been already included: The set takes care of by itself, automatically. When creating this
 * new set, we use the spread operator [...ninjas, ...samurai] (rember chapter 3) to create
 * a new array that contains all ninjas and samurai. In case you're wondering, Hattori is
 * present twice in this new array. But when we finally pass that array to the Set constructor,
 * Hattori is included only once.
 */
