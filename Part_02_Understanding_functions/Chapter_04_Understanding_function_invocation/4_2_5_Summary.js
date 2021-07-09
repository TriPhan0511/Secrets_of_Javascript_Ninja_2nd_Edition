// 1.INVOCATION AS A FUCNTION
// Function context will be the global window object in non-strict mode
// or undefined in strict mode

// // Declares a function in non-strict mode
// // Returned value is function context
// function whatever() {
//   return this;
// }

// // Declares a function in strict mode
// // Retrurned value is function context
// function whatever_strict_mode() {
//   'use strict';
//   return this;
// }

// // Calling the functions
// assert(
//   whatever() === window,
//   'When the invocation as a function in non-strict mode, the function context is the global window object.'
// );

// assert(
//   whatever_strict_mode() === undefined,
//   'When the invocation as a function in strict mode, the function context is undefined.'
// );
// ------------------------------------------------------------------------------------------------------

// 2. INVOCATION AS A METHOD
// Function context will be the method's owning object.

// // Declares an object
// let obj = {};

// // Declares a function, returns function context
// function whatever() {
//   return this;
// }

// // Assigns that function to a property of that obj ( the function become a method)
// obj.doSomething = whatever;

// // Calling the method
// assert(
//   obj.doSomething() === obj,
//   "When the invocation as a method, the function context is the method's owning object."
// );
// ------------------------------------------------------------------------------------------------------

// 3. INVOCATION AS A CONSTRUCTOR
// Function context will be newly created object.

// // Defines a constructor
// function Ninja() {
//   // Defines a property and assigns a function to that property, then the function becomes a method
//   // The method has the returned value is function context of the constructor
//   this.whatever = function () {
//     return this;
//   };
// }

// // Creates two Ninja instances
// const ninja1 = new Ninja();
// const ninja2 = new Ninja();

// // Calling the constructor
// assert(ninja1.whatever() === ninja1, 'ninja1 is the function context');
// assert(ninja2.whatever() === ninja2, 'ninja2 is the function context.');
// ------------------------------------------------------------------------------------------------------

// 4. INVOCATION WITH apply AND call METHODS
// With apply and call method we can specify the object will be function context of the invoked function
// Thhe difference between apply and call is the apply method accepts an array of arguments
// whereas, the call method accepts all of individual arguments.

// Syntax:
// fn.apply(obj, [arg1, arg2,...])
// fn.call(obj, arg1, argr2, ...)

// Defines a function
// Returned value is the function context of the function
function whatever(name, age) {
  this.intro = `Hello, my name's ${name}, and I'm ${age} years old.`;
  return this;
}

// Defines two objects
const obj1 = {};
const obj2 = {};

// Calling the function with apply and call methods
// assert(whatever.apply(obj1) === obj1, 'obj1 is the function context of function whatever.');
// assert(whatever.call(obj2) === obj2, 'Now, obj2 is the function context of function whatever.');

// Calling function whatever with the apply method
assert(
  whatever.apply(obj1, ['Kelly', 28]) === obj1 &&
    obj1.intro === `Hello, my name's Kelly, and I'm 28 years old.`,
  'obj1 is the function context of function whatever'
);

// Calling function whatever with the call method
assert(
  whatever.call(obj2, 'Peter Pan', 10) === obj2 &&
    obj2.intro === "Hello, my name's Peter Pan, and I'm 10 years old.",
  'Now, obj2 is the function context of function whatever.'
);
