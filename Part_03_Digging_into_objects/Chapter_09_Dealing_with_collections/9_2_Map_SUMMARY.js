/** 9.2 - Map - SUMMARY */

// // Defines a new map
// const map = new Map();

// // Defines three ninja objects
// const ninja1 = { name: 'Yoshi' };
// const ninja2 = { name: 'Hattori' };
// const ninja3 = { name: 'Kuma' };

// // Using the built-in map set method to create mapping for the first two ninjas
// map.set(ninja1, { home: 'Honshu' });
// map.set(ninja2, { home: 'Hokkaido' });

// // Using the built-in map get method to retrieve the mapping
// assert(map.get(ninja1) && map.get(ninja1).home === 'Honshu', 'The home land of ninja1 is Honshu.');
// assert(
//   map.get(ninja2) && map.get(ninja2).home === 'Hokkaido',
//   'The home land os ninja2 is Hokkaido.'
// );
// assert(map.get(ninja3) === undefined, 'ninja3 does not have any mapping.');

// // Using the built-in map has method to indicate whether a key in the map
// assert(
//   map.has(ninja1) && map.has(ninja2) && !map.has(ninja3),
//   'ninja1 and ninja2 have mapping in the map, but ninja3 does not.'
// );

// // Using the map size property to indicate how many mappings in the map
// assert(map.size === 2, 'There are two mappings in the map.');

// // Using the built-in map delete method to delete a mapping in the map
// map.delete(ninja1);
// assert(
//   !map.has(ninja1) && map.size === 1,
//   'The mapping of ninja1 has been deleted. Now there is only one mapping in the map.'
// );

// // Using the built-in map clear method to delete all of mappings in the map
// map.clear();
// assert(!map.has(ninja1) && !map.has(ninja2) && map.size === 0, 'There is no mapping in the map.');
// ----------------------------------------------------------------------------------------------

// ITERATING OVER MAPS

// Defines a new map
const map = new Map();
// Defines three ninja objects
const ninja1 = { name: 'Yoshi' };
const ninja2 = { name: 'Hattori' };
const ninja3 = { name: 'Kuma' };

// Creates three mappings for three ninjas
map.set(ninja1, { home: 'Honshu' });
map.set(ninja2, { home: 'Hokkaido' });
map.set(ninja3, { home: 'Sendai' });

// // Using a for...of loop
// for (const item of map) {
//   report(`Ninja's name: ${item[0].name}, homeland: ${item[1].home}`);
// }

// // Using the built-in map values method
// for (const item of map.values()) {
//   report(`Homeland: ${item.home}`);
// }

// Using the built-in keys method
for (const key of map.keys()) {
  report(`Ninja: ${key.name}, Homeland: ${map.get(key).home}`)
}
