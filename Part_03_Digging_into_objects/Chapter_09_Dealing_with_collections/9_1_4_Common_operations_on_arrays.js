/** 9.1.4 - Common operations on arrays */

/**
 * In this section, we'll explore some of the most common operations on arrays:
 *
 *  _ Iterating (or traversing) through arrays.
 *
 *  _ Mapping existing array items to create a new array based on them.
 *
 *  _ Testing array items to check whether they satisfy certain conditions.
 *
 *  _ Finding specific array items.
 *
 *  _ Sorting arrays.
 *
 *  _ Aggregating arrays and computing a single value based on array items
 *    (for example, calculating the sum of an array).
 */

/** We'll start with the basics: array iterations. */
// ----------------------------------------------------------------------------------------------------------------

/** ITERATING OVER ARRAYS */

/**
 * To make life easy, all Javascript arrays have a built-in forEach method
 */

/** Listing the forEach method */

// const ninjas = ['Yagyu', 'Kuma', 'Hattori'];

// // Uses the built-in forEach method to iterate over the array
// ninjas.forEach((ninja) => assert(ninja !== null, ninja));
// // -> Yagyu
// // -> Kuma
// // -> Hattori

/**
 * We provide a callback (in this case, an arrow function) that's called immediately, for each
 * item in the array
 */
// -----------------------------------------------------------------------------------------------

/** MAPPING ARRAYS */

/**
 * Imagine that you have an array of ninja objects. Each ninja has a name and a favorite weapon,
 * and you want to extract an array of weapons from the ninja array. Armed with the knowledge of
 * the forEach method, you might writing something like the following listing.
 */

/** Listing */

// const ninjas = [
//   { name: 'Yagyu', weapon: 'shuriken' },
//   { name: 'Yoshi', weapon: 'katana' },
//   { name: 'Kuma', weapon: 'wakizashi' },
// ];

// // Creates a new array and
// // uses a forEach loop over ninjas to extract individual ninja weapons
// const weapons = [];
// ninjas.forEach((ninja) => weapons.push(ninja.weapon));
// // weapons.forEach((weapon) => assert(weapon, weapon));

// assert(
//   weapons[0] === 'shuriken' &&
//     weapons[1] === 'katana' &&
//     weapons[2] === 'wakizashi' &&
//     weapons.length === 3,
//   'The new array contains all weapons.'
// );

/**
 * As you might imagine, creating new arrays based on the items in an existing array is
 * surprisingly common - so common that it has a special name: mapping an array. The idea
 * is that we map each item on an array to a new item on a new array. Conveniently,
 * Javascript has a map function that does the exact thing, as shown in the following listing.
 */

/** Listing 9.7 - Mapping an array */

// const ninjas = [
//   { name: 'Yagyu', weapon: 'shuriken' },
//   { name: 'Yoshi', weapon: 'katana' },
//   { name: 'Kuma', weapon: 'wakizashi' },
// ];

// // The built-in map method takes a function that's called for each item in the array.
// const weapons = ninjas.map((ninja) => ninja.weapon);

// assert(
//   weapons[0] === 'shuriken' &&
//     weapons[1] === 'katana' &&
//     weapons[2] === 'wakizashi' &&
//     weapons.length === 3,
//   'The new array contains all weapons.'
// );

/**
 * The built-in map method constructs a completely new array and then iterates over the
 * input array. For each item in the input array, map places exactly one item in the newly
 * constructed array, basd on the result of the callback provided to map.
 */
// -----------------------------------------------------------------------------------------------

/** TESTING ARRAY ITEMS */

/**
 * When working with collections of items, we'll often run into situations where we need to know
 * whether all or at least some of the array items satisfy certain conditions. To write this code
 * as efficiently as possible, all Javascript arrays have access to the built-in every
 * and some methods, shown next.
 */

// const ninjas = [
//   { name: 'Yagyu', weapon: 'shuriken' },
//   { name: 'Yoshi' },
//   { name: 'Kuma', weapon: 'wakizashi' },
// ];

