/** Overview of ES6 module syntax */

// // Export a named variable.
// export const ninja = 'Yoshi';

// // Export a named function.
// export function compare() {}

// // Export a named class
// export class Ninja {}

// ---------------------------------------------

// // Export the default class export.
// export default class Samurai {}

// // Export the default function export.
// export default function Warrior() {}

// ---------------------------------------------

// const ninja = 'Yoshi';
// function compare() {}

// // Export existing variables
// export { ninja, compare };

// // Export a variable through a new name
// export { ninja as warrior, compare };

// ---------------------------------------------

// // Import a default export
// import Ninja from './Ninja.js';

// // Import named exports
// import { ninja, Ninja } from './Ninja.js';

// ---------------------------------------------

// // Import all named exports from a module
// import * as Ninja from './Ninja.js';

// ---------------------------------------------

// // Import a named export through a new name
// import { ninja as iNinja } from './Ninja.js';
