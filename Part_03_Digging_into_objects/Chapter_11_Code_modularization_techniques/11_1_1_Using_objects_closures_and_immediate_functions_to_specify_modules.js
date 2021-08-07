/** 11.1.1 - Using objects, closures and immediate functions to specify modules */

// Defines a outerFunction function
// function outerFunction() {
//   const outerVariable = 10;
//   function innerFunction(innerVariable) {
//     return outerVariable * innerVariable;
//   }
//   return innerFunction;
// }
// -----------------------------------------------

// function outerFunction() {
//   const outerVariable = 10;
//   return function (innerVariable) {
//     return outerVariable * innerVariable;
//   };
// }
// -----------------------------------------------

// function outerFunction() {
//   const outerVariable = 10;
//   return (innerVariable) => outerVariable * innerVariable;
// }

// // Assigns the outerFunction to a variable
// const whatever = outerFunction();

// // Calling whatever function
// const result = whatever(12);

// assert(result === 120, 'Yes.');
// console.log(result);
// -----------------------------------------------

// Defines a outerFunction function
// function outerFunction(outerVariable) {
//   return (innerVariable) => outerVariable * innerVariable;
// }

// // Assigns the outFunction to a variable
// const multiByFive = outerFunction(5);

// assert(multiByFive(4) === 20, 'Pass')
// ----------------------------------------------------------------------------------------------------------

// // Defines a doComputation function
// function doComputation(base) {
//   // Add
//   function add(term) {
//     return term + base;
//   }
//   // Subtract
//   function subtract(term) {
//     return term - base;
//   }
//   // Multiply
//   function mutiply(term) {
//     return term * base;
//   }
//   // Division
//   function division(term) {
//     if (base === 0) {
//       throw Error('Divided by zero');
//     }
//     return term / base;
//   }

//   return { add: add, subtract: subtract, mutiply: mutiply, division: division };
// }

// // Assign the doComputation for an object
// const obj = doComputation(10);

// assert(obj.add(5) === 15, '15');
// assert(obj.subtract(5) === -5, '-5');
// assert(obj.mutiply(5) === 50, '50');
// assert(obj.division(5) === 0.5, '0.5');
// --------------------------------------------------------------------------------------------------------

/**
 * Let's go back to our minimal module system requirements, hiding implementation details
 * and defining module interface. Now think about which Javascript language features we
 * can take advantage of in order to implement these minimal requirements:
 *
 *  _ Hiding module internals - As we already know, calling a Javascript function creates
 *    a new scope in which we can define variables that are visible only the current function.
 *    So, one option for hiding module internals is using functions as modules. In this way,
 *    all function variables become internal module variables that are hidden from the ouside
 *    world.
 *
 *  _ Defining module interfaces - Implementing module internals through function variables
 *    means that those variables are accessible from only within the module. But if our
 *    modules are to be used from other code, we have to be able to define a clean interface
 *    through which we can expose the functionality offered by the module. One way of achieving
 *    this by taking advantage of objects and closures. The idea is that, from our function
 *    module, we return an object that represents the public interface of our module.
 *    That object should contains methods offered by modules, methods that will, through closures,
 *    keep alive our internal module variables, even after our module function has finished
 *    its execution.
 */

/**
 * Now that we've given a high-level description of how to implement modules in Javascript,
 * let's go through it slowly, step by step, starting with using functions for hiding
 * module internals.
 */
// -------------------------------------------------------------------------------------------------------------

/** FUNCTIONS AS MODULES */

/**
 * Calling a function creates a new scope that we can use to define variables that won't
 * be visible from outside the current function. Let's take a look at the following
 * code snippet that counts the number cof clicks on a web page:
 */

// (function countClicks() {
//   let numClicks = 0;
//   document.addEventListener('click', () => alert(++numClicks));
// })();

/**
 * In this example, we create a function called countClicks that creates a variable numClicks
 * and register a click event handler on the entire document. Whenever a click is made,
 * the numClicks variable gets incremented and the result is displayed to the user via an
 * alert box. There are two important things to notice here:
 *
 *  _ The numClicks variable, internal to the countClicks function, is kept alive through
 *    the closure of the click handler function. The variable can be referenced only within
 *    the handler, and nowhere else! We've shielded the numClicks variable from the code
 *    outside the countClicks function. At the same time, we haven't polluted the global
 *    namespace of our program with a variable that's probably not that important for the
 *    rest of our code.
 *
 *  _ Our countClicks function is called only in this one place, so instead of defining a
 *    function and then calling it in a separate statement, we've used an immediate function.
 *    or an IIFE (Immediately Invoked Function Expression, presented in chapter 3), to define
 *    and inmmediately invoked the countClicks function.
 */

