/** Chapter 09 - Arrays */

/**
 * If your programming background is in a strongly typed languague such as C,
 * you probably think of arrays as sequential chunks of memory that house items
 * of the same type, where each chunk of memory is of fixed size and has an
 * associated index through which you can easily access it.
 *
 * But as with many things in Javascript, arrays come with a twist: They're
 * just objects. Although this leads to some unfortunate side effects,
 * primarily in terms of performance , it also some benefits. For example,
 * arrays can access methods, like other objects-methods that will make our
 * lives a lot easier.
 *
 * In this section, we'll first lokk at ways to create arrays. Then we'll
 * explore how to add items to and remove items from different positions
 * in an array. Finally, we'll examine the built-in array methods that will
 * make our array-handling code much more elegant.
 */
// ---------------------------------------------------------------------------------------------

/** 9.1.1 - Creating arrays */

/**
 * There are two fundamental ways to create new arrays:
 *
 *  _ Using the built-in Array constructor.
 *
 *  _ Using array literals [].
 *
 * Let's start with a simple example in which we create an array of ninjas and an array of samurai.
 */

/** Listing 9.1 - Creating arrays */

// // To create an array, we can use an array literal []...
// const ninjas = ['Kuma', 'Hattori', 'Yagyu'];
// // ... or the built-in Array constructor.
// const samurai = new Array('Oda', 'Tomoe');

// // The length property tells us the size of the array.
// assert(ninjas.length === 3, 'There are three ninjas.');
// assert(samurai.length === 2, 'And only two samurai.');

// // We access array items with index notation:
// // The first item is indexed with 0, and the last with array.length - 1.
// assert(ninjas[0] === 'Kuma', 'Kuma is the first ninja.');
// assert(samurai[samurai.length - 1] === 'Tomoe', 'Tomoe is the last samurai.');

// // Reading items outside the array bounds results in undefined.
// assert(ninjas[4] === undefined, 'We get undefined if we try to access an out of bounds index.');

// // Writing to indexes outside the array bounds etxtends the array.
// ninjas[4] = 'Ishi';
// assert(ninjas.length === 5, 'Arrays are automatically expanded.');

// // Manually overriding the array length property
// // with a lower value deletes the excess items.
// ninjas.length = 2;
// assert(ninjas.length === 2, 'There are only two ninjas now.');
// assert(ninjas[0] === 'Kuma' && ninjas[1] === 'Hattori', 'Kuma and Hattori.');
// assert(ninjas[2] === undefined, "But we've lost Yagyu.");

/**
 * Array literals versus the Array constructor
 * Using array literals to create arrays is preferred over creating arrays with the Array constructor.
 * The primary reason is simplicity: [] versus new Array(). In addition, because Javascript is highly
 * dynamic, nothing stops someone from overriding  the built-in Array constructor, which means calling
 * new Array() doesn't neccessarily have to create an array. Thus we recommend that you generally stick
 * to array literals.
 */

/**
 * Unlike in most other languages, in Javascript, arrays also exhibit a peculiar feature related to
 * the length property: Nothing stops us from manually changing its value. Setting a value higher than
 * the current length will expand the array with undefined items, whereas setting the value to a lower
 * value will trim the arrays, as in ninja.length = 2;.
 */
