/** 3.3 - Defining functions */

/**
 * Javascript functions are usually defined by using a function literal that creates a function value in the same
 * way that, for example, a numeric literal creates a numeric value.
 * Remember that as first-class objects, functions are values that can be used in the language just like other
 * values, such as strings and numbers.
 *
 * Javascript provides a couple of ways to define functions, which can be divided into four groups:
 *
 *  1.  Function declarations and function expressions - The two most common, yet subtly different ways of
 *      defining functions. Often people don't even consider them as separate, but as you'll see, being aware of
 *      their differences can help us understand when our functions are available for invocation:
 *
 *          function myFun() { return 1; }
 *
 *  2.  Arrow functions (often called lambda functions) - A recent, ES6 addition to the Javascript standard that
 *      enables us to define functions with far less syntactic clutter. They even solve one common problem with
 *      callback functions, but more on that latter:
 *
 *           myArg => myArg*2
 *
 *  3.  Function constructors - A not-so-often used way of dening functions that enables us to dynamically
 *      construct a new function from a string that can also be dynamically generated. This example dynamically
 *      creates a new function with two parameters, a and b, that returns the sum of two parameters:
 *
 *          new Function('a', 'b', 'return a + b')
 *
 *  4.  Generator functions - This ES6 addition to Javascript enable us to create functions that,
 *      unlike normal functions, can be exited and reentered later in the application execution, while keeping
 *      the values accross these re-entrances. We can define generator versions of function declarations,
 *      function expressions, and fuction constructors:
 *
 *          function* myGen() { yield 1; }
 */

/**
 * It's important that you understand these differences, because the way in which a function is defined 
 * significantly influences when the function is availble to be invoked and how it behaves, as well as on which
 * object the function can be invoked.
 */
