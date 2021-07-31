/** 9.2.3 - Iterating over maps */

/**
 * So far, you've seen some of the advantages of maps: You can be sure they contain only
 * items that you put in them, and you can use anything as a key. But there's more!
 *
 * Because maps are collections, there's nothing stopping us form iterating over them
 * with for...of loops. (Remember, we used the for...of loop to iterate over values
 * created by generators in chapter 6) . You're also guaranteed that these values will
 * be visited in the order in which they were inserted (something we can't rely on when
 * iterating over objects using the for...in loop).
 *
 * Let's look at the following example.
 */

/** Listing 9.18 - Iterating over maps */

// Creates a new map
const directory = new Map();

// Creates a ninja directory that stores each ninja's phone number.
directory.set('Yoshi', '+81 26 6472');
directory.set('Kuma', '+81 52 2378 6462');
directory.set('Hiro', '+81 76 277 46');

// Iterates over each item in a directory using the for...of loop.
// Each item is a two-item array: a key and a value
for (const item of directory) {
  assert(item[0] !== null, `Key: ${item[0]}`);
  assert(item[1] !== null, `Value: ${item[1]}`);
}

// We can also iterate over keys using the built-in keys method...
for (const key of directory.keys()) {
  assert(key !== null, `Key: ${key}`);
  assert(directory.get(key) !== null, `Value: ${directory.get(key)}`);
}

// ... and over values using built-in values method
for (const value of directory.values()) {
  assert(value !== null, `Value: ${value}`);
}
