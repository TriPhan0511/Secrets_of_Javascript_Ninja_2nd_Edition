/** 9.3 - Sets */

/**
 * In many real-world problems, we have to deal with collection of distinct items (meaning
 * each item can't appear more than one) called sets. Up to ES6, this was something you had
 * to implement yourself by mimicking sets with standard objects. For a crude example, see
 * the next listing.
 */

/** Listing 9.19 - Mimicking sets with objects */

function Set() {
  // Uses an object to store items
  this.data = {};
  this.length = 0;
}

// Checks whether the item is already stored
Set.prototype.has = function (item) {
  return typeof this.data[item] !== 'undefined';
};

// Adds an item only if it isn't already contained in the set
Set.prototype.add = function (item) {
  if (!this.has(item)) {
    this.data[item] = true;
    this.length++;
  }
};

// Removes an item if it's already contained in the set.
Set.prototype.remove = function (item) {
  if (this.has(item)) {
    delete this.data[item];
    this.length--;
  }
};

// Try to add Hattori twice
const ninjas = new Set();
ninjas.add('Hattori');
ninjas.add('Hattori');

assert(ninjas.has('Hattori') && ninjas.length === 1, 'Our set contains only one Hattori.');

// Removes Hattori and checks that he was removed from the set
ninjas.remove('Hattori');
assert(!ninjas.has('Hattori') && ninjas.length === 0, 'Our set is now empty!');

/**
 * Listing 9.19 shows a simple example of how sets can be mimicked with objects. We use a
 * data-storage object, data, to keep track of our set items, and we expose three methods:
 * has, which checks whether an item is already contained in the set;
 * add, which adds an item only if the same item isn't already contained in the set; and
 * remove, which removes an already-contained item from the set.
 *
 * But this is a poor doppelganger. Because with maps, you can;t really store objects -
 * only strings and nunmbers - and there's always the risk of accessing prototype objects.
 * For these reasons, the ECMSScript committee decided to introduce a completely new type
 * of collection: sets
 */
