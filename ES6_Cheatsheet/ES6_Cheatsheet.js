/**
 * 01 - Template literals: embed expressions into string: `${ninja}`
 */
// let ninja = 'Yoshi';
// console.log(`The ninja's name is ${ninja}.`);
// -> The ninja's name is Yoshi.
// -------------------------------------------------------------------------------------------------------

/**
 * 02 - Block-scoped variables:
 *
 *    * Use the "let" keyword to create block-level variables: let ninja = 'Yoshi';
 *
 *    * Use the "constant" keyword to create block-level constant variables whose value
 *      can't be reassigned to a completely new value: const ninja = 'Yoshi';
 */

// Example: Using "var" keyword
// for (var i = 0; i < 5; i++) {
//   var k = 10;
// }

// console.log(`i = ${i}`);
// i = 5;
// console.log(`k = ${k}`);
// k = 10
// -------------------------------

// Example: Using "let" keyword
// i and k are block-scoped variables
// for (let i = 0; i < 5; i++) {
//   let k = 10;
// }

// console.log(`i = ${i}`);
// -> Uncaught ReferenceError: i is not defined.
// console.log(`k = ${k}`);
// -> Uncaught ReferenceError: k is not defined.
// -------------------------------

// Example: Using "const" keyword
// const PI = 3.14;
// PI = 1000;
// -> Uncaught TypeError: Assigment to a constant variable.
// -------------------------------------------------------------------------------------------------------

/**
 * 03 - Function parameters
 */

/**
 * 03.1 - Rest parameters: create an array from arguments that weren't matched to parameters
 * 
 *    function multiMax(first, ...remaining) {
        // ...
      }

      multiMax(2, 3, 4, 5);
      // first: 2
      // remaining: [3, 4, 5]
 */

// Example
// function display(first, ...rest) {
//   console.log(`First: ${first}`);
//   console.log('Remaining arguments:');
//   for (let item of rest) {
//     console.log(item);
//   }
// }

// Call display() function
// display(1, 200, 300, 400);
// First: 1
// Remaining arguments:
// 200
// 300
// 400
// -----------------------------------------------------------

/**
 * 03.2 - Default parameters: specify default parameter values that are used if no value is suplied
 *        during invocation:
 */

// function displayInfo(first, last = 'John') {
//   console.log(`Fullname: ${first} ${last}`);
// }

// displayInfo('Alex', 'Fegurson');
// Fullname: Alex Ferguson
// displayInfo('Alex');
// Fullname: Alex John
// -------------------------------------------------------------------------------------------------------

/**
 * 04 - Spread operators: expand an expression where multiple items are needed: [...items, 3, 4, 5]
 */

/**
 * 04.1 - Spread in array literals
 */

// A better way to concatenate arrays
// Using Array.prototype.concat() method
// let array1 = [1, 2, 3];
// let array2 = [4, 5, 6];

// array1 = array1.concat(array2);
// console.log(array1);
// [1, 2, 3, 4, 5, 6];

// Using spread operator (...)
// let array1 = [1, 2, 3];
// let array2 = [4, 5, 6];

// let array3 = [...array1, 100, 300, 500, ...array2];
// console.log(array3);
// [1, 2, 3, 100, 300, 500, 4, 5, 6];
// -----------------------------------------------------------

/**
 * 04.2 - Spread in object literals
 */

// let obj1 = { foo: 'bar', x: 42 };
// let obj2 = { foo: 'baz', y: 13 };

// let cloneObj = { ...obj1 };
// console.log(cloneObj);
// {foo: "bar", x: 42}

// let mergedObj = { ...obj1, ...obj2 };
// console.log(mergedObj);
// {foo: "baz", x: 42, y: 13}

// Another Example:
// let fullname = {
//   first: 'Hillary',
//   last: 'Duff',
// };

// let employee = {
//   ...fullname,
//   country: 'USA',
//   isDeveloper: false,
// };

// console.log(Object.keys(employee));
// ["first", "last", "country", "isDeveloper"]
// -------------------------------------------------------------------------------------------------------

/**
 * 05 - Arrow functions: let us create functions with less sytactic clutter. They don't have their own
 * this parameter. Instead, they inherit it from the context in which they were created
 */

// Arrow function without parameter
// let sayHello = () => {
//   return 'Hello';
// };

// console.log(sayHello());
// Hello
// ----------------------------------------

// Arrow function without curly braces and return
// let sayHelo = () => 'Aloha';

// console.log(sayHelo());
// Aloha
// ----------------------------------------

// Arrow with parameters
// let max = (x, y) => (x > y ? x : y);

// console.log(max(5, 1));
// 5
// ----------------------------------------

// Another example:
// const values = [0, 3, 2, 5, 7, 4, 8, 1];
// values.sort((v1, v2) => v1 - v2);
// OR:
// values.sort((v1, v2) => {
//   return v1 - v2;
// });

// console.log(values);
// [0, 1, 2, 3, 4, 5, 7, 8]
// ----------------------------------------

// Another example:
// const values = [0, 3, 2, 5];
// values.forEach((value) => console.log(value));
// 0
// 3
// 2
// 5
// -------------------------------------------------------------------------------------------------------

/**
 * 06 - Generators
 */
// -------------------------------------------------------------------------------------------------------

/**
 * 07 - Promises
 */