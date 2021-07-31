/** 9.3.1 - Creating our first set */

/**
 * The cornerstone of creating sets is the newly introduced constructor function,
 * conveniently named Set.
 *
 * Let's look at an example.
 */

/** Listing 9.20 - Creating a set */

// The Set constructor can take an array of items with which the set is initialized.
const ninjas = new Set(['Kuma', 'Hattori', 'Yagyu', 'Hattori']);

// Discards any duplicate items
assert(ninjas.has('Hattori'), 'Hattori is in our set.');
assert(ninjas.size === 3, 'There are only three ninja in our sets');

// We can add new items that aren't already contained in our set.
assert(!ninjas.has('Yoshi'), 'Yoshi is not in, yet...');
ninjas.add('Yoshi');
assert(ninjas.has('Yoshi'), 'Yoshi is added');
assert(ninjas.size === 4, 'There are four ninjas in our set!');

// Adding existing items has no effect
assert(ninjas.has('Kuma'), 'Kuma is already added.');
ninjas.add('Kuma');
assert(ninjas.size === 4, 'Adding Kuma again has no effect.');

// Iterates through the set with a for...of loop
for (const ninja of ninjas) {
  assert(ninja !== null, ninja);
}

/**
 * Here we use the built-in Set constructor to create a new ninjas set that will contain 
 * distinct ninjas. If we don't pass any arguments, an empty set is created. We can also
 * pass in an array, such as this, which pre-fills the set:
 * 
      const ninjas = new Set(['Kuma', 'Hattori', 'Yagyu', 'Hattori']);
 * 
 * As we already mentioned, sets are collections of unique items, and their primarily
 * purpose is to stop us from storing multiple occurences of the same object. In this case,
 * this means 'Hattori', which we tried to add twice, is added only once.
 * 
 * A number of methods are accessible from every set. For example, the has method checks
 * whether an item is contained in the set:
 * 
      ninjas.has('Hattori')
 * 
 * and the add method is used to add unique items to the set:
 * 
      ninjas.add('Yoshi')
 * 
 * If you're curious about how many items are in the sets, you can always use the szie property:
 * 
      ninja.size
 * 
 * Similar to maps and arrays, sets are collections, so we can iterate over them 
 * with a for...of loop.
 * 
      for (const ninja of ninjas) {
        assert(ninja !== null, ninja);
      }
 * 
 */

/**
 * Now that we've gone through the basics of sets, let's visit some common operations on sets:
 * unions, intersecttions, and differences.
 */
