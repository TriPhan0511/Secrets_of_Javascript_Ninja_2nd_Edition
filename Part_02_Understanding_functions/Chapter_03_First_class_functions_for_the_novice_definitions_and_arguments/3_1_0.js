/**
 * Most important, in Javascript, functions are first-class objects, or first-class citizens as they're
 * often called. They coexist with, and can be treated like, any other Javascript object. Just like the
 * more mundane Javascript data types, they can be referenced by variables, declared with literals,
 * and even passed as function parameters.
 */

/**
 * 3.1 - What's with the functional difference?
 */

/**
 * One of the reasons that functions and functional concepts are so important in Javascript is that
 * functions are primary modular units of execution. Except for the global Javascript code executed in
 * the page-building phase, all of the script code that we'll write for our pages will be within a function.
 *
 * Let's take a look at some of the actions we can take with objects. In Javascript, objects enjoy certain
 * capabilities:
 */

// * They can be created via literals: {}

// * They can be assigned to variables, array entries, and properties of other objects:
// // Assigns a new object to a variable
// var ninja = {};

// // Adds a new object to an array
// let ninjaArray = [];
// ninjaArray.push({});

// // Assigns a new object as a property of another object
// ninja.data = {};

// // * They can be passed as arguments to functions:
// function hide(ninja) {
//   ninja.visibility = false;
// }
// // A newly created object passed as an argument to a function
// hide({});

// // *  They can be returned as a value from functions:
// function returnNinja() {
//   return {}; // Returns a new object from a function
// }

// // *  They can possess property that can be dynamically created and assigned:
// var ninja = {};
// ninja.name = 'Hanzo';

/**
 * In turns out that, unlike in many other programming languages, in Javascript we can do almost
 * the exact same things with functions also.
 */
