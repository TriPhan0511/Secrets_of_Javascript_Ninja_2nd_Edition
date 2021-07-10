/**
 * Exercise 1:
 * Using the rest parameter, rewrite the sum function so that it doesn't use the arguments object.
 */

// function sum() {
//   let result = 0;
//   for (let i = 0; i < arguments.length; i++) {
//     result += arguments[i];
//   }
//   return result;
// }

// assert(sum(1, 2, 3) === 6, 'Sum of first three numbers is 6');
// assert(sum(1, 2, 3, 4) === 10, 'Sum of first four numbers is 10');
// assert(sum() === undefined, 'The result is undefined');
// -----------------------------------------------------------------------------

// // Using rest parameter
// // Solution 1:
// function sum(...rest) {
//   if (rest.length) {
//     return rest.reduce((accumulator, currentValue) => accumulator + currentValue);
//   }
// }
// ----------------------------------------------

// // Solution 2
// function sum(...rest) {
//   if (rest.length) {
//     let result = 0;
//     for (let item of rest) {
//       result += item;
//     }
//     return result;
//   }
// }
// ----------------------------------------------

// // Solution 3:
// function sum(...rest) {
//   if (rest.length) {
//     let result = 0;
//     for (let i = 0; i < rest.length; i++) {
//       result += rest[i];
//     }
//     return result;
//   }
// }
// --------------------------------------------------------------------------------------------

/**
 * Exercise 2:
 */
// Answer:
// ninja = 'Fuma'
// samurai = 'Toyotomi'
// ------------------------------------

// function getSamurai(samurai) {
//   'use strict';

//   arguments[0] = 'Ishida';
//   return samurai;
// }

// function getNinja(ninja) {
//   arguments[0] = 'Fuma';
//   return ninja;
// }

// let samurai = getSamurai('Toyotomi');
// let ninja = getNinja('Yoshi');

// assert(samurai === 'Toyotomi', 'The samurai is Toyotomi.');
// assert(ninja === 'Fuma', 'The ninja is Fuma');
// --------------------------------------------------------------------------------------------

/**
 * Exercise 3:
 */
// Answer:
// The assertion wil pass: 2
// assert(whoAmI2() === window, 'Window?');
// ----------------------------------------------------

// function whoAmI1() {
//   'use strict';
//   return this;
// }

// function whoAmI2() {
//   return this;
// }

// assert(whoAmI1() === window, 'Window?'); // FALL
// assert(whoAmI2() === window, 'Window?'); // PASS
// --------------------------------------------------------------------------------------------

/**
 * Exercise 4:
 */
// Answer: The assertions will pass: 1 and 4
// assert(ninja1.whoAmI() === ninja1, 'ninja1?');
// assert(ninja1.whoAmI.call(ninja2) === ninja2, 'ninja2 here?');

// let ninja1 = {
//   whoAmI: function () {
//     return this;
//   },
// };

// let ninja2 = {
//   whoAmI: ninja1.whoAmI,
// };

// let identify = ninja2.whoAmI;

// assert(ninja1.whoAmI() === ninja1, 'ninja1?');
// assert(ninja2.whoAmI() === ninja1, 'ninja1 again?'); // FAIL
// assert(identify() === ninja1, 'ninja1 again?'); // FAIL
// assert(ninja1.whoAmI.call(ninja2) === ninja2, 'ninja2 here');
// --------------------------------------------------------------------------------------------

/**
 * Exercise 5:
 */
// Answer: Only one assertion will be pass: 1
// assert(ninja1.whoAmI() === ninja1, 'ninja1 here?')
// --------------------------------------------------------------

// function Ninja() {
//   this.whoAmI = () => this;
// }

// let ninja1 = new Ninja();
// let ninja2 = {
//   whoAmI: ninja1.whoAmI,
// };

// assert(ninja1.whoAmI() === ninja1, 'ninja1 here?');
// assert(ninja2.whoAmI() === ninja2, 'ninja2 here?'); // FAIL:
// // Because the arrow function doesn't have own this prameter,
// // It picks up the value of this as its creation.
// --------------------------------------------------------------------------------------------

/**
 * Exercise 6:
 */
// Answer: Only one assertion will be pass: 1
// assert(ninja1.whoAmI() === ninja1, 'ninja1 here?');
// ------------------------------------------------

// function Ninja() {
//   // this.whoAmI = function () {
//   //   return this;
//   // }.bind(this);

//   this.whoAmI = function () {
//     return this;
//   }.bind(this);
// }

// let ninja1 = new Ninja();
// let ninja2 = {
//   whoAmI: ninja1.whoAmI,
// };

// assert(ninja1.whoAmI() === ninja1, 'ninja1 here?');
// assert(ninja2.whoAmI() === ninja2, 'ninja2 here?'); // FAIL
