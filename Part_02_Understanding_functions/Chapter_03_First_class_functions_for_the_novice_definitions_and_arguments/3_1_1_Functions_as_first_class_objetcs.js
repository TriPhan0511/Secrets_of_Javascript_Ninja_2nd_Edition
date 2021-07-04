/**
 * 3.1.1 - Functions as first-class objects
 */

/**
 * Functions in Javascript possess all the capabilities of objects and thus treated like any other object in
 * the language. We say that functions are FIRST-CLASS objects, which can also be:
 */

/** Created via literals */
// function ninjaFunction() {}

/** Assigned to variables, array entries, and properties of other objects */
// // Assigns a new function to a variable
// let ninjaFunction = function () {};

// // Adds a new function to an array
// let array = [];
// array.push(function () {});

// // Assigns a new function as a property of other object
// let ninja = {};
// ninja.data = function () {};

/** Passed as arguments to other functions */
// function call(ninjaFunction) {
//   ninjaFunction();
// }
// // A newly created function passed as an argument to a function
// call(function () {});

/** Returned as values from functions */
// function returnNewNinjaFunction() {
//   return function () {}; // Returns a new function
// }

/** They can possess properties that can be dynamically created and assigned */
// let ninjaFunction = function () {};
// ninjaFunction.name = 'Hanzo'; // Adds a new property to a function

/**
 * Whatever we can do with objects, we can do with functions as well. Functions are objects, just with
 * an additional, special capability of being invokable: Functions can be called or invoked in order
 * to perform an action.
 */

/**
 * One of the characteristics of first-class objects is that they can be passed to function as arguments.
 * In the case of functions, this means that we pass a function as an argument to another function that might,
 * at a later point in application execution, call the passed-in function. This is an example of a more general
 * concept known as a CALLBACK FUNCTION. Let's explore this important concept.
 */
