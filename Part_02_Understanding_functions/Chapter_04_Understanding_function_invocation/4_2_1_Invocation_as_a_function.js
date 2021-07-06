/** 4.2.1 - Invocation as a function */

/**
 * We say that a function is invoked "as a function" to distinguish it from the other invocation
 * mechanisms: methods, constructors, and apply/call. If a function isn't invoked as a method,
 * as a constructor, or via apply or call, it's invoked as a function.
 *
 * This type of invocation occurs when a function is invoked using the () operator,
 * and the expression to which the () operator is applied doesn't reference the function as a
 * property of an object.
 *
 * Here are some simple examples:
 */

// // Function delcaration invoked as a function
// function ninja() {}
// ninja();

// // Function expression invoked as a function
// let samurai = function () {};
// samurai();

// // Immediately invoked function expression, invoked as a function
// (function () {})();

/**
 * When invoked in this manner, the function context (the value of the this keyword)
 * can be two things: In nonstrict mode, it will be the global context (the window object),
 * whereas in strict mode, it will be undefined.
 *
 * The following listing illustrates the difference in behavior between strict and non-strict modes
 */

/** Listing 4.5 - Invocation as a function */

// A function in nonstrict mode
function ninja() {
  return this;
}

// A function in strict mode
function samurai() {
  'use strict';
  return this;
}

// As expected, a nonstrict function has window as the function context
assert(
  ninja() === window,
  `In a 'nonstrict' ninja function, the context is the global window object.`
);

// The strict function, on the other hand, has an undefined context
assert(samurai() === undefined, `In a 'strict' samurai function, the context is undefined.`);

/**
 * NOTE:
 * As you can see, strict mode is, in most cases, much more straightforward than nonstrict mode.
 * For example, when listing 4.5 invokes a function as a function (as opposed to as a method),
 * it hasn't specified an object on which the function should be invoked. So, in our opinion,
 * it makes more sense that the this keyword should be set to undefined (as in strict mode), as
 * opposed to the gloabal window object (as in nonstrict mode). In general, strict mode fixes
 * a lot of these small Javascript oddities. (Remember arguments aliasing from the begining
 * of the chapter?)
 */
