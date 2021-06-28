// Defines getters and setters in constructor function to guard private properties
// (closure: _level variable and getter and setter in the same function scope)

// function Ninja() {
//   let _level = 0;

//   // Getter
//   this.getLevel = () => {
//     report('Getter is called.');
//     return _level;
//   };

//   // Setter
//   this.setLevel = (value) => {
//     report('Setter is called.');
//     _level = value;
//   };
// }

// // Creates an Ninja instance
// const ninja = new Ninja();

// // Tests
// assert(typeof ninja._level === 'undefined', 'We can not access "private" variable.');
// assert(ninja.getLevel() === 0, 'Initial level: 0');

// ninja.setLevel(1000);
// assert(ninja.getLevel() === 1000, 'Now, level is 1000');
// ---------------------------------------------------------------

// // Defines getters and setters in constructor function
// function Ninja() {
//   this.level = 0;

//   // Getter
//   this.getLevel = () => {
//     report('Getter is called.');
//     return this.level;
//   };

//   // Setter
//   this.setLevel = (value) => {
//     report('Setter is called');
//     this.level = value;
//   };
// }

// // Creates a Ninja instance
// const ninja = new Ninja();

// // Tests
// assert(ninja.getLevel() === 0, 'Our ninja has level at 0');

// ninja.setLevel(10);
// assert(ninja.getLevel() === 10, 'Our ninja now has level at 10');
// ---------------------------------------------------------------

// // Defines getters and setters in ES6 class
// class Ninja {
//   constructor() {
//     this.level = 0;
//   }

//   // Geter
//   getLevel() {
//     report('Getter is called.');
//     return this.level;
//   }

//   // Setter
//   setLevel(value) {
//     report('Setter is called.');
//     this.level = value;
//   }
// }

// // Creates a Ninja instance
// const ninja = new Ninja();

// // Tests
// assert(ninja.getLevel() === 0, 'Level: 0');

// ninja.setLevel(100);
// assert(ninja.getLevel() === 100 && ninja.level === 100, 'Level: 100');
// ---------------------------------------------------------------

// // Using get and set keywords to define getter and setter in ES6 class
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

// // Creates a Ninja instance
// const ninja = new Ninja();

// // Tests
// assert(ninja.level === 0, 'Level: 0');

// ninja.level = 300;
// assert(ninja.level === 300 && ninja._level === 300, 'Level: 300');
// ---------------------------------------------------------------

// // Using get and set keywords to define getters and setters in object literals
// const ninjaCollection = {
//   ninjas: ['Jack', 'David', 'Harry'],

//   // Getter
//   get lastNinja() {
//     report('Getter is called.');
//     return this.ninjas[this.ninjas.length - 1];
//   },

//   // Setter
//   set lastNinja(value) {
//     report('Setter is called.');
//     this.ninjas[this.ninjas.length - 1] = value;
//   },
// };

// // Tests
// assert(ninjaCollection.lastNinja === 'Harry', 'The last ninja is Harry');

// ninjaCollection.lastNinja = 'Potter';
// assert(
//   ninjaCollection.lastNinja === 'Potter' &&
//     ninjaCollection.ninjas[ninjaCollection.ninjas.length - 1] === 'Potter',
//   'The last ninja is Potter'
// );
// ---------------------------------------------------------------

// // Using Object.defineProperty to define getters and setters in constructor function
// function Ninja() {
//   let _level = 0;

//   // Define getter and setter
//   Object.defineProperty(this, 'level', {
//     get: () => {
//       report('Getter is called.');
//       return _level;
//     },
//     set: (value) => {
//       report('Setter is called');
//       _level = value;
//     },
//   });
// }

// // Creates a Ninja instance
// const ninja = new Ninja();

// // Tests
// assert(typeof ninja._level === 'undefined', 'We cannot access the "private" variable.');
// assert(ninja.level === 0, 'Level: 0');

// ninja.level = 400;
// assert(ninja.level === 400, 'Level: 400');
// ---------------------------------------------------------------

// Using Object.defineProperty to define getters and setters in ES6 class: CANNOT ???
