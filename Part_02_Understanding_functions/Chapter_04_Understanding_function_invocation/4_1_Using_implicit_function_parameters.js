/** 4.1 - Using implicit function parameters */

/**
 * In the preceding chapter, we explored the differences between function parameters
 * (variables listed as part of a function definition) and function arguments (values
 * passed to the function when we invoke it). But we didn't mention that in addition
 * to the parameters that we've explicitly stated in the function definition, function
 * invocations are usually passed two implicit parameters: this and arguments.
 *
 * By implicit, we mean that these parameters aren't explicitly listed in the function
 * signature, but are silently passed to the function and accessible within the function.
 * They can be referenced within the function just like any other explictly named parameter.
 */
// -----------------------------------------------------------------------------------------------------

/**
 * 4.1.1 - The arguments parameter
 */

/**
 * The arguments parameter is a collection of all arguments passed to a function.
 * It's useful because it allow us to access all function arguments, regardless of whether
 * the matching parameter is explicitly defined. This allow us to implement function overloading,
 * a feature that Javascript doesn't natively support, and variadic functions that accept a variable
 * number of arguments. To be honest, with rest parameters, introduced in the preceding chapter,
 * the need for the arguments parameter has been greatly reduced. Still, it's important to understand
 * how the arguments parameter wors, because you're bound to run into it when dealing with legacy code.
 *
 * The arguments object has a property named length that indicates the exact number of arguments.
 * The individual argument values can be obtained by using array indexing notations; for example,
 * arguments[2] would fetch the third parameter. Take a look at the following listing:
 */

/** Listing 4.1 - Using the arguments parameter */

// // Declares a fucntion with three parameters: a, b, and c
// function whatever(a, b, c) {
//   // Tests for correct values
//   assert(a === 1, 'The value of a is 1');
//   assert(b === 2, 'The value of b is 2');
//   assert(c === 3, 'The value of c is 3');

//   // In all, the function is passed five arguments
//   assert(arguments.length === 5, "We've passed in 5 parameters");

//   // Checks that the first three arguments match the function parameters
//   assert(arguments[0] === a, 'The first argument is assigned to a');
//   assert(arguments[1] === b, 'The second argument is assigned to b');
//   assert(arguments[2] === c, 'The third argument is assigned to c');

//   // Checks that the excess arguments can be accessed through the argements parameter
//   assert(arguments[3] === 4, 'We can access the fourth argument');
//   assert(arguments[4] === 5, 'We can access the fifth argument');

//   console.log(arguments);
// }

// // Calls a function with five parameters
// whatever(1, 2, 3, 4, 5);

/**
 * Throughout this section, we go out of our way to avoid calling the arguments parameter an array.
 * You may be fooled into thinking that it's an array; after all, it has a length property and its
 * entries can be fetched using array notation. But it's not a Javascript array, and if you try to
 * use array methods on arguments (for example, the sort method used in the previous chapter), you'll
 * find nothing but heartbreak and disappointment. Just thinking of arguments as an array-like construct,
 * and exhibit restrain in its use.
 */

/**
 * As we've already mentioned, the main point of the arguments object is to allow us
 * to access all arguments that were passed to the function, regardless of whether a
 * particular argument is associated with a function parameter.
 * Let's see how to do this by implementing a function that can calculate the sum of
 * an arbitrary number of arguments.
 */

/** Listing 4.2 - Using the arguments object to perform operations on all function arguments */
// function sum() {
//   let result = 0;
//   for (let i = 0; i < arguments.length; i++) {
//     result += arguments[i];
//   }
//   return result;
// }

// assert(sum() === 0, 'The total is zero.');
// assert(sum(10) === 10, 'The total is ten.');
// assert(sum(1, 2, 3, 4, 5) === 15, 'The total is fifteen.');

/**
 * NOTE:
 * We mentioned earlier that in a lot of cases we can use the rest parameter instead of
 * the arguments parameter. The rest parameter is a real array, which means that we can
 * use all our favorite array methods on it. This gives it a certain advantages over the
 * arguments object. As an exercise, rewrite listing 4.2 to use the rest parameter instead
 * of the arguments parameter.
 */

