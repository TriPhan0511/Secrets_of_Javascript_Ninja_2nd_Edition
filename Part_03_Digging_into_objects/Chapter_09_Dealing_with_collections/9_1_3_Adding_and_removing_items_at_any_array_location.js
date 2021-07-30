/** 9.1.3 - Adding and removing items at any array location */

/**
 * The previous example removed items from the beginning and end of the array. But this
 * is too constraining - in general, we should be able to remove items from any array
 * location. One straightforward approach for doing this shown in the following listing.
 */

/** Listing 9.3 - Naive way to remove an array item */

// const ninjas = ['Yagyu', 'Kuma', 'Hattori', 'Fuma'];

// // Use the delete command to delete an item.
// delete ninjas[1];

// // We deleted an item, but the array still reports that it has 4 items.
// // We've only created a hole in the array.
// assert(ninjas.length === 4, 'Length still reports that there are 4 items.');
// assert(ninjas[0] === 'Yagyu', 'First item is Yagyu.');
// assert(ninjas[1] === undefined, "We've simply createda hole.");
// assert(ninjas[2] === 'Hattori', 'Hattori is still the third item.');
// assert(ninjas[3] === 'Fuma', 'And Fuma is the last item.');

/**
 * This approach to deleting an item from an array doesn't work. We effectively only create
 * a hole in the array. The array still reports that it has four items, but one of them -
 * the one we wanted to delete - is undefined.
 */
// -------------------------------------------------------------------------------------------------

/**
 * Similarly, if we wanted to insert an item at an arbitrary position, where would we even start?
 * As an answer to these problems, all Javascript arrays have access to the splice method:
 * Starting from a given method, this method removes and inserts items.
 *
 * Check out the following example.
 */

/** Listing 9.4 - Removing and adding at arbitray positions */

// Creates a new array with four items
const ninjas = ['Yagyu', 'Kuma', 'Hattori', 'Fuma'];

// Uses the built-in splice method to remove one element, startung at index 1.
let removedItems = ninjas.splice(1, 1);

// splice returns an array of the removed items.
// In this case, we removed one item.
assert(removedItems.length === 1, 'One item was removed.');
assert(removedItems[0] === 'Kuma', 'Kuma was removed.');

// The ninjas array no longer contains Kuma;
// subsequent items were automactically shifted.
assert(ninjas.length === 3, 'There are now three items in the array.');
assert(ninjas[0] === 'Yagyu', 'The first item still Yagyu.');
assert(ninjas[1] === 'Hattori', 'Hattori is now in the second place.');
assert(ninjas[2] === 'Fuma', 'And Fuma is in the third place.');

// We can insert an element at a position by adding arguments to the splice call.
// ['Yagyu', 'Hattori', 'Fuma'] -> ['Yagyu', 'Mochizuki', 'Yoshi', 'Momochi']
// removedItems: ['Hattori', 'Fuma']
removedItems = ninjas.splice(1, 2, 'Mochizuki', 'Yoshi', 'Momochi');
assert(removedItems.length === 2, "Now, we've remove two items.");
assert(removedItems[0] === 'Hattori', 'Hattori was removed.');
assert(removedItems[1] === 'Fuma', 'Fuma was removed.');
assert(ninjas.length === 4, "We've inserted some new items.");
assert(ninjas[0] === 'Yagyu', 'Yagyu is still here.');
assert(ninjas[1] === 'Mochizuki', 'Mochizuki also.');
assert(ninjas[2] === 'Yoshi', 'Yoshi also.');
assert(ninjas[3] === 'Momochi', 'And Momochi.');

/**
 * Now that we've given you a refresher on how array work, let's continue by studying some
 * common operations that are performed on arrays. These will help you write more elegant
 * array-handling code. 
 */