// // The built-in every method takes a callback that's called for each array item.
// // It returns true if the callback returns a true value for all array item, or false otherwise.
// const allNinjasAreNamed = ninjas.every((ninja) => 'name' in ninja);
// const allNinjasAreArmed = ninjas.every((ninja) => 'weapon' in ninja);

// assert(allNinjasAreNamed, 'Every ninja has a name.');
// assert(!allNinjasAreArmed, 'But not every ninja is armed.');

// // The built-in some method also takes a callback.
// // It returns trueif the callback returns a true value for at least on array item, or false otherwise.
// const someNinjasAreArmed = ninja.some((ninja) => 'weapon' in ninja);
// assert(someNinjasAreArmed, 'But some ninjas are armed.');
// -----------------------------------------------------------------------------------------------

/** SEARCHING ARRAYS */

/**
 * Another common operation that you're bound to use, sooner rather than later, is finding items
 * in an array. Again, this task is greatly simplified with another built-in array method: find.
 *
 * Let's study the foolowing listing.
 */

/** Listing 9.9 - Finding array items */

// const ninjas = [
//   { name: 'Yagyu', weapon: 'shuriken' },
//   { name: 'Yoshi' },
//   { name: 'Kuma', weapon: 'wakizashi' },
// ];

// // Uses the find method to find the first array item that satisfies a certain condition,
// // represented by a passed-in callback.
// const ninjaWithWakizashi = ninjas.find((ninja) => ninja.weapon === 'wakizashi');

// assert(
//   ninjaWithWakizashi.name === 'Kuma' && ninjaWithWakizashi.weapon === 'wakizashi',
//   'Kuma is wielding a wakazashi.'
// );

// const ninjaWithKatana = ninjas.find((ninja) => ninja.weapon === 'katana');
// assert(ninjaWithKatana === undefined, "We couldn't find a ninja wields a katana.");

// // Uses the filter method to find multiple items that satisfy a certan condition.
// const armedNinjas = ninjas.filter((ninja) => 'weapon' in ninja);
// assert(
//   armedNinjas.length === 2 && (armedNinjas[0].name === 'Yagyu') & (armedNinjas[1].name === 'Kuma'),
//   'There are two armed ninjas. They are Yagyu and Kuma.'
// );

/**
 * It's easy to find an array item that satisfies a certain condition: We use the built-in find method,
 * passing it a callback that's invoked for each item in the collection until the targeted item is found.
 * This is indicated by the callback return true. For example, the expression:
 * 
      const ninjaWithWakizashi = ninjas.find((ninja) => ninja.weapon === 'wakizashi');
 * 
 * finds Kuma, the first ninja in the ninjas array that's wielding a wakizashi.
 * 
 * If we've gone through the entire array without a single item returning true, the final result of the
 * search is undefined. For example, the code:
 * 
      const ninjaWithKatana = ninjas.find((ninja) => ninja.weapon === 'katana');
 * 
 * returns undefined, because there isn't a katana-wielding ninja.
 */

/**
 * If we need to find multiple items satisfying a certain criterion , we can the filter method,
 * which creates a new array containing all the items that satisfy that criterion. For example,
 * the expression:
 * 
      const armedNinjas = ninjas.filter((ninja) => 'weapon' in ninja);
 * 
 * creates a new armedNinjas array that contains only ninjas with a weapon. In this case, poor
 * unarmed Yoshi is left out.
 */
// ------------------------------------

/**
 * Throughout this example, you've seen how to find a particular items in an array, but in many cases
 * it might also be necessary to find the index of an item. Let's take a closer look, with the following
 * example.
 */

/** Listing 9.10 - Finding array indexes */

// const ninjas = ['Yagyu', 'Yoshi', 'Kuma', 'Yoshi'];

// assert(ninjas.indexOf('Yoshi') === 1, 'Yoshi is at index 1.');
// assert(ninjas.lastIndexOf('Yoshi') === 3, 'and at index 3.');

// const yoshiIndex = ninjas.findIndex((ninja) => ninja === 'Yoshi');
// assert(yoshiIndex === 1, 'Yoshi is still at index 1.');

