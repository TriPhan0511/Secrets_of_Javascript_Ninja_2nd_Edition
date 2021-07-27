/** Mimicking the private object property */

// // Defines a constructor function
// function Ninja() {
//   let skillLevel; // "private" variable

//   // Getter
//   this.getSkillLevel = () => {
//     report('Getting the skill level.');
//     return skillLevel;
//   };

//   // Setter
//   this.setSkillLevel = (value) => {
//     report(`Modifying the skill level from ${skillLevel} to ${value}`);
//     skillLevel = value;
//   };
// }

// // Creates a Ninja instance
// const ninja = new Ninja();
// assert(ninja.getSkillLevel() === undefined, 'Initially, the skill level is undefined.');

// ninja.setSkillLevel(100);
// assert(ninja.getSkillLevel() === 100, 'Now, the skill level is 100.');
// -------------------------------------------------------------------------------------------------------------

/**
 * In Javascript, there are two ways to define getters and setters:
 *
 *  1. Using get and set keywords in object literals and ES6 classes.
 *  2. Using the built-in Object.defineProperty method. (within constructor function and ES6 classes)
 */
// -------------------------------------------------------------------------------------------------------------

// 1.1 Using get and set keywords in object literals

// // Declares an object literal
// const ninjaCollection = {
//   // Declares an object property
//   ninjas: ['Yoshi', 'Hattori', 'Hanzo'],

//   // Getter
//   get firstNinja() {
//     report('Getting the first ninja.');
//     return this.ninjas[0];
//   },

//   // Setter
//   set firstNinja(value) {
//     report('Setting the first ninja.');
//     this.ninjas[0] = value;
//   },
// };

// // Tests
// assert(ninjaCollection.firstNinja === 'Yoshi', 'Yoshi is the first ninja.');

// ninjaCollection.firstNinja = 'David';
// assert(
//   ninjaCollection.firstNinja === 'David' && ninjaCollection.ninjas[0] === 'David',
//   'Now, David is the first ninja.'
// );

// for (let prop in ninjaCollection) {
//   report(prop);
// }
// // -> ninjas
// // -> firstNinja
// -------------------------------------------------------------------------------------------------------------

// 1.2 Using get and set keywords in ES6 classes

// // Defines a NinjaCollection class
// class NinjaCollection {
//   constructor() {
//     this.ninjas = ['Yoshi', 'Hattori', 'Hanzo'];
//   }

//   // Getter
//   get firstNinja() {
//     report('Getting the first ninja.');
//     return this.ninjas[0];
//   }

//   // Setter
//   set firstNinja(value) {
//     report('Setting the first ninja.');
//     this.ninjas[0] = value;
//   }
// }

// // Creates an instance of Ninja
// const ninjaCollection = new NinjaCollection();
// assert(ninjaCollection.firstNinja === 'Yoshi', 'Initially, Yoshi is the first Ninja.');

// ninjaCollection.firstNinja = 'Peter';
// assert(
//   ninjaCollection.firstNinja === 'Peter' && ninjaCollection.ninjas[0] === 'Peter',
//   'Now, Peter is the first ninja.'
// );

// for (let prop in ninjaCollection) {
//   report(prop);
// }
// // -> ninjas (only)
// -------------------------------------------------------------------------------------------------------------

// 2.1 Using the built-in Object.defineProperty to define getters, setters

// // Defines a Ninja constructor function
// function Ninja() {
//   let _skillLevel; // "private" variable

//   // Defines getters and setters via the Object.defineProperty method
//   Object.defineProperty(this, 'skillLevel', {
//     get: function () {
//       report('Getting the skill level.');
//       return _skillLevel;
//     },
//     set: function (value) {
//       report('Setting the skill level.');
//       _skillLevel = value;
//     },
//   });
// }

// // Creates a Ninja instance
// const ninja = new Ninja();
// ninja.skillLevel = 200;
// assert(ninja.skillLevel === 200, 'His skill level is 200.');
// -------------------------------------------------------------------------------------------------------------

// 2.2 Using the built-in Object.defineProperty within ES6 classes

// Defines a Ninja class
class Ninja {
  constructor() {
    let _skillLevel; // "private" variable

    Object.defineProperty(this, 'skillLevel', {
      get: () => {
        report('Getting the skill level.');
        return _skillLevel;
      },
      set: (value) => {
        report('Setting the skill level.');
        _skillLevel = value;
      },
    });
  }
}

// Creates an instance of Ninja
const ninja1 = new Ninja();

ninja1.skillLevel = 10;
assert(ninja1.skillLevel === 10, 'The skill level is 10.');
