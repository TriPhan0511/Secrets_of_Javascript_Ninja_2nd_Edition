/** 3.2.1 - Storing functions */

/**
 * In certain cases (for example, when we need to manage collections of callbacks that should be invoked when
 * a certain event occurs), we want to store collections of unique functions. When adding function to such a
 * collection, a challenge we can face is determing functions are new to the collection and should be added, and
 * which are already resident and shouldn't be added. In general, when managing callback functions, we don't want
 * any duplicates, because a single event would result in multiple calls to the same callback.
 */

/**
 * An obvious, but naive, technique is to store all the functions in an array and loop through the array, checking
 * for duplicate functions. Unfortunately, this performs poorly, and as a ninja, we want to make things work well,
 * not merely work. We can use function properties to achieve this with an appropriate level of sophistication,
 * as shown in the next listing:
 */

/** Listing 3.2 - Storing a collection of unique functions */

let store = {
  nextId: 1, // Keeps track of the next available ID to be assigned
  cache: {}, // Creates an object to serve as a cache in which we'll store functions

  // Adds functions to the cache, but only if they're unique
  add: function (fn) {
    if (!fn.id) {
      fn.id = this.nextId++;
      this.cache[fn.id] = fn;
      return true;
    }
  },
};

// Tests that all work as planned
function ninja() {}
assert(store.add(ninja), 'Function was safely added.');
assert(!store.add(ninja), 'But it was only added once.');

/**
 * In this listing, we create an object assigned to the variable store, in which we'll store a unique set 
 * of functions.
 * This object has two data properties: one that stores a next available id value
 */
