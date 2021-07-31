/** 9.2.2 - Creating our first map */

/**
 * Creating maps is easy: We use a new, built-in Map constructor.
 * Looking at the following example.
 */

/** Listing 9.16 - Creating our first map */

/** NOTE
 * a map has some method: set, get, size, has, delete, clear.
 */

// // Uses the Map constructor to create a map.
// const ninjaIslandMap = new Map();

// // Defines three ninja objects
// const ninja1 = { name: 'Yoshi' };
// const ninja2 = { name: 'Hattori' };
// const ninja3 = { name: 'Kuma' };

// // Creates a mapping for the first two objects by using the map set method
// ninjaIslandMap.set(ninja1, { homeIsland: 'Honshu' });
// ninjaIslandMap.set(ninja2, { homeIsland: 'Hokkaido' });

// // Gets the mapping for the first two objects by using the map get method
// assert(ninjaIslandMap.get(ninja1).homeIsland === 'Honshu', 'The first mapping works.');
// assert(ninjaIslandMap.get(ninja2).homeIsland === 'Hokkaido', 'The sedond mapping works.');

// // Checks that there's no mapping for the third ninja
// assert(ninjaIslandMap.get(ninja3) === undefined, 'Ther is no mapping for the third ninja!');

// // Checks that the map contains mappings for the first two ninjas, but not for the third one!
// assert(ninjaIslandMap.size === 2, "We've created two mapping.");

// // Uses the has method to check whether a mapping for a particular key exists.
// assert(
//   ninjaIslandMap.has(ninja1) && ninjaIslandMap.has(ninja2),
//   'We have mappings for the first two ninjas'
// );
// assert(!ninjaIslandMap.has(ninja3), 'But not for the third ninja.');

// // Use the delete method to delete a key from the map
// ninjaIslandMap.delete(ninja1);
// assert(
//   !ninjaIslandMap.has(ninja1) && ninjaIslandMap.size === 1,
//   "There's no first ninja mapping anymore!"
// );

// // Uses the clear method to completely clear the map
// ninjaIslandMap.clear();
// assert(ninjaIslandMap.size === 0, 'All mappings have been cleared!');

/**
 * In this example, we create a new map by calling the built-in Map constructor:
 * 
      const ninjaIslandMap = new Map();
 * 
 * Next, we create three ninja objects, cleverly called ninja1, ninja2, and ninja3.
 * We then use the built-in map set method:
 * 
      ninjaIslandMap.set(ninja1, { homeIsland: 'Honshu' });
 * 
 * This creates a mapping between a key - in this case, the ninja1 object - and a value -
 * in this case, an object carrying the information about the ninja's home island. We do this
 * for the first two ninjas, ninja1 and ninja2.
 * 
 * In the next step, we obtain the mapping for the first two ninjas by using another built-in 
 * map method, get:
 * 
      assert(ninjaIslandMap.get(ninja1).homeIsland === 'Honshu', 'The first mapping works.');
 * 
 * The mapping of course exists for the first two ninjas, but it doesn't exist for the third ninja, 
 * because we haven't used the third ninja as an argument to the set method.
 */

/**
 * In addition to get and set method, every map also has a built-in szie property and has and delete
 * methods. 
 * 
 * The size property tells us how many mappings we've created. In this case, we've created only two 
 * mappings.
 * 
 * The has method, on the other hand, notifies us whether a mapping for a particular key alrweady exist:
 * 
      ninjaIslandMap.has(ninja1); // true
      ninjaIslandMap.has(ninja3); // false
 * 
 * The delete method enables us to remove items from our map:
 * 
      ninjaIslandMap.delete(ninja1);
 */
// ---------------------------------------------------------------------------------------------------

/**
 * One of the fundamental concepts when dealing with maps is determining when two map keys are equal.
 * Let's explore this concept.
 */

/** KEY EQUALITY */

/** Listing 9.17 - Key equality in maps */

// Defines a new map
const map = new Map();

// Uses the built-in location.href property to get the current page URL
const currentLocation = location.href;

// Creates two links to the current page
const firstLink = new URL(currentLocation);
const secondLink = new URL(currentLocation);

// Adds a mapping for both links
map.set(firstLink, { description: 'firstLink' });
map.set(secondLink, { description: 'secondLink' });

// Each link gets its own mapping, even though they point to the same page.
assert(map.get(firstLink).description === 'firstLink', 'First link mapping.');
assert(map.get(secondLink).description === 'secondLink', 'Second link mapping.');
assert(map.size === 2, 'There are two mappings.');

/**
 * In listing 9.17, we use the built-in location.href property to obtain the URL of the current page.
 * Next, by using the built-in URL constructor, we create two new URL objects that link to the current
 * page.
 * We then associate a description object with each link.
 * Finally, we check that the correct mappings have ben created.
 *
 * People who have mostly worked in Javascript may not find this result unexpected: We have two different
 * objects for which we create two different mappings. But notice that two URL objects, even though they're
 * separate objects, still point to the same URL location: the location of the current page. We could argue
 * that, when creating mappings, these two objects should be considered equal. But in Javascript, we can't
 * overload the equality operator, and the two objects, even though they have the same content, are always
 * considered different. This isn't the case with other languages, such as Java and C#, so be careful!
 */
