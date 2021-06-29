/**
 * The getters and setters allow us to specify properties that are accessed as standard properties,
 * but that are methods whose execution is triggered immediately when the property is accessed.
 *
 * We can use getters and setters for logging, performing data validation, and defining computed properties.
 */

/**
 * Defining getters and setters
 */

/**
 * In Javascript, getter and setter methods can be defined in two ways:
 *    * By specifying them within object literals or within ES6 class definitions (using get and set keywords).
 *    * By using the built-in Object.defineProperty within constructor function.
 */

/**
 * 1.1 -  Defines getters and setters within object literals
 */

// // Defines a object literal
// const ninjaCollection = {
//   ninjas: ['Yoshi', 'Kuma', 'Hattori'],

//   // Getter
//   get firstNinja() {
//     report('Getter is called.');
//     return this.ninjas[0];
//   },

//   // Setter
//   set firstNinja(value) {
//     report('Setter is called.');
//     this.ninjas[0] = value;
//   },
// };

// // Tests
// assert(ninjaCollection.firstNinja === 'Yoshi', 'The first ninja is Yoshi.');
// ninjaCollection.firstNinja = 'Peter';
// assert(
//   ninjaCollection.firstNinja === 'Peter' && ninjaCollection.ninjas[0] === 'Peter',
//   'Now, the first ninja is Peter.'
// );
// ----------------------------------------------------------------------

/**
 * 1.2 - Defines getters and setters within ES6 class definitions
 */

// // Defines a Ninja class
// class Ninja {
//   constructor() {
//     this._level = 0;
//   }

//   // Getter
//   get level() {
//     report('Getter is called.');
//     return this._level;
//   }

//   // Setter
//   set level(value) {
//     report('Setter is called.');
//     this._level = value;
//   }
// }

// // Tests
// const ninja = new Ninja();
// assert(ninja.level === 0, 'At the beginning, our ninja has level 0.');
// ninja.level = 10;
// assert(ninja.level === 10, 'Now, the level is 10.');
// ----------------------------------------------------------------------

/**
 * 2. - Using the built-in Object.defineProperty method to define getters and setters within a constructor function
 *      (We can use "private" object property)
 */

// // Defines a Ninja constructor function
// function Ninja() {
//   // Declares a "private" object property named "_level"
//   let _level = 0;

//   // Defines a "normal" object property named "level"
//   Object.defineProperty(this, 'level', {
//     // Getter
//     get: () => {
//       report('Getter is called.');
//       return _level;
//     },
//     // Setter
//     set: (value) => {
//       report('Setter is called.');
//       _level = value;
//     },
//   });
// }

// // Tests
// const ninja = new Ninja();
// assert(typeof ninja._level === 'undefined', 'We cannot access the "private" variale!');
// assert(ninja.level === 0, 'But we can access it through a getter method.');
// ninja.level = 20;
// assert(ninja.level === 20, 'And we can assign to "private" variable a new value.');