/**
 * Now that we understand how to hide internal module details, and how closures can keep those
 * internal details alive along necessary, let's move on to our second minimal requirement for
 * modules: defining module interfaces.
 */
// -------------------------------------------------------------------------------------------------------------

/** THE MODULE PATTERN: AUGMENTING FUNCTIONS AS MODULES WITH OBJECTS AS INTERFACES */

/**
 * The module interface is usually composed of a set of variables and functions that our
 * module provides to the outside world. The easiest way to create such an interface is
 * to use the humble Javascript object.
 */

/**
 * For example, let's create an interface for our module that counts the clicks on our
 * web page, as shown in the following listing.
 */

/** Listing 11.1 - The module pattern */

// const MouseCounterModule = (function () {
//   let numClicks = 0;
//   function handleClick() {
//     document.addEventListener('click', () => alert(++numClicks));
//   }
//   return {
//     method1: handleClick,
//   };
// })();

// // Calls the method1 of MouseCounterModule
// // MouseCounterModule.method1();

// // Tests
// assert(typeof MouseCounterModule.method1 === 'function', 'a function.');
// assert(
//   typeof MouseCounterModule.numClicks === 'undefined' &&
//     typeof MouseCounterModule.handleClick === 'undefined',
//   'We cannot access numClicks and handleClick'
// );
// -----------------------------------------------------------------------------------

// // Creates a global module variable and
// // assigns the result of immediately invoking a function
// const MouseCounterModule = (function () {
//   // Creates a "private" module variable
//   let numClicks = 0;
//   // Creates a "private" module function
//   const handleClick = () => {
//     alert(++numClicks);
//   };

//   // Returns an object that represents the module's interface.
//   // Through closures, we can access "private" module variables and functions
//   return {
//     countClicks: () => {
//       document.addEventListener('click', handleClick);
//     },
//   };
// })();

// // From outside, we can access the properties exposed through the interface
// assert(
//   typeof MouseCounterModule.countClicks === 'function',
//   'We can access the module functionality.'
// );

// // But we can't access module internals
// assert(
//   typeof MouseCounterModule.numClicks === 'undefined' &&
//     typeof MouseCounterModule.handleClick === 'undefined',
//   'We cannot access internal module details.'
// );

/**
 * Here we use an immediate function to implement a module. Within a immediate function,
 * we define our internal module implementation details: one local variable, numClicks,
 * and one local function, handleClick, that are accessible only within ta module.
 * Next we create and immediately return an object that wil serve as the module's
 * "public interface". This interface contains a countClicks method that we can use from
 * outside the module to access module functionality.
 */

/**
 * At the same time, because we've exposed a module interface, our internal module details
 * are kept alive through closures created by the interface. For example, in this case,
 * the countClicks method of the interface keeps alive internal module variables numClicks
 * and handleClick
 */

/**
 * Finally, we store the object that represents the module interface, returned by the 
 * immediate function , into a variable named MouseCounterModule, through which we can
 * easily consume module functionality, by writing the following code:
 * 
      MouseCounterModule.countClicks();
 * 
 * And that's basically it.      
 */
// --------------------------------------------------------------------------------------------------

/**
 * By taking advantage of immediate functions, we can hide certain module implementation
 * details. Then by adding objects and closures into the mix, we can specify a module interface
 * that exposes the functionality provided by our module to the outside world.
 *
 * This pattern of using immediate functions, objects, and closures to create modules
 * in Javascript is called module pattern. It was popularized by Douglas Crockford, and
 * was one of the first massively popular ways of modularizing Javascript code.
 */

/**
 * Once we have the ability to define modulee, it's always nice to be able to split them across
 * multiple files (in order to more easily manage them), or to be able to define additional
 * functionality on existing modules, without modifying their sorce code.
 *
 * Let's see how this can be done.
 */
// --------------------------------------------------------------------------------------------------

/** AUGMENTING MODULES */

