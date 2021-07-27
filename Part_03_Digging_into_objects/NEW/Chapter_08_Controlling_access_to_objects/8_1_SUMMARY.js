/** Getters and setters | SUMMARY */

/**
 * There are two ways to define getters and setters in Javascript:
 *
 * 1. Using get and set keywords in object literal and ES6 classes.
 * 2. Using the built-in Object.defineProperty in constructor function
 *    (can also use in ES6 class, because ES6 class is the syntactic sugar)
 */

/**
 * We can use getters and setters for logging, passed-in data validation, notification,
 * define computed property...
 *
 * Examples:
 * 1. Logging
 * 2. Data validation
 * 3. Define computed property
 */

/** Review: We can mimic "private" property with closure */

// // Defines a Ninja constructor function
// function Ninja() {
//   let skillLevel = 0; // "private" variable

//   this.getSkilllevel = function () {
//     return skillLevel;
//   };

//   this.setSkillLevel = function (value) {
//     skillLevel = value;
//   };
// }

// // Tests
// const ninja = new Ninja();
// assert(ninja.getSkilllevel() === 0, 'Initially, the skill level is zero.');

// ninja.setSkillLevel(100);
// assert(ninja.getSkilllevel() === 100, 'Now, the skill level is 100.');
// ---------------------------------------------------------------------------------------------

/** 1.1 Using get and set keywords in object literal to define getters and setters */

// // Declares an object literal
// const ninja = {
//   _skillLevel: 0,

//   // Getter
//   get skillLevel() {
//     report('Getting the skill level.');
//     return this._skillLevel;
//   },

//   // Setter
//   set skillLevel(value) {
//     report('Setting the skill level.');
//     this._skillLevel = value;
//   },
// };

// // Tests
// assert(ninja.skillLevel === 0, 'Initially, the skill level is zero.');

// ninja.skillLevel = 200;
// assert(ninja.skillLevel === 200, 'Now, the skill level is 200.');
// ---------------------------------------------------------------------------------------------

/** 1.2 Using get and set keywords in ES6 classes to define getters and setters */

// // Defines a Ninja class
// class Ninja {
//   constructor() {
//     this._skillLevel = 0;
//   }

//   get skillLevel() {
//     report('Getting skill level');
//     return this._skillLevel;
//   }

//   set skillLevel(value) {
//     report('Setting skill level');
//     if (!Number.isInteger(value)) {
//       throw new TypeError('The value of skillLevel must be an integer.');
//     }
//     this._skillLevel = value;
//   }
// }

// // Tests
// const ninja = new Ninja();
// assert(ninja.skillLevel === 0, 'Initialy, the skill level is zero.');

// ninja.skillLevel = 10;
// assert(ninja.skillLevel === 10, 'Now, the skill level is 10.');

// try {
//   ninja.skillLevel = 'Great';
// } catch (err) {
//   pass(err.message);
// }

// assert(ninja.skillLevel === 10, 'The skill level is still 10.');
// ---------------------------------------------------------------------------------------------

/**
 * 2.2 Using the built-in Object.defineProperty method in constructor function to define getters and setters
 * (we can also mimic a "private" property)
 */

// // Defines a constructor function
// function Ninja() {
//   let _skillLevell = 0;

//   Object.defineProperty(this, 'skillLevel', {
//     get: () => {
//       report('Getting the skill level');
//       return _skillLevell;
//     },
//     set: (value) => {
//       report('Setting the skill level');
//       _skillLevell = value;
//     },
//   });
// }

// // Tests
// const ninja = new Ninja();
// assert(ninja.skillLevel === 0, 'Initially, the skill level is zero.');

// ninja.skillLevel = 50;
// assert(ninja.skillLevel === 50, 'Now, the skill level is 50.');
// ---------------------------------------------------------------------------------------------

/**
 * 2.2 Using the built-in Object.defineProperty method in ES6 classes to define getters and setters
 * (ES6 classes is the syntactic sugar)
 */

// // Defines a Ninja class
// class Ninja {
//   constructor() {
//     let _skillLevel = 0;

//     Object.defineProperty(this, 'skillLevel', {
//       get: () => {
//         report('Getting the skill level.');
//         return _skillLevel;
//       },
//       set: (value) => {
//         report('Setting the skill level');
//         _skillLevel = value;
//       },
//     });
//   }
// }

// // Tests
// const ninja = new Ninja();
// assert(ninja.skillLevel === 0, 'Initially, the skill level is zero.');

// ninja.skillLevel = 30;
// assert(ninja.skillLevel === 30, 'Now, the skill level is zero.');
// ---------------------------------------------------------------------------------------------

/** USAGE OF GETTERS AND SETTERS */

// /** 1. Logging */
// class Ninja {
//   constructor() {
//     this._skillLevel;
//   }

//   get skillLevel() {
//     // Logging
//     report('Geeting the skill level.');
//     return this._skillLevel;
//   }

//   set skillLevel(value) {
//     // Logging
//     report('Setting the skill level.');
//     this._skillLevel = value;
//   }
// }

// // Tests
// const ninja = new Ninja();
// ninja.skillLevel = 100;
// assert(ninja.skillLevel === 100, 'His level is 100.');

// // -> Setting the skill level.
// // -> Geeting the skill level.
// // -> His level is 100.
// ---------------------------------------------------------------------------------------------

// /** 2. Passed-in data validation */

// class Ninja {
//   constructor() {
//     this._skillLevel;
//   }

//   get skillLevel() {
//     return this._skillLevel;
//   }

//   set skillLevel(value) {
//     if (!Number.isInteger(value)) {
//       throw new TypeError('The value of skillLevel must be an integer.');
//     }
//     this._skillLevel = value;
//   }
// }

// // Tests
// const ninja = new Ninja();
// try {
//   ninja.skillLevel = 10;
//   assert(ninja.skillLevel === 10, 'The skill level is 10.');

//   ninja.skillLevel = 'Great'; // FAILS
//   fail('Should not be here.');
// } catch (err) {
//   pass(err);
// }

// assert(ninja.skillLevel === 10, 'The skill level is still 10.');

// // -> The skill level is 10.
// // -> TypeError: The value of skillLevel must be an integer.
// // -> The skill level is still 10.
// ---------------------------------------------------------------------------------------------

/** 3. Define computed property */
class Shogun {
  constructor(name, clan) {
    this.name = name;
    this.clan = clan;
  }

  get fullTitle() {
    return `${this.name} ${this.clan}`;
  }

  set fullTitle(value) {
    let array = value.split(' ');
    this.name = array[0];
    this.clan = array[1];
  }
}

// Tests
const shogun = new Shogun('Hattori', 'Kaga');
assert(
  shogun.fullTitle === 'Hattori Kaga' && shogun.name === 'Hattori' && shogun.clan === 'Kaga',
  'Our shogun is Hattori Kaga.'
);

shogun.fullTitle = 'Peter Pan';
assert(shogun.name === 'Peter' && shogun.clan === 'Pan', 'Now, our shogun is Peter Pan.');
