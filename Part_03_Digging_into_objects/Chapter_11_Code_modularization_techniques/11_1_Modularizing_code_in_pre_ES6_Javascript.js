/** 11.1 - Modularizing code in pre-ES6 Javascript */

// const globalVariable = 1;
// function whatever() {
//   const functionVariable = 2;
//   for (let blockVariable = 0; blockVariable < 5; blockVariable++) {
//     console.log(blockVariable);
//     console.log(`globalVariable: ${globalVariable}`);
//     console.log(`functionVarible: ${functionVariable}`);
//   }
//   console.log(blockVariable); // ReferenceError
// }

// // Calls the whatever function
// whatever();

/**
 * Pre-ES6 has only two types of scopes: global scope and function scope. It doesn't have something
 * in between, a namespace or a module that would allow us to group certian functionality together.
 * To write modular code, Javascript developers are forced to be creative with exsiting Javascript
 * language features.
 */

/**
 * When deciding whic features to use , we have to keep in mind that, at a bare minimum, each
 * module system should be able to do the following:
 *
 *  _ Define an interface through which we can access the functionality offered by the module.
 *
 *  _ Hide module internals so that the users of our modules aren't burderned with a whole host
 *    of unimportant implementation details. In addition, by hidding module internals, we protect
 *    those internals from the outside world, thereby preventing unwanted modifications that can
 *    lead to all sorts of side effects and bugs.
 */

/**
 * In this section, we'll first see how to create modules by using standard Javascript features
 * that we've explored so far in this book, features such as objects, clousures, and immediate
 * functions.
 * We'll continue this modularization vein by exploring Asynchronous Module Definition (AMD) and
 * CommonJS, the two most popular module specification standards, built on slightly different
 * foundations.
 */
