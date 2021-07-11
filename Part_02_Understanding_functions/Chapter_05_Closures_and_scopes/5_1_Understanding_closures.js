/** 5.1 - Understading closures */

/**
 * A closure allows a function to access and manipulate variables that external to that function.
 * Closures allow a function to access all the variables, as well as other functions, that are
 * in scope when the function itself is defined.
 */

/**
 * That may seem intuitive until you remember that a declared function can be called at any later
 * time, even after the scope in which it was declared has gone away. This concept is probably best
 * explained through code. But before we get into concrete example that will hekp you develop more
 * elegant animations in code or to define private object properties, let's start small, with the
 * following listing
 */

/**
 * NOTE: You're probably familiar with the concept of scopes, but in this case, a scope refers to
 * the visibility of idetifiers in certain parts of a program. A scope is a part of the program
 * in which a certain name is bound to a certain variable.
 */

/** Listing 5.1 - A simple closure */

// // Defines a value in global scope
// let outerValue = 'ninja';

// // Declares a function in global scope
// function outerFunction() {
//   assert(outerValue === 'ninja', 'I can see the ninja.');
// }

// // Executes the function
// outerFunction();

/**
 * In this code example, we declare a variable outerValue and a function outerFunction in the
 * same scope - in this case, the global scope. Afterward, we call outerFunction.
 *
 * As you can see in the result, the function is able to "see" and access the outerValue variable.
 * You've likely written code such as this hundreds of times without realizing that you were
 * creating a closure!
 *
 * Not impressed? Guess that's not surprising. Because both outerValue and outerFunction are
 * declared in global scope, that scope (which is a closure) never goes away (as long as our
 * application is running). It's not surprising that the function can access the variable,
 * because it's still in scope and viable.
 *
 * Even though the closure exists, its benefits aren't yet clear. Let's spice it up in the next
 * listing.
 */

/** Listing 5.2 - Another closure example */

// let outerValue = 'samurai';
// let later; // An empty variable that we'll use later

// function outerFunction() {
//   // Declares a value inside the function.
//   // This variable's scope is limited to the function and can't be accessed from the outside function.
//   let innerValue = 'ninja';

//   // Declares an inner function within the outerFunction.
//   // innerValue is in scope when we create this function.
//   function innerFunction() {
//     assert(outerValue === 'samurai', 'I can see the samurai.');
//     assert(innerValue === 'ninja', 'I can see the ninja.');
//   }

//   // Stores a reference to innerFunction in the later variable.
//   // Because later is in the global scope, it'll allow us to call the function later.
//   later = innerFunction;
// }

// // Invokes outerFunction, which causes innerFunction to be created and its reference assigned to later.
// outerFunction();

// // Invokes innerFunction through later.
// // We can't invoke it directly because its scope (along with innerValue) is limited to within outerFunction
// later();

/**
 * Let's overanalyze the code in the innerFunction and see whether we can predict what might happen:
 *
 *    _ The first assert is certain to pass; outerValue is in the global scope and is visible to
 *      everything. But what about the second assert?
 *
 *    _ We're executing innerFunction after outerFunction has been executed via the trick of copying
 *      a reference to the function to the global variable later.
 *
 *    _ When innerFunction executes, the scope inside the outerFunction is long gone and not visible
 *      at the point at which we're invoking the function through later.
 *
 *    _ So we could very well expect assert to fails, as innerValue is sure to be undefined. Right?
 *
 */

/**
 * But when we run the test, we see all of asserts are passed. How can that be? What magic allows
 * the innerValue variable to still be "alive" when we execute the inner function, long after the
 * scope in which it was created has gone away? The answer is closures.
 *
 * When we declare innerFunction inside the outer function, not only is the function declaration
 * defined, but a closure is created that encompasses the function definition as well as
 * all variables at the point of function definition. When innerFunction eventually executes,
 * even if it's executed after the scope in which it was declared goes away, it has access to
 * the original scope in which it was declared through its closure.
 */

/**
 * That's what closures are all about. They create a "safety bubble" of the function and
 * the variables in scope at the point of the function's definition, so that the function has
 * all it needs to execute.
 * This bubble, containing function and its variables, stays around as long as the function does.
 */

/**
 * Although all this structure isn't readily visible (there's no "closure" object holding all of
 * this information that you can inspect), storing and referencing information in this way has a
 * direct cost. It's important to remember that each function that accesses information via
 * a closure has a "ball and chain" attached to it, carrying this information around. So although
 * closures are incredibly useful, they aren't free of overhead. All that information needs to be
 * held in memory until it's absolutely clear to the Javascript engine that it's no longer needed
 * (and is safe to garbage-collect), or until the page unloads.
 */