/**
 * Let's augment our MouseCounterModule from the previous example with an additional feature of
 * counting the number of mouse scrolls, but without modifying the original MouseCounter code,
 *
 * See the following listing.
 */

/** Listing 11.2 - Augmenting modules */

// The original MouseCounterModule
const MouseCounterModule = (function () {
  let numClicks = 0;
  const handleClick = () => {
    alert(++numClicks);
  };
  return {
    countClicks: () => {
      document.addEventListener('click', handleClick);
    },
  };
})();

// Immediately invokes a function that accepts the module we want to extend as an argument
(function (module) {
  // Defines new private variables and functions
  let numScrolls = 0;
  const hanldeScroll = () => {
    alert(++numScrolls);
  };

  // Extends the module interface
  module.countScrolls = () => {
    document.addEventListener('wheel', hanldeScroll);
  };
})(MouseCounterModule); // Passes in the module as an argument

// Tests
assert(
  typeof MouseCounterModule.countClicks === 'function',
  'We can access initial module functionality.'
);
assert(
  typeof MouseCounterModule.countScrolls === 'function',
  'We can access augmented module functionality.'
);

/**
 * When augmenting a module, we usually follow a procedure similar to creating a new module.
 * We immediately call a function, but this time, we pass to it the module we want to extend
 * as an arument:
 * 
          (function (module) {
          ...
          })(MouseCounterModule); 
 * 
 * Within the function, we then go about our work and create all necessary private varaibles 
 * and functions. In this case, we've defined a private variable and a private function for
 * counting and reporting the number of scrolls:
 * 
          let numScrolls = 0;
          const hanldeScroll = () => {
               alert(++numScrolls);
          };

 * 
 * Finally, we extend our module, available through the immediate function's module parameter,
 * just as we would extend any other object:
 * 
          module.countScrolls = () => {
               document.addEventListener('wheel', hanldeScroll);
          };
 * 
 * After we've performed this simple operation, our MouseCounterModule can also countScrolls
 */

/**
 * Our public module interface now has two methods, and we can use them in the following ways:
 * 
          MouseCounterModule.countClicks();
          MouseCounterModule.countScrolls();
 * 
 */

/**
 * As we've mentioned, we've extended the module in a way that's similar to the creation of
 * a new module, through an immediately invoked function that extends the module. This has
 * some interesting side effects in term of closures, so let's take a closer look at the
 * application state after we've augmented the module.
 *
 * There is one of shortcomings of the module pattern: the inability to share private module
 * variables across module extensions. For example, the countClicks function keeps a closure
 * around the numClicks and the handleClick variables , and we could access these private
 * module internals through the countClicks method.
 *
 * Unfortunately, our extension, the countScrolls function, is created in a completely separate
 * scope, with a completely new set of private variables: numScrolls and handleScroll.
 * The countScrolls function creates a closure only around numScrolls and handleScroll variables,
 * and therefore can't access the numClicks and handleClick variables.
 */

/**
 * NOTE
 * Module extensions, when performed through separate immediate functions, can't share private
 * module internals, because every function vocation creates a new scope. Although this is a
 * shortcoming, it's not a showstopper, and we can still use the module pattern to keep our
 * Javascript applications modular.
 */

/**
 * Note that, in the module pattern, modules are objects just like any other, and we can extend
 * them in any way we find appropriate. For example, we can add new functionality by extending
 * the module object with new properties:
 * 
          MouseCounterModule.newMthod = () => {...};
 * 
 * We can also use the same principle to easily create submodules:
 * 
          MouseCounterModule.newSubModule = () => {
             return {...};
          };
 */

/**
 * Note that all of these approaches suffer from the same fundamental shortcoming of the
 * module pattern: Subsequent extensions of the module can't access previously defined
 * internal module details.
 */

/**
 * Unfortunately, there are more problems with the module pattern. When we start building
 * modular applications, the modules themselves will often depend on other modules for
 * their functionality. Unfortunately, the module pattern doesn't cover the management
 * of these dependencies. We, as developers, have to take care of the right dependency
 * order so that our module ocde has all it needs to execute. Although this isn't a
 * problem in small and medium applications, it can introduce serious issues in large
 * applications that use a lot of interdependent modules.
 *
 * To deal with these issues, a couple of competing standards have arisen, namely
 * Asynchronous Module Definition (AMD) and CommonJS.
 */
