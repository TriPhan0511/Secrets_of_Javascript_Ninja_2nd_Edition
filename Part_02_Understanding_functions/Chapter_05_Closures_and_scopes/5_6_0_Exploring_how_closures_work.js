// USING CLOSURE

// 1. MIMICKING "PRIVATE" VARIABLE

// Defines a constructor function
// function Person(name) {
//   this.name = name;
//   let job; // "private" variable

//   this.getJob = function () {
//     return job;
//   };

//   this.setJob = function (aJob) {
//     job = aJob;
//   };
// }

// // Creates a new Person instance
// let paul = new Person('Paul');

// assert(paul.name === 'Paul', 'His name is Paul.');
// assert(typeof paul.job === 'undefined', 'Cannot access directly to the job of Paul.');

// // Set job for a Person object through the setJob method
// paul.setJob('Developer');

// assert(typeof paul.job === 'undefined', 'Still cannot access directly to the job of Paul.');

// // Get job through the getJob method
// assert(paul.getJob() === 'Developer', 'He is a developer.');
// ---------------------------------------------------------------------------------------------

// // Using closure with callback

// function animateIt(elementId) {
//   const elem = document.getElementById(elementId);
//   let tick = 0;
//   let timer = setInterval(function () {
//     if (tick < 10) {
//       elem.style.left = elem.style.top = `${tick * 10}px`;
//       tick++;
//     } else {
//       clearInterval(timer);
//       // assert(elem, 'We can access the elem variable.');
//       // assert(tick, 'We can access the tick variable.');
//       // assert(timer, 'We can access the timer variable.');
//     }
//   }, 10);
// }

// // Calls the animateIt function by user
// // animateIt('box1');

// // Calls the animateIt function by the browser
// document.getElementById('myButton').addEventListener('click', function () {
//   animateIt('box1');
// });
// ---------------------------------------------------------------------------------------------

// // Defines a constructor function
// function Person(name) {
//   this.name = name;
//   let job; // "private" variable

//   this.getJob = function () {
//     return job;
//   };

//   this.setJob = function (aJob) {
//     job = aJob;
//   };
// }

// // Creates a new Person instance
// let paul = new Person('Paul');

// assert(paul.name === 'Paul', 'His name is Paul.');
// assert(typeof paul.job === 'undefined', 'Cannot access directly to the job of Paul.');

// // Set job for a Person object through the setJob method
// paul.setJob('Developer');

// assert(typeof paul.job === 'undefined', 'Still cannot access directly to the job of Paul.');

// // Get job through the getJob method
// assert(paul.getJob() === 'Developer', 'He is a developer.');

// // Creates another instance of Person
// let john = new Person('John');
// assert(typeof john.getJob() === 'undefined', 'John has no job.');

// john.setJob('Technician');
// assert(john.getJob() === 'Technician', 'He is a technician.');
// ---------------------------------------------------------------------------------------------

// function outerFunction() {
//   let name = 'Kelly';

//   function firstInnerFunction() {
//     let age = 20;
//     assert(name === 'Kelly', 'Her name is Kelly.');
//     assert(age === 20, 'Her age is 20.');
//     secondInnerFunction();
//   }

//   function secondInnerFunction() {
//     assert(name === 'Kelly', 'Yes, her name is Kelly.');
//     assert(typeof age === 'undefined', 'We cannot access a variable from another inner function.');
//     assert(
//       typeof firstInnerFunction === 'function',
//       'But we know the other inner function exists.'
//     );
//     // firstInnerFunction();
//   }

//   firstInnerFunction();
//   secondInnerFunction();
// }

// outerFunction();
// ---------------------------------------------------------------------------------------------

/** 5.6 - Exploring how closures work */

/**
 * We started this chapter with closures, a mechanism that allows a function to access all
 * variables that are in scope when the function itself is created. You've also seen some of
 * the ways closures can help you - for example, by allowing us to mimic private object variables
 * or by making our code more elegant wjen dealing with callbacks.
 *
 * Closures are irrevocably tightly coupled with scopes. Closures are a straightforward side effect
 * of the way scoping rules in Javascrip. So in this section, we'll revisit the closure examples
 * from the beginning of the chapter. But this time you'll take advantage of execution contexts and
 * lexical environments that will enable you grasp how closures work under the hood.
 */
