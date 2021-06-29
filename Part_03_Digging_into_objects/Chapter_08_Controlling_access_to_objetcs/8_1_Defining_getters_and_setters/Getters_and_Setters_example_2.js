/**
 * 1. Getters and Setters within OBJECT LITERAL
 */

// const employee = {
//   first: 'Kevin',
//   last: 'Philips',
//   isDeveloper: true,

//   // Getter
//   get fullName() {
//     report('Getter is called.');
//     return `${this.first} ${this.last}`;
//   },

//   // Setter
//   set fullName(value) {
//     report('Setter is called.');
//     let segments = value.split(' ');
//     this.first = segments[0];
//     this.last = segments[1];
//   },
// };

// assert(employee.fullName === 'Kevin Philips', 'The full name is Kevin Philips.');
// employee.fullName = 'Peter Pan';
// assert(employee.first === 'Peter' && employee.last === 'Pan', 'Now, the full name is Peter Pan.');
// --------------------------------------------------------------------------------------------------------

/**
 * 2. Getters and setters within ES6 class definition
 */

// class Ninja {
//   constructor(first, last) {
//     this.first = first;
//     this.last = last;
//     this._skillLevel = 0;
//   }

//   // Getter: fullName
//   get fullName() {
//     return `${this.first} ${this.last}`;
//   }

//   // Getter: skillLevel
//   get skillLevel() {
//     return this._skillLevel;
//   }

//   // Setter: skillLevel
//   // Check whether the passed-in value is an integer.
//   // If it isn't, throw an exception,
//   // if it is, update the _skillLevel property to that passed-in value,
//   // and report.
//   set skillLevel(value) {
//     if (!Number.isInteger(value)) {
//       throw TypeError('You must enter an integer for skill level.');
//     }
//     this._skillLevel = value;
//     report('The skill level is updated.');
//   }
// }

// // Tests
// const ninja = new Ninja('Yoshi', 'Hattori');
// assert(ninja.fullName === 'Yoshi Hattori', 'Our ninja is Yoshi Hattori.');
// assert(ninja.skillLevel === 0, 'His initial skill is zero.');

// // Update the skillLevel property with a integer number
// try {
//   ninja.skillLevel = 10;
// } catch (e) {
//   report(e);
// }

// assert(ninja.skillLevel === 10, 'Now, his skill level is 10.');

// // Update the skillLevel property with a non-integer number
// try {
//   ninja.skillLevel = 'Great';
// } catch (e) {
//   report(e);
// }

// assert(ninja.skillLevel === 10, 'His skill level is still 10.');
// --------------------------------------------------------------------------------------------------------

/**
 * 3. Getters and setters within constructor function:
 *
 * Using the built-in Object.defineProperty method to define a property has getter and setter.
 * Using CLOSURE to protect private variable.
 */

// function Ninja(first, last, initialSkillLevel) {
//   // function Ninja(first, last, skill) {
//   // Declares a normal property
//   this.name = {
//     first: first,
//     last: last,
//   };
//   // Declares a "private" property
//   let _skillLevel = Number(initialSkillLevel);

//   // Define a method named getFullName to return the full name of the object instance
//   this.getFullName = () => `${this.name.first} ${this.name.last}`;

//   // Define a property named levelSkill for object instances of this function
//   Object.defineProperty(this, 'skillLevel', {
//     get: () => _skillLevel,
//     set: (value) => {
//       if (!Number.isInteger(value)) {
//         throw TypeError('You must enter an integer value for skillLevel.');
//       }
//       _skillLevel = value;
//       report('The skillLevel is updated.');
//     },
//   });
// }

// // Tests
// const ninja = new Ninja('Yoshi', 'Hattori', 5);
// assert(ninja.getFullName() === 'Yoshi Hattori', 'Our ninja is Yoshi Hattori.');
// assert(ninja.skillLevel === 5, 'His initial skill level is 5.');

// // Update skillLevel with a integer value
// try {
//   ninja.skillLevel = 10;
// } catch (e) {
//   report(e);
// }
// assert(ninja.skillLevel === 10, 'Now, his skill level is 10.');

// // Update skillLevel with a non-integer value
// try {
//   ninja.skillLevel = 'Awesome';
// } catch (e) {
//   report(e);
// }
// assert(ninja.skillLevel === 10, 'His skill level is still 10.');
// --------------------------------------------------------------------------------------------------------

/**
 * 4. Getters and setters within ES6 class definitions (on constructor)
 * TRY USING Object.defineProperty method on constructor within ES6 class definitions
 */

class Ninja {
  constructor(first, last, initialSkillLevel) {
    this.name = {
      first: first,
      last: last,
    };

    // Declares a "private" variable
    let _skillLevel = initialSkillLevel;

    // Defines an object property
    Object.defineProperty(this, 'skillLevel', {
      get: () => _skillLevel,
      set: (value) => {
        if (!Number.isInteger(value)) {
          throw TypeError('You must enter an integer for skillLevel value.');
        }
        _skillLevel = value;
        report('The skillLevel updated.');
      },
    });
  }
}

// Tests
const ninja = new Ninja('Peter', 'Pan', 0);
assert(ninja.name.first === 'Peter' && ninja.name.last === 'Pan', 'Our ninja is Peter Pan.');
assert(ninja.skillLevel === 0, 'His initial skill is zero.');

// Update the skillLevel with a integer value
try {
  ninja.skillLevel = 10;
} catch (e) {
  report(e);
}
assert(ninja.skillLevel === 10, 'Now, his skill level is 10.');

// Update the skillLevel with a non-integer value
try {
  ninja.skillLevel = 'Great';
} catch (e) {
  report(e);
}
assert(ninja.skillLevel === 10, 'His skill level is still 10.');
