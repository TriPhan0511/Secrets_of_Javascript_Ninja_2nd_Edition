/** 4.2 - Invoking functions */

/**
 * We've all called Javascript functions, but have you ever stopped to wonder what really
 * happens when a function is called? As it turns out, the manner in which a function is
 * invoked has a huge impact on how the code within it operates, primarily in how the
 * this parameter, the function context, is established. This difference is much more
 * important than it might seem at first. We'll examine it within this section and exploit
 * it throughout the rest of this book to hepl elevate our code to the ninja level.
 *
 * We can invoke a function in four ways, each with its own nuances:
 *
 *  _ As a function - skulk(), in which the function is invoked in a straightforward manner.
 *
 *  _ As a method - ninja.skulk(), which ties the invocation to an object, enabling
 *    object-oriented programing.
 *
 *  _ As a constructor - new Ninja(), in which a new object is brought into being.
 *
 *  _ Via the function's apply or call methods - skulk.call(ninja) or skulk.apply(ninja) .
 */

// Here are examples:
function skulk(name) {}
function Ninja(name) {}

// Invoked as a function
skulk('Hattori');
(function (who) {
  return who;
})('Hattori');

let ninja = {
  skulk: function () {},
};

// Invoked as a method on ninja
ninja.skulk('Hattori');

// Invoked as a constructor
ninja = new Ninja('Hattori');

// Invoked via the call method
skulk.call(ninja, 'Hattori');

// Invoked via the apply method
skulk.apply(ninja, ['Hattori']);

/**
 * For all but tyhe call and apply approaches, the function invocation operator is a set of
 * parentheses following any expression that evaluates to a function reference.
 */