// function sum(...rest) {
//   let result = 0;
//   for (let item of rest) {
//     result += item;
//   }
//   return result;
// }

// assert(sum() === 0, 'The total is zero.');
// assert(sum(10) === 10, 'The total is ten.');
// assert(sum(1, 2, 3, 4, 5) === 15, 'The total is fifteen.');

/** Now that we understand how the arguments object works, let's explore some of its gotchas. */
// ---------------------------------------------------------------------------------------------------------

/** ARGUMENTS OBJECT AS AN ALIAS TO FUNCTION PARAMETERS */

/**
 * The arguments parameter has one curious feature: It aliases function parameters. If we
 * set a new value to, for example, arguments[0], the value of the first parameter will also
 * be changed. Take a look at the following listing
 */

/** Listing 4.3 - The arguments object alisases function parameters */

// function infiltrate(person) {
//   // The person parameter has the value "gardener" set as the first value
//   assert(person === 'gardener', 'The person is a gardener.');
//   assert(arguments[0] === 'gardener', 'The first argument is a gardener.');

//   // Changing the arguments object will also change the matching parameter
//   arguments[0] = 'ninja';

//   assert(person === 'ninja', 'The person is a ninja now.');
//   assert(arguments[0] === 'ninja', 'The first argument is a ninja.');

//   // The alias works both ways
//   person = 'gardener';

//   assert(person === 'gardener', 'The person is a gardener once more.');
//   assert(arguments[0] === 'gardener', 'The first argument is a gardener again.');
// }

// // Calls the infiltrate function
// infiltrate('gardener');
// ---------------------------------------------------------------------------------------------------------

/** AVOIDING ALIASES */

/**
 * The concept of aliasing function parameters through the arguments object can be confusing,
 * so Javascript provides a way to opt out of it by using strict mode.
 */

/**
 * Strict mode is an ES5 addition to Javascript that changes the behavior of Javascript engine
 * so that errors are thrown instead of silent picked up. The behavior of some language features
 * is changed, and some unsafe language features are even completely banned. One of the things that
 * strict mode changes is that it disables argument aliasing.
 */

/** Listing 4.4 - Using strict mode to avoid arguments aliasing */

// 'use strict'; // Enables strict mode

// function infiltrate(person) {
//   assert(person === 'gardener', 'The person is a gardener.');
//   assert(arguments[0] === 'gardener', 'The first argument is a gardener.');

//   // Changes the first argument
//   arguments[0] = 'ninja';

//   // The first argument is changed
//   assert(arguments[0] === 'ninja', 'The first argumet is now a ninja');
//   // The value of the person parameter hasn't changed
//   assert(person === 'gardener', 'The person is still a gardener.');
// }

// // Calls the infiltrate function
// infiltrate('gardener');
// ---------------------------------------------------------------------------------------------------------

/** 4.1.2 - The this paramter: introducing the function context */

/**
 * When a function is invoked, in addition to the parameters that represent the explicit arguments
 * provided in the function call, an implicit parameter named this is passed to the function.
 * The this parameter, a vital ingredient in object-oriented Javascript, refers to an object that's
 * associated with the function invocation. For this reason, it's often termed the function context.
 *
 * The function context is a notion that those coming from object-oriented languages such as Java
 * might think that they understand. In such languages, this usually points to an instance of the
 * class within the method is defined.
 *
 * But beware! As we'll soon see, in Javascript, invoking a function as a method is only one way that
 * a function can be invoked. And as it turns out, what the this parameter points to isn't (as in Java
 * or C#) defined only by how and where the function is defined; it can also be heavily influenced by
 * how the function is invoked. Because understanding the exact nature of this parameter is one of the
 * most important pillars of object-oriented Javascript, we're about look at various ways of invoking
 * functions. You'll see that one of the primary differences between them is how the value of this is
 * determined.
 */
