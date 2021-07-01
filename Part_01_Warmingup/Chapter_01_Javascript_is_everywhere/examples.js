/**
 *  Functions are first-class objects - In Javascript, functions coexist with, and can be treated like,
 * any other Javascript objects. They can be created through literals, referenced by variables,
 * passed around as function arguments, and even returned as function return values.
 */

// // Creates a function through literals
// function sayHello(arg) {
//   return `Hello, ${arg}!`;
// }

// // Calling the sayHello function
// assert(sayHello('world') === 'Hello, world!', 'Hello, world!');
// // ---------------------------------------------------------------

// // Creates a fuction referenced by a variable
// let introduce = function (name) {
//   return `Aloha! My name's ${name}.`;
// };

// // Calling the introduce function
// assert(introduce('Kelly') === "Aloha! My name's Kelly.", 'Her name is Kelly.');
// // ---------------------------------------------------------------

// // Arrow function
// let sayAloha = (arg) => `Aloha, ${arg}!`;

// // Calling the sayAloha array function
// assert(sayAloha('sir') === 'Aloha, sir!', 'Aloha, sir!');
// // ---------------------------------------------------------------

// // Function is passed around as function arguments
// function reduce(array, f, initialValue) {
//   let output = initialValue;
//   for (let item of array) {
//     output = f(output, item);
//   }
//   return output;
// }

// // Find the maximum value in an array
// // let array = [1, 3, 5, 4];
// // assert(reduce(array, Math.max, array[0]) === 5, 'The maximum value in the array is 5.');

// // Find the total value in an array
// let arr = [1, 2, 3, 4, 5];
// assert(
//   reduce(arr, (x, y) => x + y, 0),
//   'The total of the values in the array is 15.'
// );
// -----------------------------------------------------------------------------------------------------------------

/**
 * 1.3.3 - Performance analysis
 */

/**
 * We'll use code such as the following later in this book to collect performance information:
 */

// // Example:

// // Starts the timer
// console.time('My operation');

// // Performs the operation multiple times
// let maxCount = 1000;
// for (let n = 0; n < maxCount; n++) {
//   // perform the operation to be measured
//   console.log('Hello');
// }

// // Stops the timer
// console.timeEnd('My operation');

// // -> My operation: 106.9970703125 ms

/**
 * Here bracket the execution of the code to be measured with two calls to the time and timeEnd methods of
 * the built-in console object.
 *
 * Before the operation begins executing, the call to console.time starts a timer
 * with a name (in this case, My operation).
 *
 * Then we run the code in the loop for a certain number of times (in this case, maxCount times).
 * Because a single operation of the code happens too quickly to measure reliably, we need to perform the code
 * many times to get measurable value. Frequently, this count can be the tens of thousands, or even millions,
 * depending on the nature of the code being measured. A little trial and error lets us choose a reasonable value.
 *
 * When the operation ends, we call the console.timeEnd method with the same name. This causes the browser to
 * output the time that elapsed since the timer was started.
 */

// // Another example:
// function isPrime(number) {
//   if (number < 2) {
//     return false;
//   }
//   for (let i = 2; i < number; i++) {
//     if (number % i == 0) {
//       return false;
//     }
//   }
//   return true;
// }

// // Performance analysis
// console.time('isPrime');

// isPrime(50);

// console.timeEnd('isPrime');
// // -> isPrime: 0.005859375 ms
// -----------------------------------------------------------------------------------------------------------------
