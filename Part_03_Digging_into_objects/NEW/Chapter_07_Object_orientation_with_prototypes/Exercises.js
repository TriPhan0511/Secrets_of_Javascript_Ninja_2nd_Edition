/** Chapter 07 - Exercises */

/**
 * Exercise 1:
 * Which of the following properties points to an object that will be searched if the
 * target object doesn't have the searched-for property?
 *  a. class
 *  b. instance
 *  c. prototype
 *  d. pointTo
 *
 * Answer: option c. prototype (The prototype of the constructor function)
 */
// ---------------------------------------------------------------------------------------------

/**
 * Exercise 02:
 * What's value of variable a1 after the following code is executed?
 *
 * Answer: a1 === 'Hello'
 */

// function Ninja() {}
// Ninja.prototype.talk = function () {
//   return 'Hello';
// };

// const ninja = new Ninja();
// const a1 = ninja.talk();
// ---------------------------------------------------------------------------------------------

/**
 * Exercise 3:
 * What's the value of a1 after running the following code?
 *
 * Answer: a1 === undefined
 */

// function Ninja() {}
// Ninja.message = 'Hello'; // This is a static property (class-level property)

// const ninja = new Ninja();
// const a1 = ninja.message;
// ---------------------------------------------------------------------------------------------

/**
 * Exercise 4:
 * Explain the difference between the getFullName method in these two code fragments:
 *
 * Answer:
 * _ With the first fragment, every instance of the Person constructor function has own
 *   the getFullName method. This is increase the memory consumption.
 *
 * _ With the second fragment, every instance of the Person constructor function has access
 *   to the single getFullName method which defined as a method of Person prototype object.
 */

// // First fragment
// function Person(firstName, lastName) {
//   this.firstName = firstName;
//   this.lastName = lastName;

//   this.getFullName = function () {
//     return `${this.firstName} ${this.lastName}`;
//   };
// }

// // Second fragment
// function Person(firstName, lastName) {
//   this.firstName = firstName;
//   this.lastName = lastName;
// }

// Person.prototype.getFullName = function () {
//   return `${this.firstName} ${this.lastName}`;
// };
// ---------------------------------------------------------------------------------------------

/**
 * Exercise 5:
 * After running the following code, what will ninja.constructor point to?
 *
 * Answer: It points to the Ninja function.
 * ninja.constructor === Ninja
 */

// function Person() {}
// function Ninja() {}

// const ninja = new Ninja();
// assert(
//   ninja.constructor === Ninja,
//   'The constructor property of the Ninja prototype points back to the Ninja function.'
// );
// ---------------------------------------------------------------------------------------------

/**
 * Exercise 6:
 * After running the following code, what will ninja.constructor point to?
 *
 * Answer: It points to the Person function because the new Person object is assigned as
 * the Ninja prototype before the ninja is instantiated.
 */

// function Person() {}
// function Ninja() {}
// Ninja.prototype = new Person();

// const ninja = new Ninja();
// assert(
//   ninja.constructor === Person,
//   'the ninja.constructor points to the Person constructor function.'
// );
// ---------------------------------------------------------------------------------------------

/**
 * Exercise 7:
 * Explain how the instanceof operator works in the following example.
 *
 * Answer: The expression samurai instanceof Warrior is used to detemine whether the prototype of
 * the Warrior constructor function is in the prototype chain of the samurai object.
 * In this case, that expression returns true.
 */

// function Warrior() {}
// function Samurai() {}
// Samurai.prototype = new Warrior();

// const samurai = new Samurai();
// assert(
//   samurai instanceof Warrior,
//   'The prototype of the Warrior constructor function is in the prototype chain of the samurai object.'
// );
// ---------------------------------------------------------------------------------------------

/**
 * Exercise 8:
 * Translate the following ES6 code into ES5 code.
 */

/** ES6 code */
// class Warrior {
//   constructor(weapon) {
//     this.weapon = weapon;
//   }

//   // Add a prototype method (object method)
//   wield() {
//     return `Wielding ${this.weapon}`;
//   }

//   // Add a static method (class-level method)
//   static duel(warrior1, warrior2) {
//     return `${warrior1.wield()} ${warrior2.wield()}`;
//   }
// }

// // Creates an instance of Warrior
// const warrior1 = new Warrior('blade');
// assert(warrior1.wield() === 'Wielding blade', 'The warrior is wielding a blade.');

// // Creates another Warrior instance for testing the static method duel
// const warrior2 = new Warrior('gun');
// assert(
//   Warrior.duel(warrior1, warrior2) === 'Wielding blade Wielding gun',
//   'We can access to the static method name duel.'
// );
// -------------------------------------------------------------

/** Answer: */

/** ES5 code */
function Warrior(weapon) {
  this.weapon = weapon;
}

// Adds a prototype method
Warrior.prototype.wield = function () {
  return `Wielding ${this.weapon}`;
};

// Adds a static method
Warrior.duel = function (warrior1, warrior2) {
  return `${warrior1.wield()} ${warrior2.wield()}`;
};

// // Creates an instance of Warrior
// const warrior1 = new Warrior('blade');
// assert(warrior1.wield() === 'Wielding blade', 'The warrior is wielding a blade.');

// // Creates another Warrior instance for testing the static method duel
// const warrior2 = new Warrior('gun');
// assert(
//   Warrior.duel(warrior1, warrior2) === 'Wielding blade Wielding gun',
//   'We can access to the static method name duel.'
// );