/**
 * To find the index of a particular item, we use the built-in indexOf method, passing it the item whose
 * index we want to find:
 * 
      assert(ninjas.indexOf('Yoshi') === 1, 'Yoshi is at index 1.');
 * 
 * In cases where a particular item can be found multiple times in an array (as is the case with 'Yoshi' 
 * and the ninjas array), we may also interested in finding the last index of where Yoshi appears. 
 * For this, we can use the lastIndexOf method:
 * 
      assert(ninjas.lastIndexOf('Yoshi') === 3, 'and at index 3.');
 * 
 */

/**
 * Finally, in the most general case, when we don't have a reference to the exact item whose index we want
 * to search for, we can use the findIndex method:
 * 
      const yoshiIndex = ninjas.findIndex((ninja) => ninja === 'Yoshi');
 * 
 * The findIndex method takes a callback and returns the index of the first item for which the callback
 * returns true. In essence, it works a lot like the find method, the only difference being that 
 * find returns a particular item, whereas findIndex return the index of that item.
 * 
 */
// -----------------------------------------------------------------------------------------------

/**
 * SORTING ARRAYS
 */

/**
 * One of the most common array operarions is sorting - arranging items systematically in
 * some order. Unfortunately, correctly inplementing sorting algorithm isn't the esiest
 * of programming tasks: We have to to select the best sorting algorithm for the task,
 * implementing it, and tailor it to our needs, while, always, being careful not to 
 * introduce subtle bugs. To get this burden off our back, as you saw in chapter 3, all
 * Javascript arrayshave access to the built-in sort method, whose usage looks something
 * like this:
 * 
          array.sort((a, b) => a - b);
 * 
 * The Javascript engine implements the sorting algorithm. The only thing we have to provide
 * is a calback that informs the sorting algorithm about the relationship between two array
 * items. The possible results are as follows:
 * 
 * _ If a callback returns a value less than 0, then item a should come before item b.
 * 
 * _ If a callback returns a value equal to 0. then items a and b are on euqal footing
 *   (as far as the sorting algorithm is concerned, they're equal.)
 * 
 * _ If a callback returns a value greater than 0, then item a should come after item b.
 * 
 * And that's all about you need to know about the sorting algorithm. The actual sorting is
 * performed behind the scene, without us having to manually move array items around.
 * 
 * Let's look at a simple example.
 */

/** Listing 9.11 - Sorting an array */

// const ninjas = [{ name: 'Yoshi' }, { name: 'Yagyu' }, { name: 'Kuma' }];

// // Way 1:
// ninjas.sort((ninja1, ninja2) => {
//   if (ninja1.name < ninja2.name) {
//     return -1;
//   }
//   if (ninja1.name > ninja2) {
//     return 1;
//   }
//   return 0;
// });

// assert(ninjas[0].name === 'Kuma', 'Kuma is first.');
// assert(ninjas[1].name === 'Yagyu', 'Yagyu is second.');
// assert(ninjas[2].name === 'Yoshi', 'Yoshi is third.');

/**
 * Notice that we can use simple less-than (<) and greater-than (>) operators to compare two ninja names.
 */
// -----------------------------------------------------------------------------------------------

/** AGGREGATING ARRAY ITEMS */

/** How many times have you written code like the following? */

// const numbers = [1, 2, 3, 4];

// let sum = 0;
// numbers.forEach((num) => (sum += num));
// assert(sum === 10, 'sum = 10.');

/**
 * This code has to visit every item in a collection and aggregate some value, in essence
 * reducing the entire array to a single value. Don't worry - Javascript has something to
 * help with this situation, too: the reduce method, as shown in the following example.
 */

/** Listing 9.12 - Aggregating items with reduce */

const numbers = [1, 2, 3, 4];

const sum = numbers.reduce((aggregated, number) => aggregated + number, 0);

assert(sum === 10, 'The sum of first four numbers is 10.');

/**
 * The reduce method works by taking the initial value (in this case, 0) and calling th
 * callback functionon each array item with the result of the previous callback invocation
 * (or the initial value) and the current array item as arguments. The result of the reduce
 * invocation is the result of the last callback, called on the last array item.
 */
