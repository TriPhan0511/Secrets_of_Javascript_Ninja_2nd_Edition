/** 9.1.2 - Adding and removing items at either end of an array */

/**
 * Let's start with the following simple methods we can use to add items and remove items
 * from an array:
 *
 *  _ push adds an item to the end of the array.
 *
 *  _ unshift adds an item to the beginning of the array.
 *
 *  _ pop removes an item from the end of the array.
 *
 *  _ shift removes an item from the beginning of the array.
 */

/** Listing 9.2 - Adding and removing array items */

// Creates a new empty array
const ninjas = [];
assert(ninjas.length === 0, 'An array starts empty.');

// Pushes a new item to the end of the array.
ninjas.push('Kuma');
assert(ninjas[0] === 'Kuma', 'Kuma is the first item in the array.');
assert(ninjas.length === 1, 'We have one item in the array.');

// Pushes another item to the end of the array.
ninjas.push('Hattori');
assert(ninjas[0] === 'Kuma', 'Kuma is still first.');
assert(ninjas[1] === 'Hattori', 'Hattori is added to the end of the array.');
assert(ninjas.length === 2, 'We have two items in the array.');

// Uses the built-in unshift method to insert the item at the beginning of the array.
// Other items are adjusted accordingly.
ninjas.unshift('Yagyu');
assert(ninjas[0] === 'Yagyu', 'Now Yagyu is the first item.');
assert(ninjas[1] === 'Kuma', 'Kuma moved to the second place.');
assert(ninjas[2] === 'Hattori', 'And Hattori to the third place.');
assert(ninjas.length === 3, 'We have three items in the array.');

// Pops the last item from the array
const lastNinja = ninjas.pop();
assert(lastNinja === 'Hattori', "We've removed Hattori from the end of the array.");
assert(ninjas[0] === 'Yagyu', 'Now Yagyu is still the first item.');
assert(ninjas[1] === 'Kuma', 'Kuma is still the second item.');
assert(ninjas.length === 2, 'Now there are two items in the array.');

// Removes the first item from the array.
// Other items are moved to the left accordingly.
const firstNinja = ninjas.shift();
assert(firstNinja === 'Yagyu', "We've removed Yagyu from the beginning of the array.");
assert(ninjas[0] === 'Kuma', 'Kuma has shifted to the first place.');
assert(ninjas.length === 1, 'There is only one item in the array.');

/**
 * Performance considerations: pop and push versus shift and unshift
 * The pop and push methods only affect the last item in an array: pop by removing the
 * last item, and push by inserting an item at the end of the array. On the other hand,
 * the shift and unshift methods change the first item in the array. This means the
 * indexes of any subsequent array items have to ba adjusted. For this reason, push and
 * pop are sugnificantly faster operations then shift and unshift, and we recommend using
 * them unless you have a good reason to do otherwise.
 */
