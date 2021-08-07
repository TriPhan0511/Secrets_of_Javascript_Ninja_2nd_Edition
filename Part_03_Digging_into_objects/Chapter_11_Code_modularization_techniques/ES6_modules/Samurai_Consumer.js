// // When importing a default exportm there's no need for braces,
// // and we can use whatever name we want
// import ImportedSamurai from './Samurai.js';

// // We can still import named exports.
// import { compareSamurais } from './Samurai.js';

// Shorthand syntax:
import ImportedSamurai, { compareSamurai } from './Samurai.js';

// Creates a copule of samurai, and tests that they exist.
const samurai1 = new ImportedSamurai('Yoshi');
const samurai2 = new ImportedSamurai('Hattori');

assert(samurai1 !== undefined && samurai2 !== undefined, 'We can create a couple of Samurai.');

// We can also access the named exports
assert(!compareSamurai(samurai1, samurai2), 'We can compare samurai.');
