/** Exercise 1 */

// option a. Closure allow funtions to access external variables that are in scope
// when the function is defined.
// ------------------------------------------------------------------------------------

/**Exercise 2 */

// option b. Closures come with memory costs.
// ------------------------------------------------------------------------------------

/**
 * Exercise 3:
 * In the following code example, mark the identifiers accessed through closures:
 *
 *  _ name,
 *  _ weapon,
 *  _ this.message
 */

// // Defines a Samurai constructor function
// function Samurai(name) {
//   let weapon = 'katana';

//   this.getWeapon = function () {
//     // Accesses the local variable: weapon
//     return weapon;
//   };

//   this.getName = function () {
//     // Accesses the function parameter: name
//     return name;
//   };

//   this.message = `${name} wielding a ${weapon}`;

//   this.getMessage = function () {
//     // this.message is not accessed through a closure
//     // it is an object property (and not a variable)
//     return this.message;
//   };
// }

// // Createa a new instance of Samurai
// let samurai = new Samurai('Hattori');

// assert(samurai.getWeapon() === 'katana', 'His weapon is a katana.');
// assert(samurai.getName() === 'Hattori', 'His name is Hattori.');
// assert(samurai.getMessage() === 'Hattori wielding a katana', 'Hattori wielding a katana.');
// ------------------------------------------------------------------------------------

/**
 * Exercise 4:
 * In the following code, how many execution contexts are created, and what's the
 * largest size of the execution context stack?
 *
 *  _ There are 4 execution contexts are created : global execution context,
 *    perform function execution context, sneak function execution context,
 *    and infiltrate function execution context.
 *
 *  _ The largest size of the execution context stack is 3, in the following situations:
 *    + global code -> perform -> sneak
 *    + global code -> perform -> infiltrate
 */

// function perform(ninja) {
//   sneak(ninja);
//   infiltrate(ninja);
// }

// function sneak(ninja) {
//   return `${ninja} skulking`;
// }

// function infiltrate(ninja) {
//   return `${ninja} infiltrating`;
// }

// perform('Kuma');
// ------------------------------------------------------------------------------------

/**
 * Exercise 5:
 * Which keyword in Javascript allows us to define variables that can't be reassigned
 * to a completely new value?
 *
 * -> Answer: const keyword
 */
// ------------------------------------------------------------------------------------

/**
 * Exercise 6:
 * What's the difference between var and let?
 *
 * -> Answer:
 * The keyword var is used to define only function- or global-scoped variables,
 * whereas let enables us to define block-scoped. function-scoped, global-scoped variables.
 */
// ------------------------------------------------------------------------------------

/**
 * Exercise 7:
 * Where and why will the following code throw an exeption?
 *
 * -> Answer:
 * An exception will be thrown when trying to invoke the getSamurai function.
 * The getNinja function is defined with a function declaration and will be created
 * before any of the code is executed; we can call it "before" its declaration has
 * been reached in code.
 * The getSamurai function, on the other hand, is an arrow function that's created
 * when the execution reaches it, so it will be undefined when we try to invoke it.
 */

getNinja();
getSamurai(); // Throws an TypeError exception: getSamurai is not a function.

// function declaration
function getNinja() {
  return 'Yoshi';
}

// Arrow function
var getSamurai = () => 'Hattori';
